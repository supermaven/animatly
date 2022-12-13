import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import PageTitle from 'admin/components/PageTitle'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {
  Chip,
  Button,
  TablePagination,
  ButtonGroup,
} from '@material-ui/core'
import useStyles from './styles'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getLotties, deleteLottie } from 'redux/modules/lottie/actions'
import { lottiesSelector } from 'redux/modules/lottie/selectors'
import { createStructuredSelector } from 'reselect'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import { Loader } from 'components/Loader'
import { ManageLottieModal } from 'admin/components/ManageLottieModal'
import S3 from 'helpers/react-aws-s3/react-aws-s3.ts'
import { bucketName, accessKeyId, secretAccessKey, region, s3Url } from 'helpers/utils'
import { CustomAlert } from 'components/CustomAlert'

const Lottie = ({
  getLotties,
  deleteLottie,
  lotties,
}) => {
  const classes = useStyles()
  const location = useLocation()
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('error')
  const [lottieList, setLottieList] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(100)
  const [type, setType] = useState('Icons')
  const [openLottieModal, setOpenLottieModal] = useState(false)
  const [modalMode, setModalMode] = useState('Edit')
  const [editLottieInfo, setEditLottieInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([10, 25, 100, { value: -1, label: 'All' }])

  const datatableColums = [
    { name: 'Date' },
    { name: 'Type' },
    { name: 'Name' },
    {
      name: 'Category',
      options: {
        filter: true,
        sort: true,
        empty: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Chip size='small' classes={{ root: classes[value] }} label={value} />
          )
        }
      }
    },
    {
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        empty: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ButtonGroup disableElevation color="primary">
              <Button onClick={handleClickEdit(value)}>Edit</Button>
              <Button variant="contained" onClick={handleClickDelete(value)}>delete</Button>
            </ButtonGroup>
          )
        }
      }
    }
  ]

  useEffect(() => {
    const params = location.hash.slice(1)
    switch (params) {
      case 'Icons':
        setType(params)
        break
      case 'Illustrations':
        setType(params)
        break
      default:
        break
    }
  }, [location])

  const handleClickEdit = (lottieInfo) => async () => {
    setModalMode('Edit')
    setEditLottieInfo(lottieInfo)
    setOpenLottieModal(true)
  }

  const handleClickDelete = (lottieInfo) => async () => {
    setIsLoading(true)
    await deleteLottie({
      id: lottieInfo.id,
      type: lottieInfo.type,
      success: async ({ data }) => {
        await deleteFilesOnS3(`${lottieInfo.type}/json`, lottieInfo.jsonPath.replace(/^.*[\\/]/, '').trim())
        await deleteFilesOnS3(`${lottieInfo.type}/prev`, lottieInfo.prevPath.replace(/^.*[\\/]/, '').trim())
        await deleteFilesOnS3(`${lottieInfo.type}/aef`, lottieInfo.aefPath.replace(/^.*[\\/]/, '').trim())
        setIsLoading(false)
        getLottiesInfo(page, limit)
      },
      fail: (err) => {
        setIsLoading(false)
      }
    })
  }

  const deleteFilesOnS3 = async (dirName, filePath) => {
    const config = {
      bucketName,
      accessKeyId,
      secretAccessKey,
      region,
      dirName,
      s3Url,
    }

    const ReactS3Client = new S3(config)

    const data = await ReactS3Client.deleteFile(filePath)
    if (data.status === 204) {
      setAlertType('success')
      setAlertText('Removed Successfully.')
      setAlertOpen(true)
    } else {
      setAlertType('error')
      setAlertText('Remove Error.')
      setAlertOpen(true)
    }
  }

  const handleClickAddLottie = () => {
    setModalMode('Create')
    setOpenLottieModal(true)
    setEditLottieInfo(null)
  }

  const handleChangePage = (e, value) => {
    setPage(value + 1)
  }

  const handleChangeRowPerPage = (e) => {
    const value = e.target.value
    setLimit(value)
  }

  const getLottiesInfo = async (page, limit) => {
    await getLotties({
      params: {
        type,
        name: searchValue ? searchValue : '',
        sortBy: 'asc',
        limit,
        page,
      },
      success: ({ data }) => {
        setLottieList(data)
      },
      fail: (err) => {
        //console.log(err)
      }
    })
  }

  useEffect(() => {
    const init = async () => {
      await getLotties({
        params: {
          type,
          name: searchValue ? searchValue : '',
          sortBy: 'asc',
          limit,
          page,
        },
        success: ({ data }) => {
          setLottieList(data)
          setRowsPerPageOptions([10, 25, 100, { value: data.totalResults, label: 'All' }])
        },
        fail: (err) => {
          //console.log(err)
        }
      })
    }
    init()
  }, [searchValue, type, limit, page, getLotties])

  return (
    <div>
      <CustomAlert isOpen={alertOpen} type={alertType} text={alertText} onClose={() => setAlertOpen(false)} />

      <PageTitle title='Lottie Over View' button='Add New Lottie' onClick={handleClickAddLottie} />

      <MuiThemeProvider theme={myTheme}>
        {isLoading && <Loader />}
        <MUIDataTable
          title={`${type} list`}
          data={lottieList.results && lottieList.results.map((item, index) => {
            return [
              moment(item.createdAt).format('yyyy.MM.DD - hh:mm'),
              item.type,
              item.name,
              item.categoryName,
              item,
            ]
          })}
          columns={datatableColums}
          options={{
            filter: true,
            filterType: 'dropdown',
            pagination: false,
            print: 'false',
            selectableRows: 'none',
            searchPlaceholder: 'Input Lottie Name:',
            onSearchChange: (text) => { setSearchValue(text) },
            onSearchClose: () => { setSearchValue('') },
          }}
        />

        {
          lottieList.totalResults &&
          <TablePagination
            component='div'
            count={lottieList.totalResults}
            page={page - 1}
            onChangePage={handleChangePage}
            rowsPerPage={limit}
            rowsPerPageOptions={rowsPerPageOptions}
            onChangeRowsPerPage={handleChangeRowPerPage}
          />
        }
      </MuiThemeProvider>
      {openLottieModal === true &&
        <ManageLottieModal
          open={true}
          onClose={() => {
            setOpenLottieModal(false)
            getLottiesInfo(page, limit)
          }}
          mode={modalMode}
          lottieInfo={editLottieInfo && editLottieInfo}
        />
      }
    </div>
  )
}

Lottie.propTypes = {
  lotties: PropTypes.any,
  getLotties: PropTypes.func,
  deleteLottie: PropTypes.func,
}

const actions = {
  getLotties,
  deleteLottie,
}

const selector = createStructuredSelector({
  lotties: lottiesSelector,
})

export default compose(connect(selector, actions))(Lottie)

const myTheme = createMuiTheme({
  overrides: {
    MUIDataTableToolBar: {
      root: {
        color: '##333333',
      }
    }
  }
})

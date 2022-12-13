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
import { getAllCategories, deleteCategory } from 'redux/modules/category/actions'
import { getAllTags, deleteTag } from 'redux/modules/tag/actions'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import { Loader } from 'components/Loader'
import { ManagePropertyModal } from 'admin/components/ManagePropertyModal'
import { CustomAlert } from 'components/CustomAlert'

const Trend = ({
  getAllCategories,
  getAllTags,
  deleteTag,
  deleteCategory,
}) => {
  const classes = useStyles()
  const location = useLocation()
  const [dataList, setDataList] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(100)
  const [type, setType] = useState('category')
  const [openPropertyModal, setOpenPropertyModal] = useState(false)
  const [modalMode, setModalMode] = useState('Edit')
  const [editPropertyInfo, setEditPropertyInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('error')
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([10, 25, 100, { value: -1, label: 'All' }])

  const datatableColums = [
    { name: 'Date' },
    { name: 'Name' },
    {
      name: 'Type',
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
      case 'category':
        setType(params)
        break
      case 'tag':
        setType(params)
        break
      case 'search':
        setType(params)
        break
      default:
        break
    }
  }, [location])

  const handleClickEdit = (propertyInfo) => async () => {
    if (propertyInfo.name === 'Freebies') {
      setAlertOpen(true)
      setAlertType('error')
      setAlertText(`"Freebies" category can't be edited.`)
      setIsLoading(false)
      return
    }
    setModalMode('Edit')
    setEditPropertyInfo(propertyInfo)
    setOpenPropertyModal(true)
  }

  const handleClickDelete = (propertyInfo) => async () => {
    setIsLoading(true)

    if (type === 'tag') {
      await deleteTag({
        id: propertyInfo.id,
        success: async ({ data }) => {
          setAlertOpen(true)
          setAlertType('success')
          setAlertText('Successfully Removed a Tag!')
          setIsLoading(false)
          await getPropertyInfo(page, limit)
        },
        fail: (err) => {
          if (err.data.code === 400) {
            setAlertOpen(true)
            setAlertType('error')
            setAlertText(err.data.message)
          }
          setIsLoading(false)
        }
      })
    } else if (type === 'category') {
      if (propertyInfo.name === 'Freebies') {
        setAlertOpen(true)
        setAlertType('error')
        setAlertText(`"Freebies" category can't be deleted.`)
        setIsLoading(false)
        return
      }

      await deleteCategory({
        id: propertyInfo.id,
        success: async ({ data }) => {
          setAlertOpen(true)
          setAlertType('success')
          setAlertText('Successfully Removed a Category!')
          setIsLoading(false)
          await getPropertyInfo(page, limit)
        },
        fail: (err) => {
          if (err.data.code === 400) {
            setAlertOpen(true)
            setAlertType('error')
            setAlertText(err.data.message)
          }
          setIsLoading(false)
        }
      })
    }
  }

  const handleClickAddDetail = () => {
    setModalMode('Create')
    setOpenPropertyModal(true)
    setEditPropertyInfo(null)

  }

  const handleChangePage = (e, value) => {
    setPage(value + 1)
  }

  const handleChangeRowPerPage = (e) => {
    const value = e.target.value
    setLimit(value)
  }

  const getPropertyInfo = async (page, limit) => {
    switch (type) {
      case 'category':
        await getAllCategories({
          params: {
            name: searchValue ? searchValue : '',
            sortBy: 'asc',
            limit,
            page,
          },
          success: ({ data }) => {
            setDataList(data)
          },
        })
        break
      case 'tag':
        await getAllTags({
          params: {
            name: searchValue ? searchValue : '',
            sortBy: 'asc',
            limit,
            page,
          },
          success: ({ data }) => {
            setDataList(data)
          },
        })
        break
      case 'search':
        break
      default:
    }
  }

  useEffect(() => {
    const init = async () => {
      switch (type) {
        case 'category':
          await getAllCategories({
            params: {
              name: searchValue ? searchValue : '',
              sortBy: 'asc',
              limit,
              page,
            },
            success: ({ data }) => {
              setDataList(data)
              setRowsPerPageOptions([10, 25, 100, { value: data.totalResults, label: 'All' }])
            },
          })
          break
        case 'tag':
          await getAllTags({
            params: {
              name: searchValue ? searchValue : '',
              sortBy: 'asc',
              limit,
              page,
            },
            success: ({ data }) => {
              setDataList(data)
              setRowsPerPageOptions([10, 25, 100, { value: data.totalResults, label: 'All' }])
            },
          })
          break
        case 'search':
          break
        default:
      }

    }
    init()
  }, [searchValue, type, limit, page, getAllCategories, getAllTags])

  return (
    <div>

      <PageTitle title='Trend Over View' button={`Add New ${type}`} onClick={handleClickAddDetail} />

      <CustomAlert
        isOpen={alertOpen}
        type={alertType}
        text={alertText}
        onClose={() => setAlertOpen(false)}
      />

      <MuiThemeProvider theme={myTheme}>
        {isLoading && <Loader />}
        <MUIDataTable
          title={`${type} list`}
          data={dataList.results && dataList.results.map((item, index) => {
            return [
              moment(item.createdAt).format('yyyy.MM.DD - hh:mm'),
              item.name,
              item.type,
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
            searchPlaceholder: 'Input Name:',
            onSearchChange: (text) => { setSearchValue(text) },
            onSearchClose: () => { setSearchValue('') },
          }}
        />
        {
          dataList.totalResults &&
          <TablePagination
            component='div'
            count={dataList.totalResults}
            page={page - 1}
            onChangePage={handleChangePage}
            rowsPerPage={limit}
            onChangeRowsPerPage={handleChangeRowPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        }
      </MuiThemeProvider>
      {openPropertyModal &&
        <ManagePropertyModal
          open={openPropertyModal}
          onClose={() => {
            setOpenPropertyModal(false)
            getPropertyInfo(page, limit)
          }}
          mode={modalMode}
          propertyInfo={editPropertyInfo && editPropertyInfo}
          propertyName={type}
        />
      }
    </div>
  )
}

Trend.propTypes = {
  getAllCategories: PropTypes.any,
  getAllTags: PropTypes.func,
  deleteTag: PropTypes.func,
  deleteCategory: PropTypes.func,
}

const actions = {
  getAllCategories,
  getAllTags,
  deleteTag,
  deleteCategory,
}

export default compose(connect(null, actions))(Trend)

const myTheme = createMuiTheme({
  overrides: {
    MUIDataTableToolBar: {
      root: {
        color: '##333333',
      }
    }
  }
})

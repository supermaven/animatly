import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import PageTitle from 'admin/components/PageTitle'
import { Loader } from 'components/Loader'
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
import { getUsers, deleteUser } from 'redux/modules/user/actions'
import { usersSelector } from 'redux/modules/user/selectors'
import { createStructuredSelector } from 'reselect'
import moment from 'moment'
import { ManageUserModal } from 'admin/components/ManageUserModal'

const User = ({
  getUsers,
  deleteUser,
  users,
}) => {
  const classes = useStyles()
  const [userList, setUserList] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [openUserModal, setOpenUserModal] = useState(false)
  const [modalMode, setModalMode] = useState('Edit')
  const [editUserInfo, setEditUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([10, 25, 100, { value: -1, label: 'All' }])

  const datatableColums = [
    { name: 'Date' },
    { name: 'Name' },
    { name: 'Email' },
    {
      name: 'Role',
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
    { name: 'Verify' },
    { name: 'Licensed' },
    {
      name: 'Payment',
      options: {
        filter: true,
        sort: true,
        empty: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (<>{
            value && <Chip size='small' classes={{ root: classes[value] }} label={value} />
          }</>)
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

  const handleClickEdit = (userInfo) => () => {
    setModalMode('Edit')
    setEditUserInfo(userInfo)
    setOpenUserModal(true)
  }

  const handleClickDelete = (userInfo) => async () => {
    setIsLoading(true)
    await deleteUser({
      id: userInfo.id,
      success: async ({ data }) => {
        setIsLoading(false)
        await getUsersInfo(page, limit)
      },
      fail: (err) => {
        setIsLoading(false)
      }
    })
  }
  const handleChangePage = (e, value) => {
    setPage(value + 1)
  }

  const handleChangeRowPerPage = (e) => {
    const value = e.target.value
    setLimit(value)
  }

  const handleClickAddUser = () => {
    setModalMode('Create')
    setOpenUserModal(true)
    setEditUserInfo(null)
  }

  const getUsersInfo = async (page, limit) => {
    await getUsers({
      params: {
        email: searchValue ? searchValue : '',
        sortBy: 'asc',
        limit,
        page,
      },
      success: ({ data }) => {
        setUserList(data)
      },
      fail: (err) => {
        //console.log(err)
      }
    })
  }

  useEffect(() => {
    const init = async () => {
      await getUsers({
        params: {
          email: searchValue ? searchValue : '',
          sortBy: 'asc',
          limit,
          page,
        },
        success: ({ data }) => {
          setUserList(data)
          setRowsPerPageOptions([10, 25, 100, { value: data.totalResults, label: 'All' }])
        },
        fail: (err) => {
          //console.log(err)
        }
      })
    }
    init()
  }, [searchValue, limit, page, getUsers])

  return (
    <div>
      <PageTitle title='User management' button='Add New User' onClick={handleClickAddUser} />

      <MuiThemeProvider theme={myTheme}>
        {isLoading && <Loader />}
        <MUIDataTable
          title='User list'
          data={userList.results && userList.results.map((item, index) => {
            return [
              moment(item.createdAt).format('yyyy.MM.DD - hh:mm'),
              item.name,
              item.email,
              item.role,
              item.paymentMethod ? true : false,
              item.licensePackageId && 'packageId' + item.licensePackageId,
              item.paymentMethod,
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
            searchPlaceholder: 'Input User Email:',
            onSearchChange: (text) => { setSearchValue(text) },
            onSearchClose: () => { setSearchValue('') },
          }}
        />

        {
          userList.totalResults &&
          <TablePagination
            component='div'
            count={userList.totalResults}
            page={page - 1}
            onChangePage={handleChangePage}
            rowsPerPage={limit}
            onChangeRowsPerPage={handleChangeRowPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        }
      </MuiThemeProvider>

      {openUserModal &&
        <ManageUserModal
          open={openUserModal}
          onClose={() => setOpenUserModal(false)}
          mode={modalMode}
          userInfo={editUserInfo && editUserInfo}
        />
      }
    </div>
  )
}

User.propTypes = {
  users: PropTypes.any,
  getUsers: PropTypes.func,
  deleteUser: PropTypes.func,
}

const actions = {
  getUsers,
  deleteUser,
}

const selector = createStructuredSelector({
  users: usersSelector,
})

export default compose(connect(selector, actions))(User)

const myTheme = createMuiTheme({
  overrides: {
    MUIDataTableToolBar: {
      root: {
        color: '##333333',
      }
    }
  }
})


import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import MUIDataTable from 'mui-datatables'
import PageTitle from 'admin/components/PageTitle'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {
  Chip,
  TablePagination,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getStripeSubscriptions, getPaypalSubscriptions } from 'redux/modules/subscribe/actions'
import moment from 'moment'
import { useLocation } from 'react-router-dom'

const Subscription = ({
  getStripeSubscriptions,
  getPaypalSubscriptions,
}) => {
  const classes = useStyles()
  const location = useLocation()
  const [subscriptionList, setSubscriptionList] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(100)
  const [type, setType] = useState('stripe')
  const [searchValue, setSearchValue] = useState('')

  const datatableColums = [
    { name: 'User' },
    { name: 'Email' },
    {
      name: 'Plan',
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
    { name: 'Start Date' },
    { name: 'End Date' },
  ]

  const packageText = ['icon', 'illustration', 'both']

  useEffect(() => {
    const params = location.hash.slice(1)
    switch (params) {
      case 'stripe':
        setType(params)
        break
      case 'paypal':
        setType(params)
        break
      default:
        break
    }
  }, [location])

  const handleChangePage = (e, value) => {
    setPage(value + 1)
    if (type === 'stripe') {
      getStripeInfo(value + 1, limit)
    } else if (type === 'paypal') {
      getPaypalInfo(value + 1, limit)
    }
  }

  const handleChangeRowPerPage = (e) => {
    const value = e.target.value
    setLimit(value)
    setPage(1)
    if (type === 'stripe') {
      getStripeInfo(page, value)
    } else if (type === 'paypal') {
      getPaypalInfo(page, value)
    }
  }

  const getStripeInfo = async (page, limit) => {
    await getStripeSubscriptions({
      params: {
        email: searchValue ? searchValue : '',
        sortBy: 'asc',
        limit,
        page,
      },
      success: ({ data }) => {
        setSubscriptionList(data)
      },
      fail: (err) => {
        //console.log(err)
      }
    })
  }

  const getPaypalInfo = async (page, limit) => {
    await getPaypalSubscriptions({
      params: {
        email: searchValue ? searchValue : '',
        sortBy: 'asc',
        limit,
        page,
      },
      success: ({ data }) => {
        setSubscriptionList(data)
      },
      fail: (err) => {
        //console.log(err)
      }
    })
  }

  useEffect(() => {
    const init = async () => {
      if (type === 'stripe') {
        await getStripeSubscriptions({
          params: {
            email: searchValue ? searchValue : '',
            sortBy: 'asc',
            limit,
            page,
          },
          success: ({ data }) => {
            setSubscriptionList(data)
          },
          fail: (err) => {
            //console.log(err)
          }
        })
      } else if (type === 'paypal') {
        await getPaypalSubscriptions({
          params: {
            email: searchValue ? searchValue : '',
            sortBy: 'asc',
            limit,
            page,
          },
          success: ({ data }) => {
            setSubscriptionList(data)
          },
          fail: (err) => {
            //console.log(err)
          }
        })
      }
    }
    init()
  }, [searchValue, type, limit, page, getPaypalSubscriptions, getStripeSubscriptions, setSubscriptionList])

  return (
    <div>
      <PageTitle title='Active Subscription History' />

      <MuiThemeProvider theme={myTheme}>
        <MUIDataTable
          title={`${type} subscription`}
          data={subscriptionList.results && subscriptionList.results.map((item, index) => {
            const startDate = type === 'stripe' ?
              moment(item.current_period_start).unix() * 1000000 : item.current_period_start
            const endDate = type === 'stripe' ?
              moment(item.current_period_end).unix() * 1000000 : item.current_period_end

            return [
              item.username,
              item.email,
              packageText[item.licensePackageId],
              moment(startDate).format('YYYY.MM.DD - h:mm'),
              moment(endDate).format('YYYY.MM.DD - h:mm'),
            ]
          })}
          columns={datatableColums}
          options={{
            filter: true,
            filterType: 'dropdown',
            pagination: false,
            print: false,
            selectableRows: 'none',
            searchPlaceholder: 'Input User Email:',
            onSearchChange: (text) => { setSearchValue(text) },
            onSearchClose: () => { setSearchValue('') },
          }}
        />

        {
          subscriptionList.totalResults &&
          <TablePagination
            component='div'
            count={subscriptionList.totalResults}
            page={page - 1}
            onChangePage={handleChangePage}
            rowsPerPage={limit}
            onChangeRowsPerPage={handleChangeRowPerPage}
          />
        }
      </MuiThemeProvider>

    </div>
  )
}

Subscription.propTypes = {
  getStripeSubscriptions: PropTypes.func,
  getPaypalSubscriptions: PropTypes.func,
}

const actions = {
  getStripeSubscriptions,
  getPaypalSubscriptions,
}

export default compose(connect(null, actions))(Subscription)

const myTheme = createMuiTheme({
  overrides: {
    MUIDataTableToolBar: {
      root: {
        color: '##333333',
      }
    }
  }
})

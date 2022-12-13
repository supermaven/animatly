import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { currentUserSelector } from 'redux/modules/auth/selectors'

const AdminRoute = ({
  curretUser,
  children,
  path,
  component,
  ...props
}) => {
  return <Route
    path={path}
    render={
      prop =>
        (!curretUser || curretUser.role !== 'admin')
          ?
          <Redirect to='/' />
          :
          React.createElement(component, prop)
    }
  />
}

AdminRoute.propTypes = {
  curretUser: PropTypes.any,
}

const selector = createStructuredSelector({
  curretUser: currentUserSelector
})

export default connect(selector)(AdminRoute)

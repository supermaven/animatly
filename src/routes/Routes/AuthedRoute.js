import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authInfo } from 'helpers/localCheck'

const AuthedRoute = ({
  children,
  path,
  component,
  ...props
}) => {
  const curretUser = authInfo().user
  return <Route
    exact
    path={path}
    render={prop => curretUser ? React.createElement(component, prop) : <Redirect to='/' />}
  />
}

export default AuthedRoute

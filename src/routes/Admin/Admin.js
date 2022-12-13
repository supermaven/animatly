import React from 'react'
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import useStyles from './styles'
import * as cx from 'classnames'

import Header from 'admin/components/Header'
import Sidebar from 'admin/components/Sidebar'
import User from 'admin/routes/User'
import Lottie from 'admin/routes/Lottie'
import Subscription from 'admin/routes/Subscription'
import Trend from 'admin/routes/Trend'
import { useLayoutState } from 'admin/context/LayoutContext'

const Admin = () => {

  var classes = useStyles()

  // global
  var layoutState = useLayoutState()

  return (
    <div className={classes.root}>
      <>
        <Header />
        <Sidebar />
        <div
          className={cx(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>

            <Route path='/admin/user' component={User} />
            <Route path='/admin/lottie' component={Lottie} />
            <Route path='/admin/subscription' component={Subscription} />
            <Route path='/admin/trend' component={Trend} />

          </Switch>
        </div>
      </>
    </div>
  )
}

export default withRouter(Admin)

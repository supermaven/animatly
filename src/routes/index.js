import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import HowToUse from './HowToUse'
import HowToUseDetail from './HowToUseDetail'
import Pricing from './Pricing'
import Account from './Account'
import Search from './Search'
import Admin from './Admin'
import Callback from './Callback'
import GifDownLoad from './GifDownLoad'
import { SignUp } from 'containers/SignUp'
import { SignIn } from 'containers/SignIn'
import { ResetPassword } from 'containers/ResetPassword'
import { CreateAccountFirst } from 'containers/CreateAccountFirst'
import { NewPassword } from 'containers/NewPassword'
import { NeedToUpgrade } from 'containers/NeedToUpgrade'
import { Subscribe } from 'containers/Subscribe'
import { Success } from 'containers/Success'
import { RequestVerify } from 'containers/RequestVerify'
import { AcceptCookie } from 'components/AcceptCookie'
import { CustomAlert } from 'components/CustomAlert'
import {
  setSignupOpen,
  setSigninOpen,
  setResetPasswordOpen,
  setCreateAccountFirstOpen,
  setNewPasswordOpen,
  setNeedToUpgradeOpen,
  setSubscribeOpen,
  setSuccessOpen,
  setRequestVerifyOpen,
} from 'redux/modules/global/actions'
import {
  signupOpenSelector,
  signinOpenSelector,
  resetPasswordOpenSelector,
  createAccountFirstOpenSelector,
  newPasswordOpenSelector,
  needToUpgradeOpenSelector,
  subscribeOpenSelector,
  subscribeInfoSelector,
  successOpenSelector,
  requestVerifyOpenSelector,
  successModalCustomInfoSelector,
  cookieSelector,
} from 'redux/modules/global/selectors'
import {
  currentUserSelector,
  authTokenSelector,
  authTotalStatusSelector
} from 'redux/modules/auth/selectors'
import { refreshToken } from 'redux/modules/auth/actions'
import { authInfo } from 'helpers/localCheck'

import AOS from 'aos'
import 'aos/dist/aos.css'
import ScrollToTop from 'react-router-scroll-top'
import { AuthedRoute, AdminRoute } from './Routes'

const Routes = ({
  setSignupOpen,
  setSigninOpen,
  setResetPasswordOpen,
  setCreateAccountFirstOpen,
  setNewPasswordOpen,
  setNeedToUpgradeOpen,
  setSubscribeOpen,
  setSuccessOpen,
  setRequestVerifyOpen,
  signupOpen,
  signinOpen,
  resetPasswordOpen,
  createAccountFirstOpen,
  newPasswordOpen,
  needToUpgradeOpen,
  subscribeOpen,
  subscribeInfo,
  successOpen,
  requestVerifyOpen,
  cookie,
  successModalCustomInfo,
  authStatus,
  curretUser,
  authToken,
  refreshToken,
}) => {
  const [openSignup, setOpenSignup] = useState(false)
  const [openSignin, setOpenSignin] = useState(false)
  const [openResetPassword, setOpenResetPassword] = useState(false)
  const [openCreateAccountFirst, setOpenCreateAccountFirst] = useState(false)
  const [openNewPassword, setOpenNewPassword] = useState(false)
  const [openNeedToUpgrade, setOpenNeedToUpgrade] = useState(false)
  const [openSubscribe, setOpenSubscribe] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openRequestverify, setOpenRequestVerify] = useState(false)
  const [openUnauthAlert, SetOpenUnauthAlert] = useState(false)

  useEffect(() => {
    AOS.init({
      offset: 50,
      once: true,
      duration: 700,
      delay: 50,
    })
  })

  useEffect(() => {
    const refreshAuth = async () => {
      const cur_refreshToken = authInfo().tokens.refresh.token
      await refreshToken({
        body: { refreshToken: cur_refreshToken }
      })
    }

    if (authInfo().user) {
      refreshAuth()
    }
  }, [refreshToken])

  useEffect(() => {
    authStatus === 'UNAUTHORIZED' ? SetOpenUnauthAlert(true) : SetOpenUnauthAlert(false)
  }, [authStatus, SetOpenUnauthAlert])

  useEffect(() => {
    setOpenSignup(signupOpen)
    setOpenSignin(signinOpen)
    setOpenResetPassword(resetPasswordOpen)
    setOpenCreateAccountFirst(createAccountFirstOpen)
    setOpenNewPassword(newPasswordOpen)
    setOpenNeedToUpgrade(needToUpgradeOpen)
    setOpenSubscribe(subscribeOpen)
    setOpenSuccess(successOpen)
    setOpenRequestVerify(requestVerifyOpen)
  }, [
    signupOpen,
    signinOpen,
    resetPasswordOpen,
    createAccountFirstOpen,
    newPasswordOpen,
    needToUpgradeOpen,
    subscribeOpen,
    successOpen,
    requestVerifyOpen,
  ])

  return (
    <Router >
      <ScrollToTop>
        <CustomAlert
          isOpen={openUnauthAlert}
          type='error'
          disableAutoHide={true}
          text='Unauthorized! Please logout first and then re-login.'
          onClose={() => SetOpenUnauthAlert(false)}
        />

        <SignUp open={openSignup} onClose={() => setSignupOpen({ open: false })} />
        <SignIn open={openSignin} onClose={() => setSigninOpen({ open: false })} />
        <ResetPassword open={openResetPassword} onClose={() => setResetPasswordOpen({ open: false })} />
        <CreateAccountFirst open={openCreateAccountFirst} onClose={() => setCreateAccountFirstOpen({ open: false })} />
        <NewPassword open={openNewPassword} onClose={() => setNewPasswordOpen({ open: false })} />
        <NeedToUpgrade open={openNeedToUpgrade} onClose={() => setNeedToUpgradeOpen({ open: false })} />
        <Subscribe
          open={openSubscribe}
          info={subscribeInfo}
          onClose={() => setSubscribeOpen({ open: false, subscribeInfo: null })}
        />
        <Success
          open={openSuccess}
          onClose={() => setSuccessOpen({ open: false })}
          customInfo={successModalCustomInfo}
        />
        <RequestVerify open={openRequestverify} onClose={() => setRequestVerifyOpen({ open: false })} />

        {cookie === false && <AcceptCookie />}

        <Route exact path='/' component={Home} />
        <Route path='/howToUse' component={HowToUse} />
        <Route path='/howToUseDetail' component={HowToUseDetail} />
        <Route path='/pricing' component={Pricing} />
        <Route path='/search' component={Search} />
        <Route path='/callback' component={Callback} />
        <AuthedRoute path='/account' component={Account} />
        <AuthedRoute path='/gifDownload' component={GifDownLoad} />

        <AdminRoute path='/admin' component={Admin} />
      </ScrollToTop>
    </Router>
  )
}

Routes.propTypes = {
  signupOpen: PropTypes.bool,
  signinOpen: PropTypes.bool,
  resetPasswordOpen: PropTypes.bool,
  createAccountFirstOpen: PropTypes.bool,
  newPasswordOpen: PropTypes.bool,
  needToUpgradeOpen: PropTypes.bool,
  subscribeOpen: PropTypes.bool,
  successOpen: PropTypes.bool,
  subscribeInfo: PropTypes.any,
  curretUser: PropTypes.any,
  authToken: PropTypes.any,
  successModalCustomInfo: PropTypes.any,
  cookie: PropTypes.any,
  setSignupOpen: PropTypes.func,
  setSigninOpen: PropTypes.func,
  setResetPasswordOpen: PropTypes.func,
  setRequestVerifyOpen: PropTypes.func,
  setCreateAccountFirstOpen: PropTypes.func,
  setNewPasswordOpen: PropTypes.func,
  setNeedToUpgradeOpen: PropTypes.func,
  setSubscribeOpen: PropTypes.func,
  setSuccessOpen: PropTypes.func,
  refreshToken: PropTypes.func,
}

const actions = {
  setSignupOpen,
  setSigninOpen,
  setResetPasswordOpen,
  setCreateAccountFirstOpen,
  setNewPasswordOpen,
  setNeedToUpgradeOpen,
  setSubscribeOpen,
  setSuccessOpen,
  setRequestVerifyOpen,
  refreshToken,
}

const selector = createStructuredSelector({
  signupOpen: signupOpenSelector,
  signinOpen: signinOpenSelector,
  resetPasswordOpen: resetPasswordOpenSelector,
  createAccountFirstOpen: createAccountFirstOpenSelector,
  newPasswordOpen: newPasswordOpenSelector,
  needToUpgradeOpen: needToUpgradeOpenSelector,
  subscribeOpen: subscribeOpenSelector,
  subscribeInfo: subscribeInfoSelector,
  successOpen: successOpenSelector,
  requestVerifyOpen: requestVerifyOpenSelector,
  curretUser: currentUserSelector,
  authToken: authTokenSelector,
  cookie: cookieSelector,
  successModalCustomInfo: successModalCustomInfoSelector,
  authStatus: authTotalStatusSelector,
})

export default compose(connect(selector, actions))(Routes)

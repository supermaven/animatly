import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { checkAccountVerification } from 'redux/modules/auth/actions'
import { setNewPasswordOpen, setResetPasswordToken } from 'redux/modules/global/actions'
import PropTypes from 'prop-types'

const Callback = ({
  checkAccountVerification,
  setNewPasswordOpen,
  setResetPasswordToken,
}) => {
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const doCheckAccountVerification = async (token) => {
      await checkAccountVerification({
        token,
        success: ({ data }) => {
          history.push('/')
        },
        fail: (err) => {
          history.push('/')
        }
      })
    }
    const init = () => {
      const params = new URLSearchParams(location.search)
      const arg_callbackMode = params.get('mode')
      if (arg_callbackMode === 'accountVerify') {
        const token = params.get('token')
        doCheckAccountVerification(token)
      } else if (arg_callbackMode === 'forgotPassword') {
        const token = params.get('token')
        setResetPasswordToken(token)
        setNewPasswordOpen({ open: true })
        history.push('/')
      }
    }
    init()
  }, [location, history, checkAccountVerification, setNewPasswordOpen, setResetPasswordToken])

  return (
    <>
    </>
  )
}

Callback.propTypes = {
  checkAccountVerification: PropTypes.any,
  setNewPasswordOpen: PropTypes.func,
  setResetPasswordToken: PropTypes.func,
}

const actions = {
  checkAccountVerification,
  setNewPasswordOpen,
  setResetPasswordToken,
}

export default compose(connect(null, actions))(Callback)

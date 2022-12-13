import React, { useState } from 'react'
import useStyles from './Form.styles'
import {
  Container,
  CircularProgress,
} from '@material-ui/core'
import { CustomInput } from 'components/CustomInput'
import { CustomButton } from 'components/CustomButton'
import { resetPasswordTokenSelector } from 'redux/modules/global/selectors'
import { resetPassword } from 'redux/modules/auth/actions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { CustomAlert } from 'components/CustomAlert'

const Form = ({
  onClose,
  resetPassword,
  resetPasswordToken,
}) => {
  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [isWaiting, setIsWaiting] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertMode, setAlertMode] = useState('error')

  const handleSavePassword = async () => {
    setIsWaiting(true)
    await resetPassword({
      params: { token: resetPasswordToken },
      body: { password },
      success: ({ data }) => {
        setIsWaiting(false)
        setAlertOpen(true)
        setAlertText('Reset Password Success!')
        setAlertMode('success')
        onClose()
      },
      fail: (err) => {
        setAlertOpen(true)
        setIsWaiting(false)
        setAlertText('Reset Password Fail!')
        setAlertMode('error')
      }
    })
  }

  return (
    <>
      <div className={classes.root}>
        <Container>
          <div className={classes.title}>New password</div>
          <div className={classes.description}>
            Please enter your new password.
          </div>
          <CustomInput placeholder='New password' type='password' onChange={value => setPassword(value)} />
          <div className={classes.wrapper}>
            <CustomButton
              content='Save new password'
              type='filled'
              className={classes.signButton}
              onClick={handleSavePassword}
              disabled={isWaiting}
            />
            {isWaiting && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </Container>
        <div className={classes.label3}></div>
      </div>
      <CustomAlert
        isOpen={alertOpen}
        type={alertMode}
        text={alertText}
        onClose={() => setAlertOpen(false)}
      />
    </>
  )
}

Form.propTypes = {
  resetPassword: PropTypes.func,
  resetPasswordToken: PropTypes.any,
}

const actions = {
  resetPassword,
}

const selector = createStructuredSelector({
  resetPasswordToken: resetPasswordTokenSelector
})

export default compose(connect(selector, actions))(Form)

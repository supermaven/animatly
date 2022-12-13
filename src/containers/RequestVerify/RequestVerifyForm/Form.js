import React from 'react'
import useStyles from './Form.styles'
import {
  Container,
} from '@material-ui/core'
import { CustomButton } from 'components/CustomButton'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { requestAccountVerify } from 'redux/modules/auth/actions'
import { useHistory } from 'react-router-dom'
import { authInfo } from 'helpers/localCheck'

const Form = ({ requestAccountVerify, onClose }) => {
  const classes = useStyles()
  const history = useHistory()
  const userInfo = authInfo().user

  const handleSendVerification = async () => {
    await requestAccountVerify()
    onClose()
  }
  const handleChangeEmail = () => {
    history.push('/account#details')
    onClose()
  }

  return (
    <>
      <div className={classes.root}>
        <Container>
          <div className={classes.title}>Verify your email to proceed</div>
          <p className={classes.label3}>
            We just sent an email to the address: 
            <span > {userInfo && userInfo.email}</span>
          </p>
          <div className={classes.description}>
            Please check your email and click on the link provided to verify your address.
          </div>
          <CustomButton
            content='Resend Verification Email'
            type='filled'
            className={classes.signButton}
            onClick={handleSendVerification}
          />
          <CustomButton
            content='Change email'
            onClick={handleChangeEmail}
            type='outLine'
            className={classes.signButton}
          />
        </Container>
      </div>
    </>
  )
}

Form.propTypes = {
  requestAccountVerify: PropTypes.func,
}

const actions = {
  requestAccountVerify,
}

export default compose(connect(null, actions))(Form)


import React from 'react'
import useStyles from './Form.styles'
import {
  Container,
  Divider,
} from '@material-ui/core'
import { CustomButton } from 'components/CustomButton'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setSigninOpen, setSignupOpen } from 'redux/modules/global/actions'
import { useHistory } from 'react-router-dom'

const Form = ({ setSigninOpen, setSignupOpen, onClose }) => {
  const classes = useStyles()
  const history = useHistory()

  const handleLogin = () => {
    setSigninOpen({ open: true })
    onClose()
  }
  const handleSignup = () => {
    setSignupOpen({ open: true })
    onClose()
  }
  const handlePricing = () => {
    history.push('/pricing')
    onClose()
  }

  return (
    <>
      <div className={classes.root}>
        <Container>
          <div className={classes.title}>You need to create an account first.</div>
          <div className={classes.description}>
            Beautify your interactive projects in a few clicks. Start discovering Animatly for free.
          </div>
          <CustomButton
            content='Start Free Now'
            type='filled'
            className={classes.signButton}
            onClick={handleSignup}
          />
          <CustomButton
            content='Go to pricing'
            onClick={handlePricing}
            type='outLine'
            className={classes.signButton}
          />
        </Container>
        <Divider className={classes.divider2} />
        <div className={classes.label3}>
          Already a member? <span onClick={handleLogin}>Sign In</span>
        </div>
      </div>
    </>
  )
}

Form.propTypes = {
  setSigninOpen: PropTypes.func,
  setSignupOpen: PropTypes.func,
}

const actions = {
  setSigninOpen,
  setSignupOpen,
}

export default compose(connect(null, actions))(Form)


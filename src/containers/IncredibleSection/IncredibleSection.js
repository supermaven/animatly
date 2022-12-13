import React from 'react'
import useStyles from './styles'
import { CustomButton } from 'components/CustomButton'
import { Mobile, Default } from 'containers/ResponseLayout'
import {
  Container,
  Grid,
} from '@material-ui/core'
import post from 'assets/images/background/post.png'
import { setSignupOpen } from 'redux/modules/global/actions'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

const content = {
  title: 'Create an incredible experience in minutes',
  description: 'Pre-designed by our team. Just add your touch.',
  buttonText: 'Start Free Now',
  mobileButtonText: 'Try Free Now',
}

const IncredibleSection = ({ setSignupOpen }) => {
  const classes = useStyles()
  const { title, description, buttonText, mobileButtonText } = content
  const isMobile = useMediaQuery({ maxWidth: 600 })

  const handleSignup = () => {
    setSignupOpen({ open: true })
  }

  return (
    <Container className={classes.container}>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={isMobile ? 12 : 6}>
            <div className={classes.mainContent}>
              <div className={classes.startOnSite}>
                <div className={classes.title}>{title}</div>
                <div className={classes.description}>{description}</div>
                <Default>
                  <CustomButton
                    className={classes.siteButton}
                    content={buttonText}
                    type='filled'
                    onClick={handleSignup} />
                </Default>
                <Mobile>
                  <CustomButton
                    className={classes.siteButton}
                    content={mobileButtonText}
                    type='filled'
                    onClick={handleSignup} />
                </Mobile>
              </div>
            </div>
          </Grid>
          {!isMobile &&
            <Grid item xs={6} className={classes.center}>
              <div className={classes.postArea}>
                <img src={post} alt='post' className={classes.postImage} />
              </div>
            </Grid>
          }
        </Grid>

      </div>
    </Container>
  )
}

IncredibleSection.propTypes = {
  setSignupOpen: PropTypes.func,
}

const actions = {
  setSignupOpen,
}

export default compose(connect(null, actions))(IncredibleSection)

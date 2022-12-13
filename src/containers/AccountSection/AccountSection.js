import React, { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Tabs,
  Tab,
  Link,
  CircularProgress,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import useStyles from './styles'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { retrieveDownload, retrieveSaved, removeSavedLottie } from 'redux/modules/lottie/actions'
import { setSubscribeOpen } from 'redux/modules/global/actions'
import { cancelStripeSubscription, cancelPaypalSubscription } from 'redux/modules/subscribe/actions'
import { updateUserProfile, deleteUser, refresh } from 'redux/modules/auth/actions'
import { currentUserSelector } from 'redux/modules/auth/selectors'
import { createStructuredSelector } from 'reselect'
import { CustomButton } from 'components/CustomButton'
import { CustomInput } from 'components/CustomInput'
import { useMediaQuery } from 'react-responsive'
import { validator } from 'helpers/validator'
import LottieActionArea from './LottieActionArea'
import { CustomAlert } from 'components/CustomAlert'
import { authClear } from 'helpers/localCheck'
import cloneDeep from 'lodash/cloneDeep'

const packages = {
  bothLicensed: {
    num: 3,
    name: 'Icons and Illustrations',
    price: '$15'
  },
  illustrationLicensedUser: {
    num: 2,
    name: 'Only Illustrations',
    price: '$9'
  },
  iconLicensedUser: {
    num: 1,
    name: 'Only Icons',
    price: '$9'
  },
}

const AccountSection = ({
  setSubscribeOpen,
  currentUser,
  retrieveDownload,
  retrieveSaved,
  removeSavedLottie,
  updateUserProfile,
  deleteUser,
  cancelStripeSubscription,
  cancelPaypalSubscription,
  refresh,
}) => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const isMobile = useMediaQuery({ maxWidth: 600 })
  const isIpad = useMediaQuery({ maxWidth: 992, minWidth: 601 })
  const packageInfo = currentUser && packages[currentUser.role]
  const [value, setValue] = useState(0)
  const [downloadHistory, setDownloadHistory] = useState(null)
  const [savedHistory, setSavedHistory] = useState(null)
  const [name, setName] = useState(currentUser && currentUser.name)
  const [email, setEmail] = useState(currentUser && currentUser.email)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationStr, setValidationStr] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [updatedSuccess, setUpdatedSucces] = useState(false)

  useEffect(() => {
    const params = location.hash.slice(1)
    switch (params) {
      case 'downloads':
        setValue(0)
        break
      case 'saved':
        setValue(1)
        break
      case 'details':
        setValue(2)
        break
      default:
        break
    }
  }, [location])

  useEffect(() => {
    const fetchDownload = async () => {
      await retrieveDownload({
        body: { userId: currentUser.id },
        success: ({ data }) => {
          setDownloadHistory(data)
        }
      })
    }

    const fetchSaved = async () => {
      await retrieveSaved({
        body: { userId: currentUser.id },
        success: ({ data }) => {
          setSavedHistory(data)
        }
      })
    }

    if (value === 0) {
      currentUser && fetchDownload()
    } else if (value === 1) {
      currentUser && fetchSaved()
    }
  }, [value, currentUser, retrieveDownload, retrieveSaved])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSavedRemove = async (key) => {
    const { type, lottieId } = savedHistory[key]
    await removeSavedLottie({
      body: {
        type,
        lottieId,
        userId: currentUser.id,
      },
      success: ({ data }) => {
        let copyHistory = cloneDeep(savedHistory)
        setSavedHistory(null)
        copyHistory.splice(key, 1)
        setSavedHistory(copyHistory)
      }
    })
  }

  const handleCancel = async () => {
    if (currentUser.paymentMethod === 'stripe') {
      await cancelStripeSubscription({
        success: async () => {
          await refresh()
        }
      })
    } else if (currentUser.paymentMethod === 'paypal') {
      await cancelPaypalSubscription({
        success: async () => {
          await refresh()
        }
      })
    }
  }

  const handleDeleteAccount = async () => {
    await deleteUser({
      success: ({ data }) => {
        authClear()
        history.push('/')
      }
    })
  }

  const handleClickSave = async () => {
    let validation_str = []
    validation_str.push(validator(name, ['require']))
    validation_str.push(validator(email, ['require', 'email']))
    validation_str.push(validator(password, ['require', 'password']))
    validation_str.push(validator(password, ['require', 'confirm_password'], confirmPassword))
    setValidationStr(validation_str)

    const isValid = validation_str.filter(item => item).length ? false : true
    if (isValid) {
      setIsUpdating(true)
      await updateUserProfile({
        body: {
          userId: currentUser.id,
          name,
          email,
          password,
        },
        success: ({ data }) => {
          setUpdatedSucces(true)
          setIsUpdating(false)
          setAlertOpen(true)
        },
        fail: (err) => {
          setUpdatedSucces(false)
          setIsUpdating(false)
          setAlertOpen(true)
        }
      })
    }
  }

  const handleChangeInput = (key) => (val) => {
    switch (key) {
      case 'name':
        setName(val)
        break
      case 'email':
        setEmail(val)
        break
      case 'password':
        setPassword(val)
        break
      case 'confirmPassword':
        setConfirmPassword(val)
        break
      default:
        break
    }
  }

  const PackagePlanArea = () => {
    return (
      <div className={classes.itemAreaBottomBoder}>
        <div className={classes.packagePlanArea}>
          {
            packageInfo
              ?
              <>
                <div className={classes.content}>
                  {
                    isMobile ?
                      <>
                        <div style={{ marginBottom: '8px' }}>Your plan: <strong>{packageInfo.name}</strong></div>
                        <div>Valid until: 21.12.2022</div>
                      </>
                      :
                      <>
                        <div>Pacakge {packageInfo.num}:</div>
                        <div>{packageInfo.name}</div>
                      </>
                  }

                </div>
                {
                  !isMobile &&
                  <div className={classes.billedAmount}>Yearly billed {packageInfo.price}</div>
                }
              </>
              :
              <div className={classes.content}>
                <div>{currentUser && currentUser.role === 'admin' ? 'You are Admin' : 'Your plan: Free plan.'}</div>
              </div>
          }
          {
            (currentUser && currentUser.role !== 'admin' && currentUser.role !== 'bothLicensed') &&
            <CustomButton
              content='Upgrade plan'
              type='filled'
              className={classes.upgradePlan}
              onClick={() => history.push('/pricing')}
            />
          }
        </div>
        {
          packageInfo &&
          <div className={classes.cancelPlanBtn}>
            <Link
              component='button'
              variant='body2'
              onClick={handleCancel}
            >Cancel plan</Link>
          </div>
        }
      </div>
    )
  }


  return (
    <Container className={classes.root}>
      <CustomAlert
        isOpen={alertOpen}
        type={updatedSuccess ? 'success' : 'error'}
        text={updatedSuccess ? 'Account profile updated successfully!' : 'Updating Failed'}
        onClose={() => setAlertOpen(false)}
      />

      <div className={classes.tabHeaderArea}>
        <AntTabs value={value} onChange={handleChange}>
          <AntTab label='Downloads' />
          <AntTab label='Saved' />
          <AntTab label='Details' />
        </AntTabs>
      </div>

      <div className={classes.tabContentArea}>
        <TabPanel value={value} index={0}>
          <LottieActionArea data={downloadHistory} mode='download' />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <LottieActionArea data={savedHistory} mode='saved' onSavedRemove={(key) => handleSavedRemove(key)} />
        </TabPanel>

        <TabPanel value={value} index={2} >
          <Grid container spacing={4}>
            <Grid item xs={isMobile ? 12 : (isIpad ? 9 : 6)} className={classes.gridItem}>
              {
                !isMobile && <PackagePlanArea />
              }
              <div className={classes.inputsArea}>
                <Grid item xs={12}>
                  <CustomInput
                    initialValue={currentUser && currentUser.name}
                    placeholder='Enter your Name'
                    onChange={handleChangeInput('name')}
                    hasError={validationStr[0]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    initialValue={currentUser && currentUser.email}
                    placeholder='Enter your Email Adress'
                    onChange={handleChangeInput('email')}
                    hasError={validationStr[1]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    type='password'
                    placeholder='Enter New Password'
                    onChange={handleChangeInput('password')}
                    hasError={validationStr[2]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    type='password'
                    placeholder='Confirm Password'
                    onChange={handleChangeInput('confirmPassword')}
                    hasError={validationStr[3]}
                  />
                </Grid>
                {
                  isMobile &&
                  <Grid item xs={12}>
                    <CustomButton
                      disabled={isUpdating}
                      content='Save changes'
                      type='outLine'
                      className={classes.saveMobileButton}
                      onClick={handleClickSave}
                    />
                  </Grid>
                }
              </div>
              {
                !isMobile &&
                <div className={classes.controlBox}>
                  <div className={classes.savebuttonArea}>
                    <div className={classes.wrapper}>
                      <CustomButton
                        disabled={isUpdating}
                        content='Save changes'
                        type='outLine'
                        className={classes.saveButton}
                        onClick={handleClickSave}
                      />
                      {isUpdating && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                  </div>
                  {
                    currentUser && currentUser.role !== 'admin' &&
                    <div className={classes.deleteAccountBtn}>
                      <Link
                        component='button'
                        variant='body2'
                        onClick={handleDeleteAccount}
                      >Delete Account</Link>
                    </div>
                  }
                </div>
              }

              {
                isMobile && <PackagePlanArea />
              }
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    </Container >
  )
}

AccountSection.propTypes = {
  setSubscribeOpen: PropTypes.func,
  retrieveDownload: PropTypes.func,
  retrieveSaved: PropTypes.func,
  removeSavedLottie: PropTypes.func,
  updateUserProfile: PropTypes.func,
  deleteUser: PropTypes.func,
  cancelStripeSubscription: PropTypes.func,
  cancelPaypalSubscription: PropTypes.func,
  refresh: PropTypes.func,
}

const actions = {
  setSubscribeOpen,
  retrieveDownload,
  retrieveSaved,
  removeSavedLottie,
  updateUserProfile,
  deleteUser,
  cancelStripeSubscription,
  cancelPaypalSubscription,
  refresh,
}

const selector = createStructuredSelector({
  currentUser: currentUserSelector,
})

export default compose(connect(selector, actions))(AccountSection)

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  )
}

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#0052FF',
  },
})(Tabs)

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '19px',
    marginRight: theme.spacing(4),

    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#0052FF',
    },
    '&:focus': {
      color: '#0052FF',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />)
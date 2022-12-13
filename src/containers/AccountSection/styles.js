import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    '@media only screen and (max-width: 600px)': {
      paddingTop: theme.spacing(1),
    }
  },
  tabHeaderArea: {
    marginBottom: theme.spacing(3),
  },
  tabContentArea: {
    paddingTop: theme.spacing(3),
  },
  gridItem: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
  },
  itemArea: {
    borderTop: '1px solid #D8D8D8',
  },
  itemAreaBottomBoder: {
    borderTop: '1px solid #D8D8D8',
    borderBottom: '1px solid #D8D8D8',
  },
  featureBottomText: {
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    color: '#8C8C8C',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    '@media only screen and (max-width: 600px)': {
      color: '#333333',
      textAlign: 'left',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5),
    }
  },
  upgradePlan: {
    color: 'white',
    marginLeft: 'auto',
    height: theme.spacing(3),
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    '@media only screen and (max-width: 600px)': {
      marginLeft: '0',
      marginTop: theme.spacing(2),
      height: theme.spacing(5),
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '19px',
    }
  },
  saveButton: {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    height: '32px',
  },
  saveMobileButton: {
    width: '100%',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
    height: '40px',
  },
  savebuttonArea: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteAccountBtn: {
    paddingTop: '14px',
  },
  cancelPlanBtn: {
    padding: theme.spacing(1),
    '@media only screen and (max-width: 600px)': {
      paddingLeft: theme.spacing(0),
    }
  },
  packagePlanArea: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    position: 'relative',
    paddingTop: '20px',
    '@media only screen and (max-width: 600px)': {
      display: 'block',
      alignItems: 'left',
      position: 'relative',
      padding: theme.spacing(1),
      paddingTop: '30px',
      paddingLeft: 0,
      paddingRight: 0,
    }
  },
  billedAmount: {
    color: '#333333',
    fontWeight: 'normal',
    fontSize: '10px',
    lineHeight: '12px',
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    color: '#333333',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
  },
  inputsArea: {
    marginTop: theme.spacing(2),
    '@media only screen and (max-width: 600px)': {
      marginBottom: theme.spacing(2),
    }
  },
  controlBox: {
    display: 'flex',
    padding: theme.spacing(1),
    position: 'relative',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: 'primary',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

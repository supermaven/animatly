import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    width: '100%',
    paddingBottom: '16px',
    '@media only screen and (max-width: 600px)': {
      height: 'calc(100vh - 304px)',
    }
  },
  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '28px',
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    '@media only screen and (max-width: 600px)': {
      fontSize: '26px',
      lineHeight: '30px',
      textAlign: 'left',
    }
  },
  description: {
    color: '#333333',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    '@media only screen and (max-width: 600px)': {
      fontSize: '14px',
      lineHeight: '16px',
      textAlign: 'left',
    }
  },
  divider: {
    marginBottom: '24px !important',
  },
  divider2: {
    marginTop: '12px !important',
    marginBottom: '12px !important',
  },
  signButton: {
    height: theme.spacing(5),
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  label3: {
    color: '#333333',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '14px',
    textAlign: 'center',
    marginBottom: theme.spacing(1.5),
    '& > span': {
      cursor: 'pointer',
      textDecoration: 'underline',
      color: '#0052FF'
    },
    '@media only screen and (max-width: 600px)': {
      fontSize: '14px',
      lineHeight: '16px',
    }
  }
}))

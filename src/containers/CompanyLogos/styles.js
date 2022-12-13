import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    height: '24px',
    width: '522px',
    display: 'flex',
    textAlign: 'center',
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(4),
    '@media only screen and (max-width: 600px)': {
      height: '40px',
      width: '100%',
      display: 'block',
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(0),
    }
  },
  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '24px',
    '@media only screen and (max-width: 600px)': {
      fontWeight: '500',
      fontSize: '10px',
      lineHeight: '12px',
      marginBottom: theme.spacing(1),
    }
  },
  logo: {
    marginLeft: theme.spacing(2),
    userSelect: 'none',
    '@media only screen and (max-width: 600px)': {
      height: '18px',
    }
  },
  logoArea: {
    display: 'flex'
  },

}))

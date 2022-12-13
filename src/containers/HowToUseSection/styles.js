import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
    '@media only screen and (max-width: 600px)': {
      marginBottom: theme.spacing(8),
    }
  },
  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '33px',
    marginBottom: theme.spacing(3),
    '@media only screen and (max-width: 600px)': {
      fontSize: '26px',
      lineHeight: '30px',
    }
  }
}))

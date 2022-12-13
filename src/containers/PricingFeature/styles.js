import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    '@media only screen and (max-width: 600px)': {
      paddingTop: theme.spacing(1),
    }
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
  }
}))

import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(18),
    paddingBottom: theme.spacing(18),
    '@media only screen and (max-width: 600px)': {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    }
  },
  videoArea: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '360px',
    marginTop: theme.spacing(2),
    borderRadius: '4px',
    userSelect: 'none',
    '@media only screen and (max-width: 600px)': {
      height: '210px',
      marginTop: theme.spacing(0),
    },
    '@media only screen and (min-width: 601px) and (max-width: 1024px)': {
      height: '226px',
      width: '352px',
    }
  }
}))

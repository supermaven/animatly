import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '40px',
    lineHeight: '47px',
    textAlign: 'center',
    width: '600px',
    height: '94px',
    '@media only screen and (max-width: 600px)': {
      height: 'auto',
      width: '100%',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '32px',
      lineHeight: '37px',
      textAlign: 'left',
      marginBottom: theme.spacing(4),
    }
  },
  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  area: {
    position: 'relative',
    height: '500px',
    '@media only screen and (max-width: 600px)': {
      height: 'auto',
      width: '100%',
      paddingTop: theme.spacing(14),
    }
  }

}))

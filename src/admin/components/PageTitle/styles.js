import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  pageTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(5),
  },
  typo: {
    color: theme.palette.text.hint,
  },
  button: {
    textTransform: 'none',
    backgroundColor: '#2196f3',
    color: 'white',
    '&:hOver': {
      backgroundColor: '#1769aa',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
}))

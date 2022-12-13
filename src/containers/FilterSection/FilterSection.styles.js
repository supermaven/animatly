import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  controlBox: {
    display: 'flex',
    paddingTop: theme.spacing(1),
  },
  labelFor: {
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '32px',
    color: '#3333333',
    marginRight: theme.spacing(2),
    '@media only screen and (max-width: 600px)': {
      fontSize: '14px',
      lineHeight: '32px',
    }
  },
  label: {
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '32px',
    color: '#3333333',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
  },
  button: {
    height: theme.spacing(4),
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
  illustrationButton: {
  },
  resetButton: {
    height: theme.spacing(3),
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '14px',
    width: theme.spacing(10),
    marginTop: '4px',
    marginLeft: theme.spacing(3),
    '& > * .MuiButton-startIcon': {
      marginRight: '0px !important',
    }
  }
}))

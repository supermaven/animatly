import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    top: 'auto',
    bottom: 0,
    background: 'white',
    color: '#333333',
    boxShadow: '0px 0px 12.5px rgba(0, 0, 0, 0.1)',
    transition: '0.6s',
    height: theme.spacing(42),
  },
  illHeight: {
    height: '400px',
  },
  content: {
    height: '100%',
  },
  editHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
    display: 'inline-block',
    justifyContent: 'left',
    alignItems: 'center',
    textAlign: 'center',
  },
  editArea: {
    display: 'flex',
    position: 'relative',
  },
  lottieArea: {
    position: 'relative',
    height: theme.spacing(30),
    padding: theme.spacing(1),
    background:
      'linear-gradient(#fff,#fff) padding-box, linear-gradient(165deg, #0052FF 0%, #FF00D0 100%) border-box',
    border: '1px solid transparent',
    borderRadius: '4px',
    marginRight: theme.spacing(5),
    '@media only screen and (max-width: 992px) and (min-width: 600px)': {
      marginRight: theme.spacing(0),
    }
  },
  iconsArea: {
    width: theme.spacing(30),
  },
  illuArea: {
    width: '100%',
    height: '304px'
  },
  name: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '33px',
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(3),
    float: 'left',
  },
  downloadButton: {
    height: '32px',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    width: '100%',
  },
  controllerArea: {
    width: theme.spacing(72),
    '@media only screen and (max-width: 992px) and (min-width: 600px)': {
      width: theme.spacing(55),
    }
  },
  fullid: {
    width: '100%',
  },
  saveButton: {
    height: '40px',
    width: '40px',
    float: 'left',
  },
  editFinishButton: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '14px',
    textTransform: 'none',
    height: '24px',
    '@media only screen and (max-width: 600px)': {
      height: '32px',
      fontSize: '14px',
      lineHeight: '16px',
    }
  },
  resetButton: {
    height: theme.spacing(3),
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '14px',
    width: theme.spacing(10),
    marginRight: theme.spacing(2),
    '& > * .MuiButton-startIcon': {
      marginRight: '0px !important',
    }
  },
  featureButtons: {
    position: 'absolute',
    right: '0px',
    textAlign: 'right',
  },
  extendedArea: {
    height: '152px !important'
  },
  colorPallet: {
    maxHeight: 'calc(100% - 16px)',
  },
  hiddenLottie: {
    position: 'absolute',
    bottom: '-10000px',
  },
}))

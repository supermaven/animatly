import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
    '@media only screen and (max-width: 600px)': {
      paddingTop: theme.spacing(3),
    }
  },
  isAuthedFreeSection: {
    marginTop: theme.spacing(5),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
    background: 'linear-gradient(165deg, #0052FF 0%, #FF00D0 100%) border-box',
  },
  resultMessage: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '33px',
    paddingLeft: '0px !important',
    '@media only screen and (max-width: 600px)': {
      fontSize: '26px',
      lineHeight: '30px',
      marginBottom: theme.spacing(2),
    }
  },
  whiteTitle: {
    color: 'white !important',
  },
  lottieArea: {
  },
  iconGrid: {
    width: 'calc((100% - 192px) / 8)',
    margin: '12px',
    minHeight: '50px',
    '@media only screen and (max-width: 600px)': {
      width: 'auto',
      margin: '0px',
      marginLeft: '0px',
      marginRight: '0px',
      minHeight: '50px',
    }
  },
  iconHeight: {
    minHeight: '50px !important',
    '@media only screen and (max-width: 600px)': {
      minHeight: '50px !important',
    }

  },
  illuheight: {
    minHeight: '120px !important',
    '@media only screen and (max-width: 600px)': {
      minHeight: '120px !important',
    }
  },
  illuGrid: {
    marginTop: '24px',
    minHeight: '120px',
    '@media only screen and (max-width: 600px)': {
      marginTop: '0px',
      minHeight: '120px !important',
    }
  },
  mp4Play: {
    width: '100%',
    height: '100%',
    minHeight: '100px',
  },
  lottiePlay: {
    width: '100%',
    height: '100%',
    minHeight: '120px',
  },
  player: {
    background: 'white',
    border: '1px solid #E4E9F2',
    borderRadius: '4px',
    padding: theme.spacing(1),
    '&:focus': {
      background:
        'linear-gradient(#fff,#fff) padding-box, linear-gradient(165deg, #0052FF 0%, #FF00D0 100%) border-box',
      border: '1px solid transparent',
    },
    '&:hOver': {
      background:
        'linear-gradient(#fff,#fff) padding-box, linear-gradient(165deg, #0052FF 0%, #FF00D0 100%) border-box',
      border: '1px solid transparent',
    }
  },
  gridContainer: {
    padding: '0px !important',
    margin: '-12px',
  }
}))

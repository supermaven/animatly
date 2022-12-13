import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
  },
  fixedTop: {
    top: theme.spacing(20),
    zIndex: '1',
    position: 'sticky',
    '@media only screen and (max-width: 600px)': {
      top: theme.spacing(17),
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
  },
  image: {
    width: '100%',
    // height: '360px',
    borderRadius: '4px',
    '@media only screen and (max-width: 600px)': {
      height: '210px',
    }
  },
  video: {
    width: '100%',
    height: '360px',
    '@media only screen and (max-width: 600px)': {
      height: '210px',
    },
    '@media only screen and (min-width: 601px) and (max-width: 1024px)': {
      paddingBottom:theme.spacing(5)
    }
  },
  simpleContent: {
    width: '100%',
    height: '360px',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    marginTop: '57px',
    '@media only screen and (max-width: 600px)': {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0),
    }
  },
  simpleContentHeader: {
    display: 'flex',
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '16px',
    marginBottom: theme.spacing(1),
    textDecoration: 'underline',
    cursor: 'pointer',
    '@media only screen and (max-width: 600px)': {
      fontSize: '16px',
      lineHeight: '16px',
    }
  },
  dot: {
    margin: theme.spacing(2),
  },
  simpleContentText: {
    color: '#333333',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    marginLeft: theme.spacing(3),
    marginBottom: '20px',
    textAlign: 'left',
  },
  detailHeader: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '28px',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    '@media only screen and (max-width: 600px)': {
      fontSize: '16px',
      lineHeight: '16px',
      marginTop: theme.spacing(3),
    }
  },
  step: {
    color: '#737373',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
    marginBottom: theme.spacing(2),
    '@media only screen and (max-width: 600px)': {
      fontSize: '16px',
      lineHeight: '16px',
    }
  },
  detailContent: {
    marginBottom: theme.spacing(7.5),
    '@media only screen and (max-width: 600px)': {
      marginBottom: theme.spacing(5),
    }
  }
}))

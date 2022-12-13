import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  container: {
    '@media only screen and (max-width: 600px)': {
      background: 'linear-gradient(315deg, #E8EBF0 0%, #FAE6E6 100%)',
    }
  },
  root: {
    background: 'linear-gradient(315deg, #E8EBF0 0%, #FAE6E6 100%)',
    height: '240px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    '@media only screen and (max-width: 600px)': {
      height: '210px',
      background: 'none',
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(5),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(3),
    },
    '@media only screen and (max-width: 993px) and (min-width: 601px)': {
      height: '192px',
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
    }
  },
  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '33px',
    marginBottom: theme.spacing(1),
    '@media only screen and (max-width: 600px)': {
      fontSize: '26px',
      lineHeight: '30px',
    }
  },
  description: {
    color: '#333333',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    marginBottom: theme.spacing(3),
  },
  siteButton: {
    height: '32px',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '16px',
    '@media only screen and (max-width: 600px)': {
      height: '46px',
      fontSize: '16px',
      lineHeight: '19px',
    }
  },
  startOnSite: {
    minWidth: '320px',
    width: '350px',
    paddingLeft: theme.spacing(6),
    '@media only screen and (min-width: 601px) and (max-width: 992px)': {
      paddingLeft: theme.spacing(2),
    },
    '@media only screen and (max-width: 600px)': {
      minWidth: 'auto',
      width: '100%',
      paddingLeft: theme.spacing(0),
    }
  },
  postArea: {
    marginRight: theme.spacing(1),
    width: '100%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  postImage: {
    width: '100%',
    userSelect: 'none',
  },
  mainContent: {
    minWidth: '320px',
    width: '350px',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

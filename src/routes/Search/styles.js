import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
  },
  pinned: {
    background: 'white',
    boxShadow: '0px 5px 40px -20px rgba(0, 0, 0, 0.5)',
  },
  headerMarginRemove: {
    marginBottom: '0px !important',
  },
  center: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
}))

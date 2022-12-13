import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#2196f3',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
  },
  fileDragArea: {
    border: '1px dashed #333333',
    borderRadius: '8px',
    width: '500px',
    height: '250px',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  dropzoneError: {
    border: '2px dashed #f50057 !important',
    color: 'red',
    fontSize: '20px'
  },
  item: {
    margin: theme.spacing(1),
  }
}))

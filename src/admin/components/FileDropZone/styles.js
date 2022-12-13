import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  fileDragArea: {
    border: '1px dashed #333333',
    borderRadius: '8px',
    width: '500px',
    minHeight: '200px',
  },
  playerArea: {
    padding: theme.spacing(1),
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer,
    position: 'absolute',
    color: '#fff',
  },
  hiddenLottie: {
    position: 'absolute',
    top: '-10000px',
  }
}))

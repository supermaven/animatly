import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  image: {
    marginLeft: '150px',
    cursor: 'pointer',
    userSelect: 'none',
    width: '157px',
  },
  logotype: {
    color: '#333333',
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  appBar: {
    background: 'white',
    color: '#333333',
    boxShadow: '0px 5px 40px -20px rgba(0, 0, 0, 0.5)',
    width: "100vw",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    color: 'white',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },

}))

import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons'
import classNames from 'classnames'
import useStyles from './styles'
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from 'admin/context/LayoutContext'

export default function Header(props) {
  var classes = useStyles()
  var layoutState = useLayoutState()
  var layoutDispatch = useLayoutDispatch()
  
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            )}
        </IconButton>
        <div className={classes.logotype}>
          Animatly.io admin
        </div>
        <div className={classes.grow} />

      </Toolbar>
    </AppBar>
  )
}

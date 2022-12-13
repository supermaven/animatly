import React, { useState, useEffect } from 'react'
import { Drawer, IconButton, List } from '@material-ui/core'
import {
  Dashboard as DashboardIcon,
  Equalizer as EqualizerIcon,
  AccountBalance as AccountBalanceIcon,
  Group as GroupIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons'
import { useTheme } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import useStyles from './styles'
import SidebarLink from './components/SidebarLink/SidebarLink'

import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from 'admin/context/LayoutContext'

const structure = [
  {
    id: 0, label: 'Lottie', link: '/admin/lottie', icon: <DashboardIcon />,
    children: [
      { label: 'Icons', link: '/admin/lottie#Icons' },
      { label: 'Illustrations', link: '/admin/lottie#Illustrations' },
    ],
  },
  {
    id: 1, label: 'Trend', link: '/admin/trend', icon: <EqualizerIcon />,
    children: [
      { label: 'Category', link: '/admin/trend#category' },
      { label: 'Tag', link: '/admin/trend#tag' },
    ],
  },
  {
    id: 2, label: 'Subscription', link: '/admin/subscription', icon: <AccountBalanceIcon />,
    children: [
      { label: 'Stripe', link: '/admin/subscription#stripe' },
      { label: 'Paypal', link: '/admin/subscription#paypal' },
    ],
  },
  { id: 3, label: 'User', link: '/admin/user', icon: <GroupIcon /> },
]

function Sidebar({ location }) {
  var classes = useStyles()
  var theme = useTheme()

  var { isSidebarOpened } = useLayoutState()
  var layoutDispatch = useLayoutDispatch()

  var [isPermanent, setPermanent] = useState(true)

  useEffect(function () {
    window.addEventListener('resize', handleWindowWidthChange)
    handleWindowWidthChange()
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange)
    }
  })

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  )

  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth
    var breakpointWidth = theme.breakpoints.values.md
    var isSmallScreen = windowWidth < breakpointWidth

    if (isSmallScreen && isPermanent) {
      setPermanent(false)
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true)
    }
  }
}

export default withRouter(Sidebar)

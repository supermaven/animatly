import React from 'react'
import useStyles from './styles'
import { Button } from '@material-ui/core'

export default function PageTitle(props) {
  var classes = useStyles()

  return (
    <div className={classes.pageTitleContainer}>
      <h1 className={classes.typo} >
        {props.title}
      </h1>
      <div className={classes.center}>
        {props.button && (
          <Button
            className={classes.button}
            variant='contained'
            onClick={props.onClick}
          >
            {props.button}
          </Button>
        )}
      </div>
    </div>
  )
}

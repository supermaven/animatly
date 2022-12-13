import React, { memo } from 'react'
import {
  Grid,
} from '@material-ui/core'
import useStyles from './styles'
import moment from 'moment'
import { LottieActionInfo } from 'components/LottieActionInfo'
import { useMediaQuery } from 'react-responsive'

const LottieActionArea = memo(({ data, mode, onSavedRemove }) => {
  const classes = useStyles()
  const isMobile = useMediaQuery({ maxWidth: 600 })
  const isIpad = useMediaQuery({ maxWidth: 992, minWidth: 601 })

  return (
    <Grid container spacing={4}>
      {
        data && data.map((item, key) => {
          return (
            <Grid item xs={isMobile ? 12 : (isIpad ? 9 : 6)} className={classes.gridItem} key={key}>
              <div className={
                (key === data.length - 1 || key === (data.length - 2))
                  ?
                  classes.itemAreaBottomBoder
                  :
                  classes.itemArea
              }
              >
                <LottieActionInfo
                  type={item.type}
                  path={item.path}
                  name={item.name}
                  date={moment(item.date).format('DD.MM.yyyy - hh:mm')}
                  actionText={mode === 'download' ? (item.isFree ? 'Free' : 'License') : 'Remove'}
                  doAction={() => {
                    mode === 'saved' && onSavedRemove(key)
                    mode === 'download' && !item.isFree && window.open('/content/Animatly_LicenseAgreement.pdf')
                  }}
                />
              </div>
            </Grid>
          )
        })
      }
    </Grid>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.data === nextProps.data
  )
})

export default LottieActionArea
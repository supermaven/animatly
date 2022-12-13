import React from 'react'
import {
  Container,
  Grid
} from '@material-ui/core'
import useStyles from './styles'
import { DetailDescription } from 'components/DetailDescription'
import { Mobile, Default } from 'containers/ResponseLayout'
import { VideoPlayer } from 'components/VideoPlayer'

const HomeDetailSection = () => {
  const classes = useStyles()
  const mondayVideo = `https://s3.us-east-2.amazonaws.com/animatly.io/HighlightMovie/Animatly_Web.mp4`
  
  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Mobile>
          <Grid item xs={12}>
            <DetailDescription />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.video}>
              <VideoPlayer src={mondayVideo} />
            </div>
          </Grid>
        </Mobile>

        <Default>
          <Grid item xs={6}>
            <DetailDescription />
          </Grid>
          <Grid item xs={6} className={classes.videoArea}>
            <div className={classes.video}>
              <VideoPlayer src={mondayVideo} />
            </div>
          </Grid>
        </Default>
      </Grid>

    </Container>
  )
}

export default HomeDetailSection

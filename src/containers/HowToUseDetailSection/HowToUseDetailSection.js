import React from 'react'
import {
  Container,
  Grid
} from '@material-ui/core'
import useStyles from './styles'
import { Mobile, Default } from 'containers/ResponseLayout'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { HashLink as Link } from 'react-router-hash-link'
import detailContent from './content.json'
import afterEffect from 'assets/images/background/afterEffect.png'
import website from 'assets/images/background/website.png'
import { VideoPlayer } from 'components/VideoPlayer'

const HowToUseDetailSection = ({
  detailId,
}) => {
  const classes = useStyles()

  const backGroundImage = (name) => {
    switch (name) {
      case 'afterEffect':
        return afterEffect
      case 'website':
        return website
      default:
        break
    }
  }

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
    const yOffset = -160
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
  }

  const ContentRender = () => (
    <>
      <div className={classes.simpleContent}>
        <div>
          {
            detailContent[detailId].subTitle &&
            detailContent[detailId].subTitle.map((item, key) => (
              <Link
                to={`?id=${detailId}#howToUse-detail-content-${key}`}
                key={key}
                scroll={el => scrollWithOffset(el)}
              >
                <div className={classes.simpleContentHeader}>
                  <FiberManualRecordIcon fontSize='inherit' className={classes.dot} />
                  <p>{item}</p>
                </div>
              </Link>
            ))
          }
        </div>
      </div>

      <div className={classes.detailContent}>
        {
          detailContent[detailId].body.map((item, key) => {
            return (
              <div id={`howToUse-detail-content-${key}`} key={key}>
                <p className={classes.detailHeader}>{item.title}</p>
                {
                  Object.keys(item.steps).map((step, ind) => {
                    if (step === 'image') {
                      return (
                        <div key={ind}>
                          <img className={classes.image} src={backGroundImage(item.steps[step])} alt='back' />
                        </div>
                      )
                    } else {
                      return (
                        <p className={classes.step} key={ind}>
                          <strong>{step}: </strong>{item.steps[step]}
                        </p>
                      )
                    }
                  })
                }
              </div>
            )
          })
        }
      </div>

    </>
  )

  return (
    <Container className={classes.root}>
      <Mobile>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.fixedTop}>
              <p className={classes.title}>{detailId && detailContent[detailId].title}</p>
              <div className={classes.video}>
                <VideoPlayer src={detailId && detailContent[detailId].video} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            {detailId && <ContentRender />}
          </Grid>
        </Grid>
      </Mobile>

      <Default>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className={classes.fixedTop}>
              <p className={classes.title}>{detailId && detailContent[detailId].title}</p>
              <div className={classes.video}>
                <VideoPlayer src={detailId && detailContent[detailId].video} />
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            {detailId && <ContentRender />}
          </Grid>
        </Grid>
      </Default>
    </Container>
  )
}

export default HowToUseDetailSection

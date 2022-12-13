import React from 'react'
import {
  Container,
  Grid
} from '@material-ui/core'
import useStyles from './styles'
import { IntroduceCard } from 'components/Card'
import AosComponent from 'components/AosComponent'
import { useMediaQuery } from 'react-responsive'
import img1 from 'assets/images/background/howtouse1.png'
import img2 from 'assets/images/background/howtouse2.png'
import img3 from 'assets/images/background/howtouse3.png'
import img4 from 'assets/images/background/howtouse4.png'

const introduction = [
  {
    img: img1,
    title: 'How can I embed an animation on my website or APP?',
    content: 'Embed our animations where ever you want and take control. There are no limits.',
  },
  {
    img: img2,
    title: 'How can I edit the source file in After Effects?',
    content: `With the source file, you have even more possibilities 
    to get the best possible result for your project.`,
  },
  {
    img: img3,
    title: 'How can I use it for a presentation?',
    content: `Whether you’re pitching or just creating a casual presentation, animated icons 
    and illustrations can make the difference to better storytelling and clear visualization.`,
  },
  {
    img: img4,
    title: 'How can I implement it in my design tool?',
    content: `What every tool you’re using we got the solution. Stop scribbling 
    and start designing with animations.`,
  },
]

const HowToUseSection = ({
  isLandingPage
}) => {
  const classes = useStyles()
  const isMobile = useMediaQuery({ maxWidth: 600 })
  const isIpad = useMediaQuery({ minWidth: 601, maxWidth: 992 })
  const xs = isMobile ? 12 : (isIpad ? 6 : 3)

  return (
    <Container className={classes.root}>
      {
        isLandingPage &&
        <div className={classes.title}>Just in case you need a little introduction to get you ready to go.</div>
      }
      <Grid container spacing={2}>
        {
          introduction.map((item, key) => (
            <Grid item xs={xs} key={key}>
              <AosComponent>
                <IntroduceCard
                  img={item.img}
                  title={item.title}
                  content={item.content}
                  detailId={key}
                />
              </AosComponent>
            </Grid>
          ))
        }
      </Grid>
    </Container >
  )
}

export default HowToUseSection

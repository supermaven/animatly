import React, { memo } from 'react'
import {
  Container,
  Grid,
  CardActionArea
} from '@material-ui/core'
import useStyles from './styles'
import { LibraryLottiePlayer, PreviewLottiePlay } from 'components/LottiePlay'
import * as cx from 'classnames'
import { useMediaQuery } from 'react-responsive'

const FilterResultSection = memo(({
  result,
  searchMode,
  sectionTitle,
  isAuthedFreeSection,
  onLottiePreview,
}) => {
  const classes = useStyles()
  const isMobile = useMediaQuery({ maxWidth: 600 })

  const Layout = ({ isAuthedFreeSection, children }) => {
    return isAuthedFreeSection
      ?
      <div className={classes.isAuthedFreeSection}>
        <Container>
          {children}
        </Container>
      </div>
      :
      <Container className={classes.root}>
        {children}
      </Container>
  }

  const handleLottieClick = (lottieInfo) => () => {
    onLottiePreview(lottieInfo)
  }

  return (
    <Layout isAuthedFreeSection={isAuthedFreeSection}>
      <div className={cx(classes.resultMessage, isAuthedFreeSection && classes.whiteTitle)}>{sectionTitle}</div>
      <Grid
        container
        className={classes.gridContainer}
        spacing={searchMode === 'Icons' ? (isMobile ? 2 : 0) : (isMobile ? 2 : 3)}
      >
        {
          result && result.map((item, key) => {
            return (
              <Grid
                item
                xs={searchMode === 'Icons' ? (isMobile ? 6 : 'auto') : (isMobile ? 12 : 6)}
                key={key}
                className={cx(classes.lottieArea, searchMode === 'Icons' ? classes.iconGrid : classes.illuGrid)}
              >
                <CardActionArea className={classes.player} onClick={handleLottieClick(item)}>
                  {
                    item.mode === 'json' &&
                    <LibraryLottiePlayer
                      path={item.path}
                      viewMode={searchMode}
                      className={cx(classes.lottiePlay,
                        searchMode === 'Icons' ? classes.iconHeight : classes.illuheight)}
                      loop
                    />
                  }
                  {
                    item.mode === 'prev' &&
                    <PreviewLottiePlay
                      className={cx(classes.lottiePlay,
                        searchMode === 'Icons' ? classes.iconHeight : classes.illuheight)}
                      path={item.path}
                    />
                  }
                </CardActionArea>
              </Grid>
            )
          })
        }
      </Grid>
    </Layout>
  )
},
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.result) === JSON.stringify(nextProps.result) &&
      prevProps.searchMode === nextProps.searchMode &&
      prevProps.sectionTitle === nextProps.sectionTitle
    )
  })

export default FilterResultSection

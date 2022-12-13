import React, { useState } from 'react'
import {
  Container,
  Typography
} from '@material-ui/core'
import useStyles from './styles'
import { SearchBar, MobileSearchBar } from 'containers/SearchBar'
import { TrendSearch } from 'containers/TrendSearch'
import { CompanyLogos } from 'containers/CompanyLogos'
import { Mobile, Default } from 'containers/ResponseLayout'

const HomeHeroSection = () => {
  const classes = useStyles()
  const [trendValue, setTrendValue] = useState('')

  const handleTrendClick = (val) => {
    setTrendValue(val)
  }

  return (
    <>
      <Mobile>
        <Container className={classes.area}>
          <Typography className={classes.title} component='h1'>
            Unlimited access to animated Icons and Illustrations
          </Typography>
          <MobileSearchBar isLandingPage />
          <CompanyLogos />
        </Container>
      </Mobile>

      <Default>
        <Container className={classes.area}>
          <div className={classes.center}>
            <Typography className={classes.title} component='h1' >
              Unlimited access to animated Icons and Illustrations
            </Typography>
            <SearchBar isLandingPage inline initialValue={trendValue} />
            <TrendSearch onClick={handleTrendClick} />
            <CompanyLogos />
          </div>
        </Container>
      </Default>
    </>
  )
}

export default HomeHeroSection

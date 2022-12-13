import React from 'react'
import useStyles from './styles'
import MicroSoftLogo from 'assets/images/logo/Microsoft_logo.svg'
import GoogleLogo from 'assets/images/logo/Google_logo.svg'
import AirbnbLogo from 'assets/images/logo/Airbnb_logo.svg'
import DuolingoLogo from 'assets/images/logo/Duolingo_logo.svg'

const CompanyLogos = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.title}>Loved by Designers from:</div>
      <div className={classes.logoArea}>
        <img className={classes.logo} src={MicroSoftLogo} alt='micro' />
        <img className={classes.logo} src={GoogleLogo} alt='google' />
        <img className={classes.logo} src={AirbnbLogo} alt='airbnb' />
        <img className={classes.logo} src={DuolingoLogo} alt='duolingo' />
      </div>
    </div>
  )
}

export default CompanyLogos

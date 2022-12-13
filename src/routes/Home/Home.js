import React, { useState, useEffect } from 'react'
import './Home.scss'
import { Mobile, Default } from 'containers/ResponseLayout'
import { Header, MobileHeader } from 'containers/Header'
import { HomeHeroSection } from 'containers/HomeHeroSection'
import { LookingForSection } from 'containers/LookingForSection'
import { HomeDetailSection } from 'containers/HomeDetailSection'
import { HowToUseSection } from 'containers/HowToUseSection'
import { IntroduceSection } from 'containers/IntroduceSection'
import { IncredibleSection } from 'containers/IncredibleSection'
import { Footer, MobileFooter } from 'containers/Footer'
import AosComponent from 'components/AosComponent'
import { BackgroundLine } from 'components/BackgroundLine'
import ReactGA from 'react-ga'
import { GOOGLE_ANALYTICS_TRACKING_ID } from 'helpers/utils'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID)

const Home = () => {
  const location = useLocation()
  const [isLandingHeader, setIsLandingHeader] = useState(true)

  useEffect(() => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  }, [location])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  const handleScroll = () => {
    const len = window.location.search.length
    const value = window.scrollY > 50 ? false : true
    len === 0 && setIsLandingHeader(value)
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='og:description' content={`Unlimited access to high-quality animated icons and illustrations as
         Lottie, GIF, or SVG. Download free and customize interactive animations for your web or app design.` } />
        <meta name='keywords' content={`Lottie, Lottiefiles, animated icons, animated illustrations, animation, 
         UX design, bodymovin, Lottie web, animations for PowerPoint`} />
        <title>Animatly: Animated Icons and Illustrations for Web, App, and PowerPoint</title>
        <link rel='canonical' href='https://animatly.io' />
      </Helmet>

      <Mobile>
        <MobileHeader isLandingPage={isLandingHeader} />
        <div className='home-mobile-header-section'>
          <AosComponent>
            <HomeHeroSection />
          </AosComponent>
        </div>
        <AosComponent data-aos-delay='500'>
          <LookingForSection />
        </AosComponent>
        <div className='home-mobile-detail-section'>
          <AosComponent id='detail-description'>
            <HomeDetailSection />
          </AosComponent>
        </div>
        <IntroduceSection />
        <AosComponent>
          <IncredibleSection />
        </AosComponent>
        <HowToUseSection isLandingPage />
        <MobileFooter />
      </Mobile>

      <Default>
        <BackgroundLine>
          <Header isLandingPage={isLandingHeader} />
          <div className='home-header-section'>
            <AosComponent >
              <HomeHeroSection />
            </AosComponent>
          </div>
          <AosComponent data-aos-delay='500'>
            <LookingForSection />
          </AosComponent>
          <div className='home-detail-section'>
            <AosComponent id='detail-description'>
              <HomeDetailSection />
            </AosComponent>
          </div>
          <IntroduceSection />
          <AosComponent>
            <HowToUseSection isLandingPage />
          </AosComponent>
          <AosComponent>
            <IncredibleSection />
          </AosComponent>
          <Footer />
        </BackgroundLine>
      </Default>
    </>
  )
}

export default Home

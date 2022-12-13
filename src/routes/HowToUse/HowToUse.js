import React from 'react'
import { Mobile, Default } from 'containers/ResponseLayout'
import { Header, MobileHeader } from 'containers/Header'
import { HowToUseSection } from 'containers/HowToUseSection'
import { Footer, MobileFooter } from 'containers/Footer'
import { PageHeader } from 'components/PageHeader'
import { BackgroundLine } from 'components/BackgroundLine'
import { Helmet } from 'react-helmet'

const HowToUse = () => {

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={`Learn how to use animated interactive Icons and illustrations in a simple
         step-by-step guide.` } />
        <meta name='keywords' content={`How to use Lottie, Use Lottie, Use animations, use animations, Lottie web`} />
        <title>How To Use Lottiefiles from Animatly – Step-by-Step Guide</title>
        <link rel='canonical' href='https://animatly.io/howToUse' />
      </Helmet>

      <Mobile>
        <MobileHeader />
        <PageHeader content='How to use?' mobile />
        <HowToUseSection />
        <MobileFooter />
      </Mobile>

      <Default>
        <BackgroundLine>
          <Header searchBox />
          <PageHeader content='How to use?' />
          <HowToUseSection />
          <div style={{ height: 'max(calc(100vh - 799px), 0px)' }}></div>
          <Footer />
        </BackgroundLine>
      </Default>
    </>
  )
}

export default HowToUse

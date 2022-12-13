import React from 'react'
import { Mobile, Default } from 'containers/ResponseLayout'
import { Header, MobileHeader } from 'containers/Header'
import { Footer, MobileFooter } from 'containers/Footer'
import { PageHeader } from 'components/PageHeader'
import { BackgroundLine } from 'components/BackgroundLine'
import { PricingFeature } from 'containers/PricingFeature'
import { Helmet } from 'react-helmet'

const Pricing = () => {

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={`Unlimited Downloads of animations for every license at the best price. 
        Weekly updates of new content provided.` } />
        <meta name='keywords' content={`Unlimited Downloads, weekly updates, animated icons, Lottie`} />
        <title>Pricing: Unlimited access to Hundreds of Animations</title>
        <link rel='canonical' href='https://animatly.io/pricing' />
      </Helmet>

      <Mobile>
        <MobileHeader />
        <PageHeader content='Choose your subscription' mobile />
        <PricingFeature />
        <MobileFooter />
      </Mobile>

      <Default>
        <BackgroundLine>
          <Header searchBox />
          <PageHeader content='Choose your subscription' />
          <PricingFeature />
          <div style={{ height: 'max(calc(100vh - 860px), 40px)' }}></div>
          <Footer />
        </BackgroundLine>
      </Default>
    </>
  )
}

export default Pricing

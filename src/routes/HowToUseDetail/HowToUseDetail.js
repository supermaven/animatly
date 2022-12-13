import React, { useState, useEffect } from 'react'
import { Mobile, Default } from 'containers/ResponseLayout'
import { Header, MobileHeader } from 'containers/Header'
import { Footer, MobileFooter } from 'containers/Footer'
import { PageHeader } from 'components/PageHeader'
import { useLocation } from 'react-router-dom'
import { HowToUseDetailSection } from 'containers/HowToUseDetailSection'
import { BackgroundLine } from 'components/BackgroundLine'
import SEO from './SEO.json'
import { Helmet } from 'react-helmet'

const HowToUseDetail = () => {
  const location = useLocation()
  const [detailId, setDetailId] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const arg_detailId = params.get('id')
    setDetailId(arg_detailId)
  }, [location])

  return (
    <>
      < Helmet >
        <meta charSet='utf-8' />
        <meta name='description' content={SEO[detailId].description} />
        <meta name='keywords' content={SEO[detailId].keywords} />
        <title>{SEO[detailId].title}</title>
        <link rel='canonical' href={`https://animatly.io/howToUseDetail?id=${detailId}`} />
      </Helmet>

      <Mobile>
        <MobileHeader />
        <PageHeader mobile backUrl='/howToUse' />
        <HowToUseDetailSection detailId={detailId} />
        <MobileFooter />
      </Mobile>

      <Default>
        <BackgroundLine>
          <Header searchBox />
          <PageHeader backUrl='/howToUse' topFixed />
          <HowToUseDetailSection detailId={detailId} />
          <Footer />
        </BackgroundLine>
      </Default>
    </>
  )
}

export default HowToUseDetail

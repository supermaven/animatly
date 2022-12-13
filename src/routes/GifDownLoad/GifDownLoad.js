import React from 'react'
import { Mobile, Default } from 'containers/ResponseLayout'
import { Header, MobileHeader } from 'containers/Header'
import { PageHeader } from 'components/PageHeader'
import { BackgroundLine } from 'components/BackgroundLine'
import { GifDownLoadSection } from 'containers/GifDownLoadSection'
import { Footer } from 'containers/Footer'

const GifDownLoad = () => {

  return (
    <>
      <Mobile>
        <MobileHeader />
        <PageHeader content='Convert to GIF' />
        <div>You don't have no permission on this page with your device</div>
      </Mobile>

      <Default>
        <BackgroundLine>
          <Header />
          <PageHeader content='Convert to GIF' />
          <GifDownLoadSection />
          <div style={{ height: '150px' }}></div>
          <Footer />
        </BackgroundLine>
      </Default>
    </>
  )
}

export default GifDownLoad

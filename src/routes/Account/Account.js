import React from 'react'
import { Mobile, Default } from 'containers/ResponseLayout'
import { Header, MobileHeader } from 'containers/Header'
import { Footer } from 'containers/Footer'
import { PageHeader } from 'components/PageHeader'
import { BackgroundLine } from 'components/BackgroundLine'
import { AccountSection } from 'containers/AccountSection'

const Account = () => {

  return (
    <>
      <Mobile>
        <MobileHeader />
        <PageHeader content='My Account' mobile />
        <AccountSection />
      </Mobile>

      <Default>
        <BackgroundLine>
          <Header searchBox />
          <PageHeader content='My Account' backUrl='/' />
          <AccountSection />
          <div style={{
            height: '-webkit-calc(100vh - 500px)',
          }}></div>
          <Footer />
        </BackgroundLine>
      </Default>
    </>
  )
}

export default Account

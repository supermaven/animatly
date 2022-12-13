import React from 'react'
import { CloseModal } from 'components/CloseModal'
import { Mobile, Default } from 'containers/ResponseLayout'
import Form from './Form'
import { MobileFooter } from 'containers/Footer'
import { PageHeader } from 'components/PageHeader'

const CreateAccountFirstForm = ({ onClose }) => {

  return (
    <>
      <Mobile>
        <PageHeader mobile backUrl='#' onBackClick={onClose} />
        <Form />
        <MobileFooter />
      </Mobile>

      <Default>
        <CloseModal
          onClose={onClose}
        >
          <Form onClose={onClose} />
        </CloseModal>
      </Default>
    </>
  )
}

export default CreateAccountFirstForm

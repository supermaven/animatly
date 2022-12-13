import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { CreateAccountFirstForm } from './CreateAccountFirstForm'
import {
  Dialog,
} from '@material-ui/core'
import useStyles from './styles'

const CreateAccountFirst = ({
  open,
  onClose,
}) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const fullScreen = useMediaQuery({ maxWidth: 600 })

  useEffect(() => {
    setModalOpen(open)
  }, [open])
  
  const handleClose = () => {
    setModalOpen(false)
    onClose()
  }
  return (
    <>
      <Dialog
        className={classes.root}
        fullScreen={fullScreen}
        scroll='body'
        open={modalOpen}
        onClose={handleClose}
        maxWidth='xl'
      >
        <CreateAccountFirstForm onClose={handleClose} />
      </Dialog>
    </>
  )
}

export default CreateAccountFirst

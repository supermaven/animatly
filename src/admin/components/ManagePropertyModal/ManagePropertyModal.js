import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import useStyles from './styles'
import { Loader } from 'components/Loader'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createCategory, updateCategory } from 'redux/modules/category/actions'
import { createTag, updateTag } from 'redux/modules/tag/actions'

const ManagePropertyModal = ({
  open,
  onClose,
  mode,
  propertyInfo,
  createCategory,
  updateCategory,
  propertyName,
  createTag,
  updateTag,
}) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [type, setType] = useState('Icons')
  const [nameValidText, setNameValidText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (propertyInfo) {
      setName(propertyInfo.name)
      setType(propertyInfo.type)
    }
  }, [propertyInfo, setName, setType])

  const handleClickOkay = async () => {
    setIsLoading(true)
    if (mode === 'Create') {
      switch (propertyName) {
        case 'category':
          await createCategory({
            body: { name, type },
            success: ({ data }) => {
              setIsLoading(false)
              onClose()
            },
            fail: (err) => {
              if (err.status === 400) {
                const error = err.data.message
                setNameValidText('')
                error.includes('name') && setNameValidText(error.replace(`"name"`, 'Name'))
              }
              setIsLoading(false)
            }
          })
          break
        case 'tag':
          await createTag({
            body: { name, type },
            success: ({ data }) => {
              setIsLoading(false)
              onClose()
            },
            fail: (err) => {
              if (err.status === 400) {
                const error = err.data.message
                setNameValidText('')
                error.includes('name') && setNameValidText(error.replace(`"name"`, 'Name'))
              }
              setIsLoading(false)
            }
          })
          break
        case 'search':
          break
        default:
          break
      }

    } else {
      switch (propertyName) {
        case 'category':
          await updateCategory({
            id: propertyInfo.id,
            body: { name, type },
            success: ({ data }) => {
              setIsLoading(false)
              onClose()
            },
            fail: (err) => {
              if (err.status === 400) {
                const error = err.data.message
                setNameValidText('')
                error.includes('name') && setNameValidText(error.replace(`"name"`, 'Name'))
              }
              setIsLoading(false)
            }
          })
          break
        case 'tag':
          await updateTag({
            id: propertyInfo.id,
            body: { name, type },
            success: ({ data }) => {
              setIsLoading(false)
              onClose()
            },
            fail: (err) => {
              if (err.status === 400) {
                const error = err.data.message
                setNameValidText('')
                error.includes('name') && setNameValidText(error.replace(`"name"`, 'Name'))
              }
              setIsLoading(false)
            }
          })
          break
        case 'search':
          break
        default:
          break
      }

    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      {isLoading && <Loader />}
      <DialogTitle>{mode} {propertyName}</DialogTitle>
      <DialogContent >
        <TextField
          margin='dense'
          label='Name'
          type='text'
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameValidText ? true : false}
          helperText={nameValidText}
        />
        <FormControl className={classes.type} fullWidth>
          <InputLabel >Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value='Icons'>Icons</MenuItem>
            <MenuItem value='Illustrations'>Illustrations</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleClickOkay} color='primary'>
          {mode === 'Edit' ? 'update' : 'create'}
        </Button>
      </DialogActions>
    </Dialog >
  )
}

ManagePropertyModal.propTypes = {
  updateCategory: PropTypes.func,
  createCategory: PropTypes.func,
  createTag: PropTypes.func,
  updateTag: PropTypes.func,
}

const actions = {
  updateCategory,
  createCategory,
  createTag,
  updateTag,
}

export default compose(connect(null, actions))(ManagePropertyModal)

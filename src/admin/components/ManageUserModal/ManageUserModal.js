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
  FormHelperText,
} from '@material-ui/core'
import useStyles from './styles'
import { Loader } from 'components/Loader'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createUser, updateUser } from 'redux/modules/user/actions'

const ManageUserModal = ({
  open,
  onClose,
  mode,
  createUser,
  userInfo,
  updateUser,
}) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('freeUser')
  const [nameValidText, setNameValidText] = useState('')
  const [emailValidText, setEmailValidText] = useState('')
  const [passwordValidText, setPasswordValidText] = useState('')
  const [roleValidText, setRoleValidText] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
      setRole(userInfo.role)
    }
  }, [userInfo, setName, setEmail, setRole])

  const handleClickOkay = async () => {
    setIsLoading(true)
    if (mode === 'Create') {
      await createUser({
        body: { name, password, email, role },
        success: ({ data }) => {
          setIsLoading(false)
          onClose()
        },
        fail: (err) => {
          if (err.status === 400) {
            const error = err.data.message
            setNameValidText('')
            setEmailValidText('')
            setPasswordValidText('')
            error.includes('name') && setNameValidText(error.replace(`"name"`, 'FullName'))
            error.includes('email') && setEmailValidText(error.replace(`"email"`, 'Email'))
            error.includes('password') && setPasswordValidText(error.replace(`"password"`, 'Password'))
            error.includes('role') && setRoleValidText(error.replace(`"role"`, 'Role'))
          }
          setIsLoading(false)
        }
      })
    } else {
      await updateUser({
        id: userInfo.id,
        body: { name, password, email, role },
        success: ({ data }) => {
          setIsLoading(false)
          onClose()
        },
        fail: (err) => {
          if (err.status === 400) {
            const error = err.data.message
            setNameValidText('')
            setEmailValidText('')
            setPasswordValidText('')
            error.includes('name') && setNameValidText(error.replace(`"name"`, 'FullName'))
            error.includes('email') && setEmailValidText(error.replace(`"email"`, 'Email'))
            error.includes('password') && setPasswordValidText(error.replace(`"password"`, 'Password'))
            error.includes('role') && setRoleValidText(error.replace(`"role"`, 'Role'))
          }
          setIsLoading(false)
        }
      })
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      {isLoading && <Loader />}
      <DialogTitle>{mode} User</DialogTitle>
      <DialogContent >
        <TextField
          margin='dense'
          label='User Name'
          type='text'
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameValidText ? true : false}
          helperText={nameValidText}
        />
        <TextField
          margin='dense'
          label='Email Address'
          type='email'
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailValidText ? true : false}
          helperText={emailValidText}
        />
        <TextField
          margin='dense'
          label='Password'
          type='password'
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordValidText ? true : false}
          helperText={passwordValidText}
        />
        <FormControl className={classes.role} fullWidth error={roleValidText ? true : false}>
          <InputLabel >User Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value='freeUser'>Free User</MenuItem>
            <MenuItem value='iconLicensedUser'>Icon Licensed User</MenuItem>
            <MenuItem value='illustrationLicensedUser'>Illustration Licensed User</MenuItem>
            <MenuItem value='bothLicensed'>Icon and Illustration Licensed User</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
          </Select>
          {
            roleValidText && <FormHelperText>{roleValidText}</FormHelperText>
          }
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

ManageUserModal.propTypes = {
  updateUser: PropTypes.func,
  createUser: PropTypes.func,
}

const actions = {
  updateUser,
  createUser
}

export default compose(connect(null, actions))(ManageUserModal)

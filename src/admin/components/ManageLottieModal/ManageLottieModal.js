import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Container,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import useStyles from './styles'
import { Loader } from 'components/Loader'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createLottie, updateLottie } from 'redux/modules/lottie/actions'
import { FileDropZone } from 'admin/components/FileDropZone'
import S3 from 'helpers/react-aws-s3/react-aws-s3.ts'
import randomstring from 'randomstring'
import { bucketName, accessKeyId, secretAccessKey, region, s3Url } from 'helpers/utils'
import { CustomAlert } from 'components/CustomAlert'
import { getCategories } from 'redux/modules/category/actions'
import { getTags } from 'redux/modules/tag/actions'
import { validator } from 'helpers/validator'

const ManageLottieModal = ({
  open,
  onClose,
  mode,
  lottieInfo,
  createLottie,
  updateLottie,

  getTags,
  getCategories,
}) => {
  const classes = useStyles()
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [alertType, setAlertType] = useState('error')
  const [isLoading, setIsLoading] = useState(false)
  const [jsonFile, setJsonFile] = useState(null)
  const [prevFile, setPrevFile] = useState(null)
  const [aepFile, setAepFile] = useState(null)
  const [jsonFileError, setJsonFileError] = useState(false)
  const [prevFileError, setPrevFileError] = useState(false)
  const [aepFileError, setAepFileError] = useState(false)

  const [jsonPath, setJsonPath] = useState('')
  const [prevPath, setPrevPath] = useState('')
  const [aefPath, setAefPath] = useState('')

  const [name, setName] = useState('')
  const [type, setType] = useState('Icons')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState([])

  const [allCategory, setAllCaregory] = useState([])
  const [allTag, setAllTag] = useState([])

  const [validationStr, setValidationStr] = useState([])

  useEffect(() => {
    if (lottieInfo) {
      setJsonPath(lottieInfo.jsonPath)
      setPrevPath(lottieInfo.prevPath)
      setAefPath(lottieInfo.aefPath)
      setName(lottieInfo.name)
      setType(lottieInfo.type)
      setCategory(lottieInfo.category)
      setTags(lottieInfo.tags)
    }
  }, [lottieInfo])

  useEffect(() => {
    const getAttributeByLottieType = async () => {
      await getCategories({
        body: { type },
        success: ({ data }) => {
          setAllCaregory(data)
        }
      })
      await getTags({
        body: { type },
        success: ({ data }) => {
          setAllTag(data)
        }
      })
    }
    type && getAttributeByLottieType()
  }, [type, setAllCaregory, setAllTag, getCategories, getTags])

  const randomKey = () => randomstring.generate({
    length: 64,
    charset: 'alphabetic' | 'numeric',
    capitalization: 'lowercase'
  })

  const uploadFiles = async (dirName, file) => {
    const config = {
      bucketName,
      accessKeyId,
      secretAccessKey,
      region,
      dirName,
      s3Url
    }

    const ReactS3Client = new S3(config)
    const newFileName = `${randomKey()}-${file.name.trim()}`

    const data = await ReactS3Client.uploadFile(file, newFileName)
    if (data.status === 204) {
      return data.location
    } else {
      setAlertType('error')
      setAlertText('Upload Error.')
      setAlertOpen(true)
      return null
    }
  }

  const deleteFilesOnS3 = async (dirName, filePath) => {
    const config = {
      bucketName,
      accessKeyId,
      secretAccessKey,
      region,
      dirName,
      s3Url,
    }

    const ReactS3Client = new S3(config)
    const data = await ReactS3Client.deleteFile(filePath)
    if (data.status === 204) {
      return true
    } else {
      setAlertType('error')
      setAlertText('Upload Error.')
      setAlertOpen(true)
      return null
    }
  }


  const doCreateLottie = async (jsonPath, prevPath, aefPath) => {
    await createLottie({
      body: {
        name, type, category, tags, jsonPath, prevPath, aefPath,
      },
      success: ({ data }) => {
        setIsLoading(false)
        setAlertType('success')
        setAlertText('Upload Completed')
        setAlertOpen(true)
        onClose()
      },
      fail: (err) => {
        setIsLoading(false)
        setAlertType('error')
        setAlertText('Upload Error')
        setAlertOpen(true)
      }
    })
  }

  const doUpdateLottie = async (jsonPath, prevPath, aefPath) => {
    await updateLottie({
      id: lottieInfo.id,
      type: lottieInfo.type,
      body: {
        name, type, category, tags, jsonPath, prevPath, aefPath,
      },
      success: ({ data }) => {
        setIsLoading(false)
        setAlertType('success')
        setAlertText('Update Completed')
        setAlertOpen(true)
        onClose()
      },
      fail: (err) => {
        setIsLoading(false)
        setAlertType('error')
        setAlertText('Update Error')
        setAlertOpen(true)
      }
    })
  }

  const handleClickOkay = async () => {
    if (mode === 'Create') {
      !jsonFile && setJsonFileError(true)
      !prevFile && setPrevFileError(true)
      !aepFile && setAepFileError(true)

      if (!jsonFile || !prevFile || !aepFile) {
        setAlertType('error')
        setAlertText('Upload file require.')
        setAlertOpen(true)
        return
      }
      let validation_str = []
      validation_str.push(validator(name, ['require']))
      validation_str.push(validator(category, ['require']))
      validation_str.push(validator(tags, ['require']))
      setValidationStr(validation_str)

      const isValid = validation_str.filter(item => item).length ? false : true
      if (isValid) {
        setIsLoading(true)

        const uploadJsonPath = await uploadFiles(`${type}/json`, jsonFile)
        setJsonPath(uploadJsonPath)
        const uploadPrevPath = await uploadFiles(`${type}/prev`, prevFile)
        setPrevPath(uploadPrevPath)
        const uploadAefPath = await uploadFiles(`${type}/aef`, aepFile)
        setAefPath(uploadAefPath)

        await doCreateLottie(uploadJsonPath, uploadPrevPath, uploadAefPath)
      }
    } else {
      !(jsonFile || lottieInfo.jsonPath) && setJsonFileError(true)
      !(prevFile || lottieInfo.prevPath) && setPrevFileError(true)
      !(aepFile || lottieInfo.aefPath) && setAepFileError(true)

      if (!(jsonFile || lottieInfo.jsonPath) ||
        !(prevFile || lottieInfo.prevPath) ||
        !(aepFile || lottieInfo.aefPath)
      ) {
        setAlertType('error')
        setAlertText('Upload file require.')
        setAlertOpen(true)
        return
      }

      let validation_str = []
      validation_str.push(validator(name, ['require']))
      validation_str.push(validator(category, ['require']))
      validation_str.push(validator(tags, ['require']))
      setValidationStr(validation_str)

      const isValid = validation_str.filter(item => item).length ? false : true
      if (isValid) {
        setIsLoading(true)

        let uploadJsonPath = lottieInfo.jsonPath
        let uploadPrevPath = lottieInfo.prevPath
        let uploadAefPath = lottieInfo.aefPath

        if (jsonFile) {
          await deleteFilesOnS3(`${lottieInfo.type}/json`, lottieInfo.jsonPath.replace(/^.*[\\/]/, '').trim())
          uploadJsonPath = await uploadFiles(`${type}/json`, jsonFile)
          setJsonPath(uploadJsonPath)
        }

        if (prevFile) {
          lottieInfo.prevPath && 
          await deleteFilesOnS3(`${lottieInfo.type}/prev`, lottieInfo.prevPath.replace(/^.*[\\/]/, '').trim())
          uploadPrevPath = await uploadFiles(`${type}/prev`, prevFile)
          setPrevPath(uploadPrevPath)
        }

        if (aepFile) {
          await deleteFilesOnS3(`${lottieInfo.type}/aef`, lottieInfo.aefPath.replace(/^.*[\\/]/, '').trim())
          uploadAefPath = await uploadFiles(`${type}/aef`, aepFile)
          setAefPath(uploadAefPath)
        }

        await doUpdateLottie(uploadJsonPath, uploadPrevPath, uploadAefPath)
      }
    }
  }
  
  return (
    <>
      <CustomAlert isOpen={alertOpen} type={alertType} text={alertText} onClose={() => setAlertOpen(false)} />

      <Dialog fullScreen open={open} onClose={onClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Lottie {mode}
            </Typography>
            <Button autoFocus color='inherit' onClick={handleClickOkay}>save</Button>
          </Toolbar>
        </AppBar>
        {isLoading && <Loader />}
        <DialogTitle></DialogTitle>
        <DialogContent >
          <Container>
            <div style={{ display: 'flex' }}>
              <div>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <FileDropZone
                      className={jsonFileError && classes.dropzoneError}
                      mode='lottie'
                      description={<p><strong>.JSON</strong> lottie file.</p>}
                      accept='.json'
                      onDrop={file => {
                        setJsonFile(file)
                        setJsonFileError(false)
                      }}
                      initialPath={lottieInfo && lottieInfo.jsonPath}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FileDropZone
                      className={prevFileError && classes.dropzoneError}
                      mode='prev'
                      description={<p><strong>.JSON</strong> Preview Lottie file.</p>}
                      accept='.json'
                      onDrop={file => {
                        setPrevFile(file)
                        setPrevFileError(false)
                      }}
                      initialPath={lottieInfo && lottieInfo.prevPath}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FileDropZone
                      className={aepFileError && classes.dropzoneError}
                      mode='aef'
                      description={<p><strong>.AEP</strong> after Effect file.</p>}
                      accept='.aep'
                      onDrop={file => {
                        setAepFile(file)
                        setAepFileError(false)
                      }}
                      initialPath={lottieInfo && lottieInfo.aefPath}
                    />
                  </Grid>
                </Grid>
              </div>

              <div>
                <FormControl
                  className={classes.item}
                  fullWidth
                >
                  <InputLabel >Type</InputLabel>
                  <Select
                    value={type}
                    onChange={(e) => {
                      setCategory(null)
                      setTags([])
                      setType(e.target.value)
                    }}
                  >
                    <MenuItem value='Illustrations'>Illustrations</MenuItem>
                    <MenuItem value='Icons'>Icons</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  className={classes.item}
                  fullWidth
                  label='Lottie Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={validationStr[0] ? true : false}
                  helperText={validationStr[0]}
                />

                <TextField
                  fullWidth
                  label='jsonPath'
                  value={jsonPath}
                  className={classes.item}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  label='PreviewPath'
                  value={prevPath}
                  className={classes.item}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  label='aefPath'
                  value={aefPath}
                  className={classes.item}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <FormControl fullWidth className={classes.item} error={validationStr[1] ? true : false}>
                  <InputLabel >Category</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {allCategory.map((item, key) => {
                      return (
                        <MenuItem key={key} value={item.id} >
                          {item.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  {
                    validationStr[1] && <FormHelperText>{validationStr[1]}</FormHelperText>
                  }
                </FormControl>

                <FormControl fullWidth className={classes.item} error={validationStr[2] ? true : false}>
                  <InputLabel >Tags</InputLabel>
                  <Select
                    multiple
                    value={tags}
                    onChange={e => {
                      setTags(e.target.value)
                    }}
                  >
                    {allTag.map((item, key) => (
                      <MenuItem key={key} value={item.id} >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {
                    validationStr[2] && <FormHelperText>{validationStr[2]}</FormHelperText>
                  }
                </FormControl>
              </div>
            </div>
          </Container>
        </DialogContent>
      </Dialog >
    </>
  )
}

ManageLottieModal.propTypes = {
  createLottie: PropTypes.func,
  updateLottie: PropTypes.func,
  getTags: PropTypes.func,
  getCategories: PropTypes.func,
}

const actions = {
  createLottie,
  updateLottie,
  getTags,
  getCategories,
}

export default compose(connect(null, actions))(ManageLottieModal)

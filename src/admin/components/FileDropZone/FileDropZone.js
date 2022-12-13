import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import * as cx from 'classnames'
import useStyles from './styles'
import { LottiePlay } from 'components/LottiePlay'

const FileDropZone = ({
  className,
  description,
  mode,
  onDrop,
  accept,
  initialPath,
}) => {
  const classes = useStyles()
  const [fileData, setFileData] = useState(null)

  const loadFile = (fileInfo) => {
    let reader = new FileReader()
    reader.onloadend = () => {
      onDrop(fileInfo)

      switch (mode) {
        case 'lottie':
          setFileData({
            path: fileInfo.path,
            data: JSON.parse(reader.result)
          })
          break
        case 'prev':
          setFileData({
            path: fileInfo.path,
            data: JSON.parse(reader.result)
          })
          break
        case 'aef':
          setFileData({
            path: fileInfo.path,
            data: fileInfo.path
          })
          break
        default:
          break
      }
    }
    reader.readAsText(fileInfo)
  }

  const dropDataArea = (fileData) => {
    switch (mode) {
      case 'lottie':
        return <LottiePlay src={!initialPath && fileData.data} path={initialPath} />
      case 'prev':
        return <LottiePlay src={!initialPath && fileData.data} path={initialPath} />
      case 'aef':
        return <p><strong>{!initialPath && fileData.path}</strong>  / After Effect File.</p>
      default:
        break
    }

  }

  return (
    <>
      <Dropzone onDrop={files => loadFile(files[0])} multiple={false} accept={accept}>
        {({ getRootProps, getInputProps }) => (
          <div className="container">
            <div
              {...getRootProps({
                className: cx('dropzone', classes.fileDragArea, classes.center, className),
                onDrop: event => event.stopPropagation()
              })}
            >
              <input {...getInputProps()} />
              <div>
                {(!fileData && !initialPath) && description}
              </div>
              <div className={classes.playerArea}>
                {(fileData || initialPath) && dropDataArea(fileData)}
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    </>
  )
}

export default FileDropZone

import React, { memo, useEffect, useState } from 'react'
import useStyles from './LottieEdit.styles'
import {
  AppBar,
  Container,
  Grid,
  Slide,
} from '@material-ui/core'
import * as cx from 'classnames'
import { EditLottiePlayer } from 'components/LottiePlay'
import { CustomButton } from 'components/CustomButton'
import { ControllerContainer } from 'components/ControllerContainer'
import { CustomColorPicker } from 'components/CustomColorPicker'
import { CustomSlider } from 'components/CustomSlider'
import svgX from 'assets/images/Icon/xButton.svg'
import svgXWhite from 'assets/images/Icon/x_white.svg'
import svgRemove from 'assets/images/Icon/remove.svg'
import svgRemove_white from 'assets/images/Icon/remove_white.svg'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { saveAs } from 'file-saver'
import Player from 'react-lottie'
import d2i from 'dom-to-image'
import { getColors } from 'helpers/lottie'
import {
  downloadLottie,
  saveLottie,
  removeSavedLottie,
  checkSavedLottie,
} from 'redux/modules/lottie/actions'
import { setEditorLottieChangement } from 'redux/modules/global/actions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { authInfo } from 'helpers/localCheck'
import { createStructuredSelector } from 'reselect'
import {
  lottieColorSelector,
  strokePercentSelector,
  editorLottieChangementSelector
} from 'redux/modules/global/selectors'
import { useMediaQuery } from 'react-responsive'
import demoHtml from 'assets/html/demo.txt'

const LottieEdit = memo(({
  lottieInfo,
  viewMode,
  onClose,
  downloadLottie,
  saveLottie,
  removeSavedLottie,
  checkSavedLottie,
  IconLottieColor,
  IconStrokePercent,
  setEditorLottieChangement,
  editorLottieChangement,
  isBasedEditor,
}) => {
  const classes = useStyles()
  const isIpad = useMediaQuery({ minWidth: 601, maxWidth: 992 })
  const [xIcon, setXIcon] = useState(svgX)
  const [resetIcon, setResetIcon] = useState(svgRemove)
  const [iconColor, setIconColor] = useState(
    viewMode === 'Icons' ? IconLottieColor : { hex: '000000', rgb: [0, 0, 0] })
  const [illustrationColor, setIllustrationColor] = useState(null)
  const [illustrationOriginColor, setIllustrationOriginColor] = useState(null)
  const [scale, setScale] = useState(50)
  const [speed, setSpeed] = useState(2.5)
  const [stroke, setStroke] = useState(viewMode === 'Icons' ? IconStrokePercent : 50)
  const [lottieData, setLottieData] = useState(null)
  const [originLottieData, setOriginLottieData] = useState(null)
  const [isStopped, setIsStopped] = useState(false)
  const [blinkColor, setBlinkColor] = useState(null)
  const [isBlink, setIsBlink] = useState(false)
  const [resetColor, setResetColor] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  let blinkTimerId = null

  useEffect(() => {
    const init = async () => {
      const pathData = await fetch(lottieInfo.path).then(res => res.json()).then(res => res)
      setOriginLottieData(pathData)
      const allColor = getColors(pathData)
      let res = allColor.filter((c, index) => {
        return allColor.indexOf(c) === index
      })
      setIllustrationOriginColor(res)
    }
    lottieInfo && init()
  }, [lottieInfo])

  useEffect(() => {
    setEditorLottieChangement({ scale, speed, stroke, color: iconColor })
  }, [scale, speed, stroke, iconColor, setEditorLottieChangement])

  useEffect(() => {
    if (isBasedEditor === true) {
      const { scale, speed, stroke, color } = editorLottieChangement
      setScale(scale)
      setSpeed(speed)
      setStroke(stroke)
      setIconColor(color)
    }
  }, [isBasedEditor, editorLottieChangement])

  useEffect(() => {
    const checkSavedHistory = async () => {
      await checkSavedLottie({
        body: {
          type: viewMode,
          lottieId: lottieInfo.id,
          userId: authInfo().user.id,
        },
        success: ({ data }) => {
          setIsSaved(data)
        },
        fail: (err) => {
          setIsSaved(false)
        }
      })
    }
    lottieInfo && checkSavedHistory()
  }, [lottieInfo, viewMode, setIsSaved, checkSavedLottie])

  const handleClick = (button) => async (e) => {
    switch (button) {
      case 'json':
        addDownloadHistory()
        const data = await fetch(demoHtml).then(res => res.text()).then(res => res.toString())
        const demo = data.replace('Lottie-Data', lottieData)
        
        downloadFile(lottieInfo.name + '.json', lottieData)
        downloadFile(lottieInfo.name + '.html', demo)
        break
      case 'gif':
        localStorage.setItem('animatly_selected_lottie', JSON.stringify({
          id: lottieInfo.id,
          type: viewMode,
          name: lottieInfo.name,
          data: lottieData
        }))
        window.open(`/gifDownload`, '_blank')
        break
      case 'aef':
        addDownloadHistory()
        saveAs(lottieInfo.aefPath, lottieInfo.name + '.aep')
        break
      case 'svg':
        addDownloadHistory()
        const svgLottie = document.getElementById('svg-lottie')
        const filter = (node) => {
          return (node.tagName !== 'i')
        }
        let blob = await d2i.toSvg(svgLottie, { filter })
        saveAs(blob, `${lottieInfo.name}.svg`)
        break
      case 'reset':
        setScale(50)
        setSpeed(2.5)
        setStroke(50)
        setIconColor({ hex: '000000', rgb: [0, 0, 0] })
        setIllustrationColor(null)
        setIsBlink(false)
        setResetColor(!resetColor)
        break
      case 'save':
        isSaved ? removeSavedHistory() : addSavedHistory()
        break
      default:
        break
    }
  }

  const downloadFile = (fileName, data) => {
    const blob = new Blob([data])
    saveAs(blob, fileName)
  }

  const addDownloadHistory = async () => {
    await downloadLottie({
      body: {
        type: viewMode,
        lottieId: lottieInfo.id,
        userId: authInfo().user.id,
        date: Date.now(),
      }
    })
  }

  const addSavedHistory = async () => {
    await saveLottie({
      body: {
        type: viewMode,
        lottieId: lottieInfo.id,
        userId: authInfo().user.id,
        date: Date.now(),
      },
      success: ({ data }) => {
        setIsSaved(true)
      }
    })
  }

  const removeSavedHistory = async () => {
    await removeSavedLottie({
      body: {
        type: viewMode,
        lottieId: lottieInfo.id,
        userId: authInfo().user.id,
      },
      success: ({ data }) => {
        setIsSaved(false)
      }
    })
  }

  const handleChangeColor = (origin, value) => {
    setIconColor(value)
  }

  const handleIllustrationChangeColor = (key) => (origin, value) => {
    setIllustrationColor(oldIllustrationColor => {
      const colorArray = oldIllustrationColor ? [...oldIllustrationColor] : []
      let flag = true
      colorArray.forEach((item, index) => {
        if (item.oldValue === illustrationOriginColor[key]) {
          colorArray[index] = {
            oldValue: illustrationOriginColor[key],
            newValue: value.rgb
          }
          flag = false
          return
        }
      })
      flag && colorArray.push({
        oldValue: illustrationOriginColor[key],
        newValue: value.rgb,
      })
      setIsBlink(false)
      setBlinkColor(null)
      return colorArray
    })
  }

  const handleChangeSlider = (key) => (value) => {
    switch (key) {
      case 'scale':
        setScale(value)
        break
      case 'speed':
        setSpeed(0.05 * value)
        break
      case 'stroke':
        setStroke(value)
        break
      default:
        break
    }
  }

  const handleLottieEdit = (data) => {
    setLottieData(data)
  }

  const handleColorHover = (key) => () => {
    const blinkBlackColor = { rgb: [0, 0, 0] }
    const blinkWhiteColor = { rgb: [255, 255, 255] }
    let blinkingColor = {}
    setIsStopped(true)
    setIsBlink(true)
    changeBlinkColor(key, blinkBlackColor)
    const tId = setInterval(() => {
      blinkingColor = blinkingColor === blinkBlackColor ? blinkWhiteColor : blinkBlackColor
      changeBlinkColor(key, blinkingColor)
    }, 200)
    blinkTimerId = tId
  }

  const handleColorLeave = (key) => () => {
    setBlinkColor(null)
    clearInterval(blinkTimerId)
    blinkTimerId = null
    setIsStopped(false)
  }

  const changeBlinkColor = (key, newColor) => {
    let colorArray = illustrationColor && illustrationColor.filter(item => {
      return item.oldValue !== illustrationOriginColor[key]
    })
    const blinkingColor = {
      oldValue: colorArray && colorArray.length > 0 ? colorArray : illustrationOriginColor[key],
      newValue: newColor.rgb
    }
    setBlinkColor(blinkingColor)
  }

  const handleResetColor = (key) => () => {
    setIsBlink(false)
    if (viewMode === 'Illustrations') {
      setIllustrationColor(oldIllustrationColor => {
        let colorArray = oldIllustrationColor && oldIllustrationColor.filter(item => {
          return item.oldValue !== illustrationOriginColor[key]
        })
        return colorArray
      })
    } else {
      setIconColor({ hex: '000000', rgb: [0, 0, 0] })
    }
  }

  const isSvgAvailable = () => {
    const userRole = authInfo().user.role
    if (viewMode === 'Illustrations' && userRole === 'iconLicensedUser') {
      return true
    } else if (viewMode === 'Icons' && userRole === 'illustrationLicensedUser') {
      return true
    } else if (userRole === 'bothLicensed' || userRole === 'admin' || userRole === 'freeUser') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <AppBar className={cx(classes.root, viewMode === 'Illustrations' && classes.illHeight)} position={'fixed'}>
        <Slide direction="up" in={true}>
          <Container className={classes.content}>
            <div className={classes.editHeader}>
              <div className={classes.name}>{lottieInfo.name}</div>
              <CustomButton
                className={classes.saveButton}
                icon
                type='saved'
                isChecked={isSaved}
                onClick={handleClick('save')}
              />
              <div style={{ float: 'right' }}>
                <CustomButton
                  className={classes.resetButton}
                  content='Reset'
                  icon={resetIcon}
                  onMouseEnter={() => setResetIcon(svgRemove_white)}
                  onMouseLeave={() => setResetIcon(svgRemove)}
                  onClick={handleClick('reset')}
                  type='outLine'
                />
                <CustomButton
                  className={classes.editFinishButton}
                  content='Finish editing'
                  onMouseEnter={() => setXIcon(svgXWhite)}
                  onMouseLeave={() => setXIcon(svgX)}
                  icon={xIcon}
                  type='outLine'
                  onClick={() => onClose()}
                />
              </div>
            </div>
            <Grid container spacing={5} >
              <Grid item xs={viewMode === 'Icons' ? 'auto' : 6}>
                <div className={cx(classes.lottieArea, viewMode === 'Icons' ? classes.iconsArea : classes.illuArea)}>
                  <EditLottiePlayer
                    originData={originLottieData}
                    viewMode={viewMode}
                    iconColor={iconColor.rgb}
                    illustrationColor={illustrationColor}
                    speed={speed / 2.5}
                    scale={scale}
                    stroke={stroke}
                    onEdit={handleLottieEdit}
                    autoplay
                    isStopped={isStopped}
                    isBlink={isBlink}
                    blinkColor={blinkColor}
                  />
                </div>
              </Grid>
              <Grid item xs={viewMode === 'Icons' ? 'auto' : 6}>
                <Grid container spacing={2} className={viewMode === 'Icons' ? classes.controllerArea : classes.fullid}>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      {
                        viewMode === 'Icons'
                          ?
                          <>
                            <Grid item xs={6}>
                              <ControllerContainer title='Color:'>
                                <CustomColorPicker
                                  isOnEditMode
                                  initialValue={iconColor.hex}
                                  onChangeColor={handleChangeColor}
                                  onResetColor={handleResetColor(0)}
                                  resetColor={resetColor}
                                />
                              </ControllerContainer>
                            </Grid>
                            <Grid item xs={6}>
                              <ControllerContainer title='Scale:'>
                                <CustomSlider
                                  isOnEditMode
                                  onChange={handleChangeSlider('scale')}
                                  sliderValue={scale}
                                />
                              </ControllerContainer>
                            </Grid>
                          </>
                          :
                          <Grid item xs={12}>
                            <ControllerContainer title='Color:' className={classes.extendedArea}>
                              <PerfectScrollbar
                                className={classes.colorPallet}
                                options={{
                                  suppressScrollX: true,
                                  useBothWheelAxes: false,
                                  wheelPropagation: false
                                }}
                              >
                                <Grid container spacing={2}>
                                  {
                                    illustrationOriginColor && illustrationOriginColor.map((item, key) => {
                                      return (
                                        <Grid item xs='auto' key={key} >
                                          <CustomColorPicker
                                            isOnEditMode
                                            hideColorText
                                            initialValue={item}
                                            onMouseEnter={handleColorHover(key)}
                                            onMouseLeave={handleColorLeave(key)}
                                            onChangeColor={handleIllustrationChangeColor(key)}
                                            onResetColor={handleResetColor(key)}
                                            resetColor={resetColor}
                                          />
                                        </Grid>
                                      )
                                    })
                                  }
                                </Grid>
                              </PerfectScrollbar>
                            </ControllerContainer>
                          </Grid>
                      }
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        {
                          viewMode === 'Icons'
                            ?
                            <ControllerContainer title='Speed:'>
                              <CustomSlider
                                isOnEditMode
                                onChange={handleChangeSlider('speed')}
                                maxValue={5}
                                isPercent={false}
                                sliderValue={speed}
                              />
                            </ControllerContainer>
                            :
                            <ControllerContainer title='Scale:'>
                              <CustomSlider
                                isOnEditMode
                                onChange={handleChangeSlider('scale')}
                                sliderValue={scale}
                              />
                            </ControllerContainer>
                        }
                      </Grid>
                      <Grid item xs={6}>
                        {
                          viewMode === 'Icons'
                            ?
                            <ControllerContainer title='Stroke:'>
                              <CustomSlider
                                isOnEditMode
                                onChange={handleChangeSlider('stroke')}
                                sliderValue={stroke}
                              />
                            </ControllerContainer>
                            :
                            <ControllerContainer title='Speed:'>
                              <CustomSlider
                                isOnEditMode
                                onChange={handleChangeSlider('speed')}
                                maxValue={5}
                                sliderValue={speed}
                                isPercent={false}
                              />
                            </ControllerContainer>
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <CustomButton
                          className={classes.downloadButton}
                          content='JSON'
                          type='filled'
                          onClick={handleClick('json')}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CustomButton
                          className={classes.downloadButton}
                          content='GIF'
                          type='filled'
                          onClick={handleClick('gif')}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CustomButton
                          className={classes.downloadButton}
                          content={isIpad ? 'AE' : 'After Effects'}
                          type='filled'
                          onClick={handleClick('aef')}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        {
                          isSvgAvailable() === true &&
                          <CustomButton
                            className={classes.downloadButton}
                            content='SVG'
                            type='filled'
                            onClick={handleClick('svg')}
                          />
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Slide>
      </AppBar >
      {
        lottieData &&
        <div className={classes.hiddenLottie}>
          <div id='svg-lottie'>
            <Player
              options={{
                loop: false,
                autoplay: false,
                animationData: JSON.parse(lottieData),
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
              isStopped
            />
          </div>
        </div>
      }
    </>
  )
},
  (prevProps, nextProps) => {
    return (
      prevProps.lottieInfo === nextProps.lottieInfo
    )
  })

LottieEdit.propTypes = {
  downloadLottie: PropTypes.func,
  saveLottie: PropTypes.func,
  removeSavedLottie: PropTypes.func,
  checkSavedLottie: PropTypes.func,
  setEditorLottieChangement: PropTypes.func,
}

const actions = {
  downloadLottie,
  saveLottie,
  removeSavedLottie,
  checkSavedLottie,
  setEditorLottieChangement,
}

const selector = createStructuredSelector({
  IconLottieColor: lottieColorSelector,
  IconStrokePercent: strokePercentSelector,
  editorLottieChangement: editorLottieChangementSelector,
})

export default compose(connect(selector, actions))(LottieEdit)

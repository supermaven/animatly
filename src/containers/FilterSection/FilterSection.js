import React, { useState, useEffect } from 'react'
import useStyles from './FilterSection.styles.js'
import { SearchBar, MobileSearchBar } from 'containers/SearchBar'
import {
  Container,
} from '@material-ui/core'
import { CustomButton } from 'components/CustomButton'
import * as cx from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { setSearchMode } from 'redux/modules/global/actions'
import { searchModeSelector, lottieColorSelector } from 'redux/modules/global/selectors'
import { currentUserSelector } from 'redux/modules/auth/selectors'
import PropTypes from 'prop-types'
import { CustomColorPicker } from 'components/CustomColorPicker'
import { CustomSlider } from 'components/CustomSlider'
import { useHistory } from 'react-router-dom'
import { clearLotties } from 'redux/modules/lottie/actions'
import svgRemove from 'assets/images/Icon/remove.svg'
import svgRemove_white from 'assets/images/Icon/remove_white.svg'
import { setLottieColor } from 'redux/modules/global/actions'
import { setStrokePercent } from 'redux/modules/global/actions'
import { Mobile, Default } from 'containers/ResponseLayout'
import { useMediaQuery } from 'react-responsive'

const FilterSection = ({
  lottieColor,
  setSearchMode,
  searchMode,
  initialValue,
  clearLotties,
  setLottieColor,
  setStrokePercent,
  currentUser,
}) => {
  const classes = useStyles()
  const history = useHistory()
  const [resetIcon, setResetIcon] = useState(svgRemove)
  const [color, setColor] = useState('000000')
  const isIpad = useMediaQuery({ maxWidth: 992, minWidth: 601 })

  useEffect(() => {
    setColor(lottieColor.hex)
  }, [lottieColor])

  const handleMode = (mode) => () => {
    setSearchMode({ mode })
    clearLotties()
    history.push(`/search?mode=${mode}`)
  }

  const handleReset = () => {
    setLottieColor({ value: { hex: '000000', rgb: [0, 0, 0] } })
    setStrokePercent({ value: 50 })
  }

  const handleResetColor = () => {
    setLottieColor({ value: { hex: '000000', rgb: [0, 0, 0] } })
  }

  const handleChangeColor = (initial, value) => {
    setLottieColor({ value })
  }

  return (
    <div className={cx(classes.root)}>
      <Container>
        <Default>
          <SearchBar initialValue={initialValue} />
        </Default>

        <Mobile>
          <MobileSearchBar initialValue={initialValue} />
        </Mobile>

        <div className={classes.controlBox}>
          <div className={classes.labelFor}>{isIpad ? 'Search:' : 'I’m looking for:'}</div>
          <CustomButton
            className={cx(classes.button, classes.iconButton)}
            content='Icons'
            type={searchMode === 'Icons' ? 'filled' : 'outLine'}
            noHover
            onClick={handleMode('Icons')}
          />
          <CustomButton
            className={cx(classes.button, classes.illustrationButton)}
            content='Illustrations'
            type={searchMode === 'Illustrations' ? 'filled' : 'outLine'}
            noHover
            onClick={handleMode('Illustrations')}
          />
          <Default>
            {
              searchMode === 'Icons' && currentUser &&
              <div style={{ display: 'flex' }}>
                <div className={classes.label}>Color: </div>
                <CustomColorPicker
                  hideColorText
                  initialValue={color}
                  onChangeColor={handleChangeColor}
                  onResetColor={handleResetColor}
                />
                <div className={classes.label}>Stroke: </div>
                <CustomSlider />
                <CustomButton
                  className={classes.resetButton}
                  content='Reset'
                  icon={resetIcon}
                  onMouseEnter={() => setResetIcon(svgRemove_white)}
                  onMouseLeave={() => setResetIcon(svgRemove)}
                  type='outLine'
                  onClick={handleReset}
                />
              </div>
            }
          </Default>
        </div>
      </Container>
    </div>
  )
}

FilterSection.propTypes = {
  lottieColor: PropTypes.any,
  setSearchMode: PropTypes.func,
  clearLotties: PropTypes.func,
  setStrokePercent: PropTypes.func,
  setLottieColor: PropTypes.func,
  searchMode: PropTypes.string,
  currentUserSelector: PropTypes.any,
}

const actions = {
  setSearchMode,
  clearLotties,
  setLottieColor,
  setStrokePercent,
}

const selector = createStructuredSelector({
  searchMode: searchModeSelector,
  lottieColor: lottieColorSelector,
  currentUser: currentUserSelector,
})

export default compose(connect(selector, actions))(FilterSection)

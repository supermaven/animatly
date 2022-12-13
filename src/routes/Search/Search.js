import React, { useState, useEffect } from 'react'
import { Mobile, Default } from 'containers/ResponseLayout'
import { Header, MobileHeader } from 'containers/Header'
import { PageHeader } from 'components/PageHeader'
import { BackgroundLine } from 'components/BackgroundLine'
import { FilterSection } from 'containers/FilterSection'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { setSearchMode } from 'redux/modules/global/actions'
import {
  filterLottie,
  retrieveLottieByCategory,
  retrieveLotties,
  clearLotties
} from 'redux/modules/lottie/actions'
import { createStructuredSelector } from 'reselect'
import { searchModeSelector } from 'redux/modules/global/selectors'
import { useLocation } from 'react-router-dom'
import Sticky from 'react-stickynode'
import { LottiePreview } from 'containers/LottiePreview'
import { LottieEdit } from 'containers/LottieEdit'
import { FilterResultContainer } from 'containers/FilterResultContainer'
import {
  ClickAwayListener,
  Fade,
  CircularProgress,
} from '@material-ui/core'
import useStyles from './styles.js'
import { authInfo } from 'helpers/localCheck'
import { Waypoint } from 'react-waypoint'
import { Footer, MobileFooter } from 'containers/Footer'

const Search = ({
  searchMode,
  setSearchMode,
  retrieveLottieByCategory,
  clearLotties,
  filterLottie,
}) => {
  const classes = useStyles()
  const location = useLocation()
  const [pageHeaderContent, setPageHeaderContent] = useState('Icon Library')
  const [searchValue, setSearchValue] = useState('')
  const [isPinned, setIsPinned] = useState(false)
  const [result, setResult] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedLottie, setSelectedLottie] = useState({})
  const [isBasedEditor, setIsBasedEditor] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const accessToken = authInfo().tokens && authInfo().tokens.refresh.token
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const init = async () => {
      clearLotties()
      setPreviewOpen(false)
      setEditOpen(false)
      const params = new URLSearchParams(location.search)
      const arg_searchMode = params.get('mode')

      if (arg_searchMode === 'Icons' || arg_searchMode === 'Illustrations') {
        setSearchMode({ mode: arg_searchMode })
        const arg_searchValue = params.get('search')
        const accessToken = authInfo().tokens && authInfo().tokens.refresh.token
        if (arg_searchValue) {
          filterLottie({
            body: {
              type: arg_searchMode,
              filterStr: arg_searchValue,
              accessToken
            },
            success: ({ data }) => {
              setSearchValue(arg_searchValue)
              setResult(data)
            },
            fail: (err) => {
              setSearchValue(arg_searchValue)
            }
          })
        } else {
          setResult([])
          setIsloading(true)
          setSearchValue('')
          retrieveLottieByCategory({
            body: {
              type: arg_searchMode,
              accessToken,
              page: 1,
              limit: 10,
            },
            success: ({ data }) => {
              setResult(data.results)
              setIsloading(false)
              setTotalPage(data.totalPages)
              setHasEntered(false)
            },
            fail: () => {
              setIsloading(false)
              setHasEntered(false)
            }
          })
        }
      }
    }
    init()
  }, [location, setSearchMode, filterLottie, retrieveLottieByCategory, clearLotties])

  useEffect(() => {
    setPage(1)
    setTotalPage(1)
    setHasEntered(false)
    searchMode === 'Icons' ? setPageHeaderContent('Icon Library') : setPageHeaderContent('Illustration Library')
  }, [searchMode])

  const handleStickyStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      setIsPinned(true)
    }
    if (status.status === Sticky.STATUS_ORIGINAL) {
      setIsPinned(false)
    }
  }

  const handleLottiePreview = (selectedLottieInfo) => {
    setIsBasedEditor(false)
    setPreviewOpen(true)
    setEditOpen(false)
    setSelectedLottie(selectedLottieInfo)
  }

  const handleEditClick = () => {
    setPreviewOpen(false)
    setEditOpen(true)
  }

  const handleEditClose = (status) => {
    setIsBasedEditor(status)
    setPreviewOpen(true)
    setEditOpen(false)
  }

  const handleClickAway = (mode) => () => {
    if (previewOpen && mode === 'preview') {
      setPreviewOpen(false)
    }
    if (editOpen && mode === 'edit') {
      handleEditClose(false)
    }
  }

  const onWaypointEnter = () => {
    if (hasEntered) {
      return
    }

    setPage(page + 1)
    setIsloading(true)
    retrieveLottieByCategory({
      body: {
        type: searchMode,
        accessToken,
        page: page + 1,
        limit: searchMode === 'Icons' ? 20 : 10,
      },
      success: ({ data }) => {
        setResult(data.results)
        setIsloading(false)
        setHasEntered(false)
        setTotalPage(data.totalPages)
      },
      fail: () => {
        setIsloading(false)
        setHasEntered(false)
      }
    })
    setHasEntered(true)
  }

  return (
    <>
      <Mobile>
        <MobileHeader isMovable />
        <PageHeader content={pageHeaderContent} mobile className={classes.headerMarginRemove} />
        <Sticky
          innerZ='2'
          innerClass={isPinned ? classes.pinned : ''}
          onStateChange={handleStickyStateChange}
        >
          <FilterSection initialValue={searchValue} />
        </Sticky>
        <FilterResultContainer
          searchValue={searchValue}
          result={result}
          searchMode={searchMode}
          onLottiePreview={handleLottiePreview}
        />
        {
          !isLoading && page < totalPage && searchValue === '' &&
          <Waypoint
            onEnter={onWaypointEnter}
          />
        }
        {
          isLoading && page < totalPage && searchValue === '' &&
          <div className={classes.center}> <CircularProgress /> </div>
        }
        <div style={{ height: searchValue === '' ? '100px' : 'max(calc(100vh - 600px), 100px)' }}></div>
        {
          ((!isLoading && searchValue === '' && page >= totalPage) ||
            searchValue !== '') &&
          < MobileFooter />
        }
        {
          previewOpen &&
          <LottiePreview
            lottieInfo={selectedLottie}
            viewMode={searchMode}
            onPreviewClose={() => setPreviewOpen(false)}
          />
        }
      </Mobile>

      <Default>
        <BackgroundLine>
          <Header isMovable />
          <PageHeader content={pageHeaderContent} className={classes.headerMarginRemove} />
          <Sticky
            onStateChange={handleStickyStateChange}
            innerZ='2'
            innerClass={isPinned ? classes.pinned : ''}
          >
            <FilterSection initialValue={searchValue} />
          </Sticky>
          <div>
            <FilterResultContainer
              searchValue={searchValue}
              result={result}
              searchMode={searchMode}
              onLottiePreview={handleLottiePreview}
            />
            {
              !isLoading && page < totalPage && searchValue === '' &&
              <div>
                <CircularProgress />
                <Waypoint
                  onEnter={onWaypointEnter}
                />
              </div>
            }
            {
              isLoading && page < totalPage && searchValue === '' &&
              <div className={classes.center}> <CircularProgress /> </div>
            }
          </div>
          <div style={{ height: searchValue === '' ? '100px' : 'max(calc(100vh - 600px), 100px)' }}></div>
          {
            ((!isLoading && searchValue === '' && page >= totalPage) ||
              searchValue !== '') &&
            <Footer />
          }
          {
            previewOpen &&
            <ClickAwayListener onClickAway={handleClickAway('preview')} mouseEvent='onMouseDown'>
              <Fade in={previewOpen}>
                <div>
                  <LottiePreview
                    isBasedEditor={isBasedEditor}
                    lottieInfo={selectedLottie}
                    viewMode={searchMode}
                    onEditClick={handleEditClick} />
                </div>
              </Fade>
            </ClickAwayListener>
          }

          {
            editOpen &&
            <ClickAwayListener onClickAway={handleClickAway('edit')}>
              <Fade in={editOpen}>
                <div>
                  <LottieEdit
                    lottieInfo={selectedLottie}
                    isBasedEditor={isBasedEditor}
                    viewMode={searchMode}
                    onClose={() => handleEditClose(true)}
                  />
                </div>
              </Fade>
            </ClickAwayListener>
          }
        </BackgroundLine>
      </Default>
    </>
  )
}

Search.propTypes = {
  searchMode: PropTypes.string,
  setSearchMode: PropTypes.func,
  filterLottie: PropTypes.func,
  retrieveLottieByCategory: PropTypes.func,
  retrieveLotties: PropTypes.func,
  clearLotties: PropTypes.func,
}

const actions = {
  setSearchMode,
  filterLottie,
  retrieveLottieByCategory,
  retrieveLotties,
  clearLotties,
}

const selector = createStructuredSelector({
  searchMode: searchModeSelector,
})

export default compose(connect(selector, actions))(Search)

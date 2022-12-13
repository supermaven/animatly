import React, { memo } from 'react'
import { authInfo } from 'helpers/localCheck'
import { FilterResultSection } from 'containers/FilterResultSection'

const FilterResultContainer = memo(({
  searchValue,
  result,
  searchMode,
  onLottiePreview,
}) => {
  const resultSectionHeader = result.length === 0 ?
    `No search results found for “${searchValue}”` : `Results for “${searchValue}”`

  const checkHighlightFreeSection = (sectionHeader, searchMode) => {
    if (sectionHeader !== 'Freebies') { return false }
    const userInfo = authInfo().user
    if (!userInfo) {
      return false
    } else {
      const currentUserRole = userInfo.role
      if (currentUserRole === 'bothLicensed' || currentUserRole === 'admin') { return false }
      if (searchMode === 'Icons') {
        if (currentUserRole === 'iconLicensedUser') { return false }
      } else {
        if (currentUserRole === 'illustrationLicensedUser') { return false }
      }
    }
    return true
  }

  return (
    searchValue === '' ?
      result.map((item, key) => {
        const sectionHeader = item && item.name.name
        return (
          <FilterResultSection
            key={key}
            result={item.value}
            searchMode={searchMode}
            sectionTitle={sectionHeader}
            isAuthedFreeSection={checkHighlightFreeSection(sectionHeader, searchMode)}
            onLottiePreview={onLottiePreview}
          />
        )
      })
      :
      <FilterResultSection
        result={result}
        searchMode={searchMode}
        sectionTitle={resultSectionHeader}
        onLottiePreview={onLottiePreview}
      />
  )
},
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.result) === JSON.stringify(nextProps.result) &&
      prevProps.searchMode === nextProps.searchMode &&
      prevProps.searchValue === nextProps.searchValue
    )
  }
)

export default FilterResultContainer

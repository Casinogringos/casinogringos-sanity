'use client'

import { Search as SearchIcon, X } from 'lucide-react'
import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '@/src/store/hooks'
import {
  closedSearch,
  closeMainMenu,
  closeNotificationMenu,
  closeSearch as closeSearchAction,
  closingSearch,
  openSearch as openSearchAction,
} from '@/src/store/menuSlice'

const SearchButton = () => {
  const dispatch = useAppDispatch()
  const { isSearchOpen } = useAppSelector((state) => state.menu)
  const openSearch = useCallback(() => {
    dispatch(openSearchAction())
    dispatch(closeMainMenu())
    dispatch(closeNotificationMenu())
  }, [dispatch])

  const closeSearch = useCallback(() => {
    dispatch(closingSearch())
    setTimeout(() => {
      dispatch(closeSearchAction())
      dispatch(closedSearch())
    }, 300)
    document.body.classList.remove('overflow-hidden')
  }, [dispatch])
  const handleToggleSearch = useCallback(() => {
    if (isSearchOpen) {
      closeSearch()
    } else {
      openSearch()
    }
  }, [isSearchOpen, closeSearch, openSearch])

  return (
    <button
      className="z-50 ml-auto flex cursor-pointer items-center rounded-full bg-darklight px-3 py-2 text-white lg:h-9 lg:px-4"
      onClick={() => handleToggleSearch()}
    >
      {isSearchOpen ? (
        <X className="h-4 w-4" aria-hidden="true" />
      ) : (
        <>
          <SearchIcon
            className="z-30 flex h-4 w-4 cursor-pointer items-center text-white"
            aria-hidden="true"
          />
        </>
      )}
      <span className="ml-2 text-xs font-semibold">SÖK</span>
    </button>
  )
}

export default SearchButton

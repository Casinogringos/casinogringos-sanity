'use client'

import { ReactNode, useCallback, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/src/store/hooks'
import {
  closedSearch,
  closeSearch,
  closingSearch,
  openedSearch,
} from '@/src/store/menuSlice'
import ModalCenter from '@/src/components/layout/ModalCenter'

const SearchModel = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const {
    isSearchOpen: isOpen,
    isSearchClosing: isClosing,
    isSearchOpening: isOpening,
  } = useAppSelector((state) => state.menu)

  // Handle opening animation
  useEffect(() => {
    if (isOpening) {
      let cancelled = false
      // Use requestAnimationFrame to ensure the initial state is rendered first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) {
            dispatch(openedSearch())
          }
        })
      })
      return () => {
        cancelled = true
      }
    }
  }, [isOpening, dispatch])

  const close = useCallback(() => {
    dispatch(closingSearch())
    setTimeout(() => {
      dispatch(closeSearch())
      dispatch(closedSearch())
    }, 300)
    document.body.classList.remove('overflow-hidden')
  }, [dispatch])

  return (
    <ModalCenter
      direction="bottom"
      isOpen={isOpen}
      isClosing={isClosing}
      isOpening={isOpening}
      close={close}
      removeFromDom={true}
    >
      {children}
    </ModalCenter>
  )
}

export default SearchModel

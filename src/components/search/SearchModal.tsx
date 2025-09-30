'use client'

import { ReactNode, useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '@/src/store/hooks'
import { closedSearch, closeSearch, closingSearch } from '@/src/store/menuSlice'
import ModalCenter from '@/src/components/layout/ModalCenter'

const SearchModel = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const { isSearchOpen: isOpen, isSearchClosing: isClosing } = useAppSelector(
    (state) => state.menu
  )
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
      close={close}
      removeFromDom={true}
    >
      {children}
    </ModalCenter>
  )
}

export default SearchModel

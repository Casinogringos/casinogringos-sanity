'use client'

import { ReactNode, useCallback } from 'react'
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../../casinogringos-v3/src/store/hooks'
import {
  closedSearch,
  closeSearch as closeSearchAction,
  closingSearch,
} from '../../../../../casinogringos-v3/src/store/menuSlice'
import ModalCenter from '@/app/components/ui/ModalCenter'

type CustomModalProps = {
  children: ReactNode
}
const SearchModel = ({ children }: CustomModalProps) => {
  const dispatch = useAppDispatch()
  const { isSearchOpen, isSearchClosing: isClosing } = useAppSelector(
    (state) => state.menu
  )
  const closeSearch = useCallback(() => {
    dispatch(closingSearch())
    setTimeout(() => {
      dispatch(closeSearchAction())
      dispatch(closedSearch())
    }, 300)
    document.body.classList.remove('overflow-hidden')
  }, [dispatch])

  return (
    <ModalCenter
      direction={'bottom'}
      isClosing={isClosing}
      isOpen={isSearchOpen}
      close={closeSearch}
      position={'top'}
    >
      {children}
    </ModalCenter>
  )
}

export default SearchModel

'use client'

import { ReactNode, useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '@/src/store/hooks'
import {
  closedMainMenu,
  closeMainMenu,
  closingMainMenu,
} from '@/src/store/menuSlice'
import ModalSidebar from '@/src/app/components/organisms/ModalSidebar'

const MenuModal = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const { isMainMenuOpen: isOpen, isMainMenuClosing: isClosing } =
    useAppSelector((state) => state.menu)
  const close = useCallback(() => {
    dispatch(closingMainMenu())
    setTimeout(() => {
      dispatch(closeMainMenu())
      dispatch(closedMainMenu())
    }, 300)
    document.body.classList.remove('overflow-hidden')
  }, [dispatch])

  return (
    <ModalSidebar isOpen={isOpen} isClosing={isClosing} close={close}>
      {children}
    </ModalSidebar>
  )
}

export default MenuModal

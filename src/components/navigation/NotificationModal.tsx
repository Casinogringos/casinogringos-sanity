'use client'

import { ReactNode, useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '@/src/store/hooks'
import {
  closedNotificationMenu,
  closeNotificationMenu,
  closingNotificationMenu,
} from '@/src/store/menuSlice'
import ModalSidebar from '@/src/components/layout/ModalSidebar'

const NotificationModel = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const {
    isNotificationMenuOpen: isOpen,
    isNotificationMenuClosing: isClosing,
  } = useAppSelector((state) => state.menu)
  const close = useCallback(() => {
    dispatch(closingNotificationMenu())
    setTimeout(() => {
      dispatch(closeNotificationMenu())
      dispatch(closedNotificationMenu())
    }, 300)
    document.body.classList.remove('overflow-hidden')
  }, [dispatch])

  return (
    <ModalSidebar isOpen={isOpen} isClosing={isClosing} close={close}>
      {children}
    </ModalSidebar>
  )
}

export default NotificationModel

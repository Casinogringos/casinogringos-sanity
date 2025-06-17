'use client'

import { ReactNode, useCallback } from 'react'
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../../casinogringos-v3/src/store/hooks'
import {
  closedNotificationMenu,
  closeNotificationMenu,
  closingNotificationMenu,
} from '../../../../../casinogringos-v3/src/store/menuSlice'
import ModalSidebar from '@/app/components/ui/ModalSidebar'

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

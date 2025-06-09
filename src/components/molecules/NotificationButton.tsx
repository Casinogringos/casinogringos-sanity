'use client'

import { Bell } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/src/store/hooks'
import {
  closedNotificationMenu,
  closeMainMenu,
  closeNotificationMenu,
  closeSearch as closeSearchAction,
  closingNotificationMenu,
  openNotificationMenu,
} from '@/src/store/menuSlice'
import { getSessionToken, setSessionToken } from '@/src/lib/helpers'

const NotificationButton = ({ count }: { count: number }) => {
  const dispatch = useAppDispatch()
  const [pendingNotifications, setPendingNotifications] = useState(false)
  useEffect(() => {
    setPendingNotifications(getSessionToken('notificationSession') === null)
  }, [])
  const { isNotificationMenuOpen } = useAppSelector((state) => state.menu)
  const closeNotificationSidebar = useCallback(() => {
    dispatch(closingNotificationMenu())
    setTimeout(() => {
      dispatch(closeNotificationMenu())
      dispatch(closedNotificationMenu())
    }, 300)
    document.body.classList.remove('overflow-hidden')
  }, [dispatch])
  const openNotificationSidebar = useCallback(() => {
    dispatch(openNotificationMenu())
    dispatch(closeMainMenu())
    dispatch(closeSearchAction())
    setSessionToken('notificationSession', 'true')
    setPendingNotifications(false)
  }, [dispatch, setPendingNotifications])
  const handleToggleNotificationSidebar = useCallback(() => {
    if (isNotificationMenuOpen) {
      closeNotificationSidebar()
    } else {
      openNotificationSidebar()
    }
  }, [
    isNotificationMenuOpen,
    closeNotificationSidebar,
    openNotificationSidebar,
  ])

  return (
    <button
      onClick={handleToggleNotificationSidebar}
      aria-label="Notifikationer"
      className="mr-2 lg:mr-2.5 relative mt-1 lg:mt-0"
    >
      <Bell aria-hidden="true" className="text-slate100 w-5 h-5" />
      {pendingNotifications && (
        <span className="absolute -top-2 lg:-top-2.5 text-white -right-2.5 w-5 h-5 text-xs flex items-center justify-center bg-red600 rounded-full">
          {count}
        </span>
      )}
    </button>
  )
}

NotificationButton.displayName = 'NotificationButton'
export default NotificationButton

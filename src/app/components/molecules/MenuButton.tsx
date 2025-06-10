'use client'

import { Menu, X } from 'lucide-react'
import ClientFallback from '@/src/app/components/utils/ClientFallback'
import { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/store/hooks'
import {
  closedMainMenu,
  closeMainMenu,
  closeNotificationMenu,
  closeSearch as closeSearchAction,
  closingMainMenu,
  openMainMenu,
} from '@/src/store/menuSlice'

const MenuButton = () => {
  const dispatch = useAppDispatch()
  const { isMainMenuOpen } = useAppSelector((state) => state.menu)
  const [menuSidebarClosing] = useState(false)
  const openMenuSidebar = useCallback(() => {
    dispatch(openMainMenu())
    dispatch(closeSearchAction())
    dispatch(closeNotificationMenu())
  }, [dispatch])
  const closeMenuSidebar = useCallback(() => {
    dispatch(closingMainMenu())
    setTimeout(() => {
      dispatch(closeMainMenu())
      dispatch(closedMainMenu())
    }, 300)
    document.body.classList.remove('overflow-hidden')
  }, [dispatch])
  const handleToggleSidebar = useCallback(() => {
    if (isMainMenuOpen) {
      closeMenuSidebar()
    } else {
      openMenuSidebar()
    }
  }, [isMainMenuOpen, closeMenuSidebar, openMenuSidebar])

  return (
    <ClientFallback
      content={
        <button
          className="z-50 ml-auto flex cursor-pointer items-center rounded-full bg-lightBlue2 px-3 py-2 text-white lg:h-9 lg:px-4"
          onClick={handleToggleSidebar}
        >
          {isMainMenuOpen && !menuSidebarClosing ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <>
              <Menu
                className="z-30 flex h-5 w-5 cursor-pointer items-center text-white"
                aria-hidden="true"
              />
            </>
          )}
          <span className="ml-2 text-xs font-semibold">MENY</span>
        </button>
      }
      fallback={
        <div className="z-50 ml-auto flex cursor-pointer items-center rounded-full bg-lightBlue2 px-3 py-2 text-white lg:h-9 lg:px-4">
          {isMainMenuOpen && !menuSidebarClosing ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <>
              <Menu
                className="z-30 flex h-5 w-5 cursor-pointer items-center text-white"
                aria-hidden="true"
              />
            </>
          )}
          <span className="ml-2 text-xs font-semibold">MENY</span>
        </div>
      }
    />
  )
}

export default MenuButton

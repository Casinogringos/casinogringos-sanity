'use client'

import { createContext, useState, Dispatch, SetStateAction } from 'react'

type StoreContextType = {
  menuSidebarOpen: boolean
  setMenuSidebarOpen: Dispatch<SetStateAction<boolean>>
  notificationSidebarOpen: boolean
  setNotificationSidebarOpen: Dispatch<SetStateAction<boolean>>
  searchOpen: boolean
  setSearchOpen: Dispatch<SetStateAction<boolean>>
  openToggleIds: string[]
  setOpenToggleIds: Dispatch<SetStateAction<string[]>>
}

const RootStore = createContext<StoreContextType>({
  menuSidebarOpen: false,
  setMenuSidebarOpen: () => {},
  notificationSidebarOpen: false,
  setNotificationSidebarOpen: () => {},
  searchOpen: false,
  setSearchOpen: () => {},
  openToggleIds: [],
  setOpenToggleIds: () => {},
})

export const RootStoreProvider = ({ children }) => {
  const [menuSidebarOpen, setMenuSidebarOpen] = useState(false)
  const [notificationSidebarOpen, setNotificationSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [openToggleIds, setOpenToggleIds] = useState<string[]>([])

  return (
    <RootStore.Provider
      value={{
        menuSidebarOpen,
        setMenuSidebarOpen,
        notificationSidebarOpen,
        setNotificationSidebarOpen,
        searchOpen,
        setSearchOpen,
        openToggleIds,
        setOpenToggleIds,
      }}
    >
      {children}
    </RootStore.Provider>
  )
}

export default RootStore

'use client'

import { createSlice } from '@reduxjs/toolkit'

export type ReduxState = {
  menu: {
    isMainMenuOpen: boolean
    isMainMenuClosing: boolean
    isNotificationMenuOpen: boolean
    isNotificationMenuClosing: boolean
    isSearchOpen: boolean
    isSearchClosing: boolean
    toggleIds: string[]
  }
}

const initialState: ReduxState['menu'] = {
  isMainMenuOpen: false,
  isMainMenuClosing: false,
  isNotificationMenuOpen: false,
  isNotificationMenuClosing: false,
  isSearchOpen: false,
  isSearchClosing: false,
  toggleIds: [],
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    closeMainMenu: (state) => {
      state.isMainMenuOpen = false
    },
    closingMainMenu: (state) => {
      state.isMainMenuClosing = true
    },
    closedMainMenu: (state) => {
      state.isMainMenuClosing = false
    },
    openMainMenu: (state) => {
      state.isMainMenuOpen = true
    },
    closeNotificationMenu: (state) => {
      state.isNotificationMenuOpen = false
    },
    closingNotificationMenu: (state) => {
      state.isNotificationMenuClosing = true
    },
    closedNotificationMenu: (state) => {
      state.isNotificationMenuOpen = false
    },
    openNotificationMenu: (state) => {
      state.isNotificationMenuOpen = true
    },
    closeSearch: (state) => {
      state.isSearchOpen = false
    },
    closingSearch: (state) => {
      state.isSearchClosing = true
    },
    closedSearch: (state) => {
      state.isSearchOpen = false
    },
    openSearch: (state) => {
      state.isSearchOpen = true
    },
  },
})

export const {
  openMainMenu,
  closeMainMenu,
  closingMainMenu,
  closedMainMenu,
  openNotificationMenu,
  closeNotificationMenu,
  closingNotificationMenu,
  closedNotificationMenu,
  closeSearch,
  closingSearch,
  closedSearch,
  openSearch,
} = menuSlice.actions
export default menuSlice.reducer

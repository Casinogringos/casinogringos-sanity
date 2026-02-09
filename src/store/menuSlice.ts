'use client'

import { createSlice } from '@reduxjs/toolkit'

export type ReduxState = {
  menu: {
    isMainMenuOpen: boolean
    isMainMenuClosing: boolean
    isSearchOpen: boolean
    isSearchClosing: boolean
    isSearchOpening: boolean
    toggleIds: string[]
  }
}

const initialState: ReduxState['menu'] = {
  isMainMenuOpen: false,
  isMainMenuClosing: false,
  isSearchOpen: false,
  isSearchClosing: false,
  isSearchOpening: false,
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
closeSearch: (state) => {
      state.isSearchOpen = false
    },
    closingSearch: (state) => {
      state.isSearchClosing = true
    },
    closedSearch: (state) => {
      state.isSearchClosing = false
    },
    openSearch: (state) => {
      state.isSearchOpen = true
    },
    openingSearch: (state) => {
      state.isSearchOpening = true
      state.isSearchOpen = true
    },
    openedSearch: (state) => {
      state.isSearchOpening = false
    },
  },
})

export const {
  openMainMenu,
  closeMainMenu,
  closingMainMenu,
  closedMainMenu,
  closeSearch,
  closingSearch,
  closedSearch,
  openSearch,
  openingSearch,
  openedSearch,
} = menuSlice.actions
export default menuSlice.reducer

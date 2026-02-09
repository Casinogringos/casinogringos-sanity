'use client'

import { createSlice } from '@reduxjs/toolkit'

export type ReduxState = {
  toggleIds: string[]
}

const initialState: ReduxState = {
  toggleIds: [],
}

const toggleSlice = createSlice({
  name: 'toggleIds',
  initialState,
  reducers: {
    toggleId: (state, action) => {
      if (state.toggleIds.includes(action.payload)) {
        state.toggleIds = state.toggleIds.filter((id) => id !== action.payload)
      } else {
        state.toggleIds.push(action.payload)
      }
    },
    removeToggleId: (state, action) => {
      state.toggleIds = state.toggleIds.filter((id) => id !== action.payload)
    },
  },
})

export const { toggleId, removeToggleId } = toggleSlice.actions
export default toggleSlice.reducer

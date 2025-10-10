'use client'

import { createSlice } from '@reduxjs/toolkit'

export type ReduxState = {
  toggleIds: string[]
}

const initialState: ReduxState = {
  toggleIds: [],
}

const faqSlice = createSlice({
  name: 'faqToggleIds',
  initialState,
  reducers: {
    toggleId: (state, action) => {
      if (state.toggleIds.includes(action.payload)) {
        state.toggleIds = state.toggleIds.filter((id) => id !== action.payload)
      } else {
        console.log('toggle id', action.payload)
        state.toggleIds = [action.payload]
      }
    },
  },
})

export const { toggleId } = faqSlice.actions
export default faqSlice.reducer

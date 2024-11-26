import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TUser } from '@features/auth/types/auth-types'

export interface TStateAuth {
  isAuthenticated: boolean
  user: TUser | null
  token: string
}

const initialState: TStateAuth = {
  isAuthenticated: false,
  user: null,
  token: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleSetAuth: (state, action: PayloadAction<TStateAuth>) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.user = action.payload.user
      state.token = action.payload.token
    }
  }
})

export default authSlice.reducer

export const { handleSetAuth } = authSlice.actions

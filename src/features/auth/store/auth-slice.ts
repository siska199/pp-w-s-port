import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TUser } from '@features/auth/types/auth-types'

export interface TStateAuth {
  isAuthenticated: boolean
  user: TUser | null
  token: string
  isRememberMe: boolean
}

export const initialStateAuthStore: TStateAuth = {
  isAuthenticated: false,
  user: null,
  token: '',
  isRememberMe: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuthStore,
  reducers: {
    handleSetAuth: (state, action: PayloadAction<TStateAuth>) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.user = action.payload.user
      state.token = action.payload.token
      state.isRememberMe = action.payload.isRememberMe
    }
  }
})

export default authSlice.reducer

export const { handleSetAuth } = authSlice.actions

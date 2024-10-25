import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TRAuthState } from 'types/auth-types'

const initialState: TRAuthState = {
  isAuthenticated: false,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleSetAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    }
  }
})

export default authSlice.reducer

export const { handleSetAuth } = authSlice.actions

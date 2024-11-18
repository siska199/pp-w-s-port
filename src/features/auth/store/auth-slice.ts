import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TStateAuth {
  isAuthenticated: boolean
  user: null
}

const initialState: TStateAuth = {
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

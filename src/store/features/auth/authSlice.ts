import { createSlice } from '@reduxjs/toolkit'

const initialState: TRAuthState = {
  isAuthenticated: false,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
})

export default authSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TRUiState } from 'types/ui-types'

const initialState: TRUiState = {
  isLoading: false,
  isToggleSidebar:false,
  alertConfig: {
    show: false,
    message: '',
    autoClose: true,
    type: 'error'
  }
}

const authSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    handleToggleSidebar : (state,action:PayloadAction<boolean>)=>{
      state.isToggleSidebar= action.payload
    },
    handleSetIsloading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    handleSetAlertConfig: (state, action: PayloadAction<TRUiState['alertConfig']>) => {
      state.alertConfig = {
        ...state.alertConfig,
        ...action.payload
      }
    }
  }
})

export default authSlice.reducer

export const { handleSetIsloading, handleSetAlertConfig, handleToggleSidebar } = authSlice.actions

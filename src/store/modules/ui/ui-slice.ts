import { TPropsModalConfirmation } from '@components/ui/modal/modal-confirmation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRUiState } from '@typescript/modules/ui/ui-types';

const initialState: TRUiState = {
  isLoading: false,
  isToggleSidebar: false,
  alertConfig: {
    show: false,
    message: '',
    autoClose: true,
    type: 'error',
  },
  modalConfirmation: {
    title: 'Confirmation',
    isShow: false,
    children: null,
  },
};

const authSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    handleToggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.isToggleSidebar = action.payload;
    },
    handleSetIsloading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    handleSetAlertConfig: (
      state,
      action: PayloadAction<TRUiState['alertConfig']>
    ) => {
      state.alertConfig = {
        ...state.alertConfig,
        ...action.payload,
      };
    },
    handleSetModalConfirmation: (
      state,
      action: PayloadAction<Partial<TPropsModalConfirmation>>
    ) => {
      state.modalConfirmation = {
        ...state.modalConfirmation,
        ...action.payload,
      };
    },
  },
});

export default authSlice.reducer;

export const {
  handleSetIsloading,
  handleSetAlertConfig,
  handleToggleSidebar,
  handleSetModalConfirmation,
} = authSlice.actions;

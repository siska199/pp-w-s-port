import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TAlertProps } from '@components/ui/alert';
import { TContainerModalProps } from '@components/ui/modal/container-modal';
import { TPropsContainerModalConfirmation } from '@components/ui/modal/container-modal-confirmation';

import { TAlertConfig } from '@typescript/ui-types';

export interface TStateUI {
    isLoading: boolean;
    isToggleSidebar: boolean;
    alertConfig: Omit<Partial<TAlertConfig>, 'show'> & {
        show: boolean;
        type?: TAlertProps['type'];
    };
    modalConfirmation: TPropsContainerModalConfirmation;
    modal: TContainerModalProps;
}
export const initialStateUISlice: TStateUI = {
    isLoading: false,
    isToggleSidebar: false,
    alertConfig: {
        show: false,
        message: '',
        type: 'error',
    },
    modalConfirmation: {
        title: 'Confirmation',
        isShow: false,
        children: null,
        customeClass: {},
    },
    modal: {
        title: '',
        isShow: false,
        children: null,
        customeClass: {},
        onClose: () => null,
    },
};

const authSlice = createSlice({
    name: 'ui',
    initialState: initialStateUISlice,
    reducers: {
        handleToggleSidebar: (state, action: PayloadAction<boolean>) => {
            state.isToggleSidebar = action.payload;
        },
        handleSetIsloading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        handleSetAlertConfig: (state, action: PayloadAction<TStateUI['alertConfig']>) => {
            state.alertConfig = {
                ...state.alertConfig,
                ...action.payload,
            };
        },
        handleSetModalConfirmation: (state, action: PayloadAction<Partial<TPropsContainerModalConfirmation>>) => {
            state.modalConfirmation = {
                ...state.modalConfirmation,
                ...action.payload,
            };
        },
        handleSetModal: (state, action: PayloadAction<Partial<TContainerModalProps>>) => {
            state.modal = {
                ...state.modal,
                ...action.payload,
            };
        },
    },
});

export default authSlice.reducer;

export const { handleSetIsloading, handleSetAlertConfig, handleToggleSidebar, handleSetModalConfirmation, handleSetModal } = authSlice.actions;

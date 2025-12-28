import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import localStorageRedux from 'redux-persist/lib/storage';
import sessionStorageRedux from 'redux-persist/lib/storage/session';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import authSlice from '@features/auth/store/auth-slice';

import uiSlice from '@store/ui-slice';
import CONFIG from '@lib/config/config';
import STORAGE_VARIABLE from '@lib/config/storage-variable';
import { getItemSecureWebstorage } from '@lib/helper/secure-storage';

const encryptor = encryptTransform({
    secretKey: CONFIG.SECRET_KEY,
    onError: function (error) {
        console.log('error encryption redux: ', error.message);
    },
});

/*------- Middleware Log Out--------*/

const middlewareLogout: Middleware = (_storeAPI) => (next) => (action: any) => {
    if (action?.payload?.isAuthenticated === false) {
        persistor.pause();
        persistor.flush().then(() => {
            return persistor.purge();
        });
        localStorage.clear();
        sessionStorage.clear();
    }

    return next(action);
};

/*--------------------------------------------- */
const isRememberMe = getItemSecureWebstorage(STORAGE_VARIABLE.IS_REMEMBER_ME);

const storagePersist = isRememberMe ? localStorageRedux : sessionStorageRedux;

const rootReducers = () => {
    return combineReducers({
        auth: persistReducer(
            {
                key: 'auth',
                storage: storagePersist,
                whitelist: [],
                transforms: [encryptor],
            },
            authSlice,
        ),
        ui: persistReducer(
            {
                key: 'ui',
                storage: storagePersist,
                transforms: [encryptor],
                blacklist: ['modalConfirmation', 'modal'],
            },
            uiSlice,
        ),
    });
};

const store = configureStore({
    reducer: rootReducers(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(middlewareLogout),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { persistor, store };

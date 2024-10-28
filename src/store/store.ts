import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

import authSlice from '@store/modules/auth/auth-slice'
import uiSlice from '@store/modules/ui/ui-slice'
import CONFIG from '@lib/config/config'

const encryptor = encryptTransform({
  secretKey: CONFIG.SECRET_KEY,
  onError: function (error) {
    console.log('error encryption redux: ', error.message)
  }
})

const rootReducers = () => {
  const storagePersist = storage
  return combineReducers({
    auth: persistReducer(
      {
        key: 'auth',
        storage: storagePersist,
        whitelist: [],
        transforms: [encryptor]
      },
      authSlice
    ),
    ui: persistReducer(
      {
        key: 'ui',
        storage: storagePersist,
        transforms: [encryptor]
      },
      uiSlice
    )
  })
}

const mainPersistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    blacklist: ['']
  },
  rootReducers()
)

const store = configureStore({
  reducer: mainPersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { persistor, store }

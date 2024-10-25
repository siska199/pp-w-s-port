import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from '@routes'
import { persistor, store } from '@store/store'
import { AnimatePresence } from 'framer-motion'
import { PersistGate } from 'redux-persist/integration/react'

const Providers = () => {
  return (
    <Provider store={store}>
      <AnimatePresence mode='wait'>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </AnimatePresence>
    </Provider>
  )
}

export default Providers

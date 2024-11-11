import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@store/store'
import router from '@routes'



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

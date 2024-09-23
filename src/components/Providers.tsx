import router from '@routes'
import { persistor, store } from '@store/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

interface TPropsProviders {
  children: React.ReactNode
}

const Providers = (props: TPropsProviders) => {
  const { children } = props
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        {children}
      </PersistGate>
    </Provider>
  )
}

export default Providers

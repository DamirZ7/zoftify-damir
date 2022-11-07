import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Dashboard from '../layout/Dashboard'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Dashboard>
          <Component {...pageProps} />
        </Dashboard>
      </PersistGate>
    </Provider>
  )
}

export default App

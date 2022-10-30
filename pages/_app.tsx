import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Dashboard from '../layout/Dashboard'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Dashboard>
      <Component {...pageProps} />
    </Dashboard>
  )
}

export default App

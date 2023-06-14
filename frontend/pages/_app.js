import '@/styles/globals.css'
import '@/styles/styles.css'

// import type { AppProps } from 'next/app'
import {Government_provider} from '@/context/GovernmentContext'

export default function App({ Component, pageProps }) {
  return (
    <Government_provider>
      <Component {...pageProps} />
    </Government_provider>
  )
}

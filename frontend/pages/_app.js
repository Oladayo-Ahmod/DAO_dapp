import '@/styles/globals.css'
import '@/styles/styles.css'

import type { AppProps } from 'next/app'
import {GOVERNANCE_PROVIDER} from '@/context/GovernmentContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GOVERNANCE_PROVIDER>
      <Component {...pageProps} />
    </GOVERNANCE_PROVIDER>
  )
}

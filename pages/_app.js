import Head from 'next/head'
import '../styles/globals.css'
import MaxWidth from '../components/MaxWidth'

function MyApp({ Component, pageProps }) {
  return (
    <MaxWidth>
      <Component {...pageProps} />
    </MaxWidth>
  )
}

export default MyApp

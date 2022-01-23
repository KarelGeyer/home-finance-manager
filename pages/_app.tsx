import Head from 'next/head'
import '../styles/globals.css'
import MaxWidth from '../components/MaxWidth'
import React from 'react'
import type { AppProps } from 'next/app'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) =>  {
  return (
    <MaxWidth>
      <Component {...pageProps} />
    </MaxWidth>
  )
}

export default MyApp

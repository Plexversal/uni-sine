import '../styles/globals.css'
import Layout from '../components/page-construction/Layout'
import Script from 'next/script'
import Head from 'next/head'
import FastRead from '../components/page-construction/FastRead'

// component which wraps all the pages
function MyApp({ Component, pageProps, router }) {

  if (router.pathname == `/`) return (
    <>
      <Head>
        <title>uni-sine</title>
      </Head>
      <Component {...pageProps} />
    </>
  )

  else return (
    <Layout>
      <Head>
        <title>uni-sine</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

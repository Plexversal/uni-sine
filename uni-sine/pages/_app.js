import '../styles/globals.css'
import Layout from '../components/page-construction/Layout'
import Script from 'next/script'
import Head from 'next/head'
import FastRead from '../components/page-construction/FastRead'
import Footer from '../components/page-construction/Footer'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ErrorBoundary from '../components/page-construction/ErrorBoundary'
import { Analytics } from '@vercel/analytics/react';
// component which wraps all the pages
function MyApp({ Component, pageProps, router }) {

  return (
    <ErrorBoundary>
      <UserProvider>
        <Head>
          <title>uni-sine</title>
        </Head>
        {router.pathname === '/' ? (
          <>
            <Component {...pageProps} />
            {/* <Analytics /> */}
            <Footer />
          </>
        ) : (
          <Layout>
            <ErrorBoundary>
              <Component {...pageProps} />
              {/* <Analytics /> */}
            </ErrorBoundary>
          </Layout>
        )}
      </UserProvider>
    </ErrorBoundary>
  );
}

export default MyApp

import '../styles/globals.css'
import Layout from '../components/page-construction/Layout'
import Head from 'next/head'
import Footer from '../components/page-construction/Footer'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ErrorBoundary from '../components/page-construction/ErrorBoundary'
import { Analytics } from '@vercel/analytics/react';
import { useState, useEffect } from 'react';
import {useUserRedirect} from '../hooks/useUserRedirect';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';


function UserFetcher({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user: authUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/auth0/auth0-user`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) {
      fetchData();
    }
  }, [authUser]);

  return children({ user, isLoading });
}


// component which wraps all the pages
function MyApp({ Component, pageProps, router }) {


  useEffect(() => {
    const initializeMathJax = () => {
        if (window.MathJax && window.MathJax.typeset) {
            window.MathJax.typeset();
        }
    };

    if (window.MathJax) {
        initializeMathJax();
    } else {
        // Configuration for MathJax to handle LaTeX
        window.MathJax = {
            tex: {
                inlineMath: [
                    ["$", "$"],
                    ["\\(", "\\)"],
                ],
            },
            chtml: {
                fontCache: "global",
            },
            jax: ["input/TeX", "output/CommonHTML"],
            options: {
                enableMenu: false
              
            }
        };

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "MathJax-script";
        script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
        script.async = true;

        script.onload = initializeMathJax;

        document.body.appendChild(script);
    }


}, []);

return (
  <ErrorBoundary>
    <UserProvider>
      <UserFetcher>
        {({ user, isLoading }) => (
          <>
            <Head>
              <title>uni-sine</title>
            </Head>
            {router.pathname === '/' ? (
              <>
                <Component {...pageProps} user={user} />
                {/* <Analytics /> */}
                <Footer />
              </>
            ) : (
              <Layout user={user} isLoading={isLoading}>
                <ErrorBoundary>
                  <Component {...pageProps} user={user} isLoading={isLoading} />
                  {/* <Analytics /> */}
                </ErrorBoundary>
              </Layout>
            )}
          </>
        )}
      </UserFetcher>
    </UserProvider>
  </ErrorBoundary>
);
}

export default MyApp

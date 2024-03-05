import '../styles/globals.css'
import Layout from '../components/page-construction/Layout'
import Head from 'next/head'
import Footer from '../components/page-construction/Footer'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ErrorBoundary from '../components/page-construction/ErrorBoundary'
import { Analytics } from '@vercel/analytics/react';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';


function UserFetcher({ children }) {
  const [customUser, setCustomUser] = useState(null);
  const { user: authUser, isLoading: isAuthLoading } = useUser();
  const [isFetchingCustomUser, setIsFetchingCustomUser] = useState(true);

  useEffect(() => {
    // When authUser changes, check its existence to manage custom user fetching
    if (authUser) {
      setIsFetchingCustomUser(true); // Indicate custom user fetching starts
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/auth0/auth0-user`);
          const data = await response.json();
          setCustomUser(data);
        } catch (error) {
          console.error("Error fetching custom user data:", error);
        } finally {
          setIsFetchingCustomUser(false); // Indicate custom user fetching ends
        }
      };
      fetchData();
    } else {
      // If no authUser, no fetching is required, and custom user data should be cleared
      setCustomUser(null);
      setIsFetchingCustomUser(false); // Reset since there's no authUser to fetch data for
    }
  }, [authUser]);

  // Combine loading states to control rendering
  const isLoading = isAuthLoading || isFetchingCustomUser;

  return children({ user: customUser, isLoading });
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
                    ["[", "]"],

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
              <title>Uni-Sine: AI, Graph Calculators, Math and Comp Sci Courses</title>
            </Head>
            {router.pathname === '/' ? (
              <>
                <Component {...pageProps} user={user} isLoading={isLoading} />
                <Analytics />
                <Footer />
              </>
            ) : (
              <Layout user={user} isLoading={isLoading}>
                <ErrorBoundary>
                  <Component {...pageProps} user={user} isLoading={isLoading} />
                  <Analytics />
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

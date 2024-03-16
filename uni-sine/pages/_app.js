import "../styles/globals.css";
import Layout from "../components/page-construction/Layout";
import Head from "next/head";
import Footer from "../components/page-construction/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import ErrorBoundary from "../components/page-construction/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { UserProviderWrapper  } from '../contexts/UserContext'

function MyApp({ Component, pageProps, router }) {

  const [loadedConsent, setLoadedConsent] = useState(false)


  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    }
    // Check if 'consentMode' is not set in localStorage
    if(localStorage.getItem('consentMode') === null) {
      const defaultConsent = {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      };

      gtag("consent", "default", defaultConsent);
  
      // Save the default consent settings to localStorage
      localStorage.setItem('consentMode', JSON.stringify(defaultConsent));
      setLoadedConsent(true)
    } else {
      // Consent has previously been set, use it for configuring gtag
      gtag("consent", "default", JSON.parse(localStorage.getItem('consentMode')));
      setLoadedConsent(true)

    }
  }, []);
  

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
          enableMenu: false,
        },
      };

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "MathJax-script";
      script.src =
        "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.async = true;

      script.onload = initializeMathJax;

      document.body.appendChild(script);
    }
  }, []);

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    setDeferredPrompt(null);
  };

  return (
    <ErrorBoundary>
      <UserProvider>
        <UserProviderWrapper>
          
            <>
              <Head>
                <title>
                  Uni-Sine: AI, Graph Calculators, Math and Comp Sci Courses
                </title>
              </Head>
              {router.pathname === "/" ? (
                <>
                  <Component {...pageProps}/>
                  <Analytics />
                  {loadedConsent &&  <GoogleTagManager gtmId="GTM-M45ZZ7PH" />}
                  <div>
      {deferredPrompt && <button onClick={handleInstallClick}>Install App</button>}
    </div>
                  <Footer />
                </>
              ) : (
                <Layout >
                  <ErrorBoundary>
                    <Component
                      {...pageProps}

                      
                    />
                    <Analytics />
                    {loadedConsent &&  <GoogleTagManager gtmId="GTM-M45ZZ7PH" />}
                  </ErrorBoundary>
                </Layout>
              )}
            </>
          
        </UserProviderWrapper>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default MyApp;

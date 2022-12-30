import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />

    <link rel="shortcut icon" href="/img/favicon.png" type="image/x-icon"/>

    {/* <link rel="apple-touch-icon" type="image/x-icon" href="/img/favicon.png"/>
    <meta name="theme-color" content="#454e56"/>
    <meta name="viewport" content="width=device-width,minimum-scale=1"/>
    <link rel="manifest" href="/manifest.json"/>
    
    <link rel="canonical" href="https://fireship.io/courses/react-next-firebase/"/>

    <meta name="description" content="Build a full-stack app with React, Firebase, and Next.js"/>
    <meta name="image" content="https://fireship.io/courses/react-next-firebase/img/featured.png"/>

    <meta property="og:title" content="Next.js Firebase Full Course"/>
    <meta property="og:type" content="article"/>
    <meta property="og:url" content="https://fireship.io/courses/react-next-firebase/"/>
    <meta property="og:image" content="https://fireship.io/courses/react-next-firebase/img/featured.png"/>
    <meta property="og:description" content="Build a full-stack app with React, Firebase, and Next.js"/>

    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:site" content="@fireship_dev"/>
    <meta name="twitter:title" content="Next.js Firebase Full Course"/>
    <meta name="twitter:description" content="Build a full-stack app with React, Firebase, and Next.js"/>
    <meta name="twitter:image" content="https://fireship.io/courses/react-next-firebase/img/featured.png"/> */}
      
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
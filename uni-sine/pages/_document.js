import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head/> 

    <link rel="shortcut icon" href="/static/logo.png" type="image/x-icon"/>
    <link rel="apple-touch-icon" type="image/x-icon" href="/static/logo.png"/>
    <meta property="og:image" content="/static/home/home-img-4.png"></meta>
    <meta name="theme-color" content="white"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content="Learn the fundamentals of Physics, Maths and Computer science in a single place."/>
    <meta name="image" content="/static/logo.png"/>

    {/* 
    <link rel="manifest" href="/manifest.json"/>
    
    <link rel="canonical" href=""/>

    <meta name="description" content=""/>
    <meta name="image" content=""/>

    <meta property="og:title" content="Next.js Firebase Full Course"/>
    <meta property="og:type" content="article"/>
    <meta property="og:url" content=""/>
    <meta property="og:image" content=""/>
    <meta property="og:description" content=""/>

    <meta name="twitter:card" content=""/>
    <meta name="twitter:site" content=""/>
    <meta name="twitter:title" content=""/>
    <meta name="twitter:description""/>
    <meta name="twitter:image" content=""/> */}
      
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
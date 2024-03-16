import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <link rel="shortcut icon" href="/static/logo.png" type="image/x-icon" />
      <link rel="manifest" href="/manifest.json" />

      <link rel="apple-touch-icon" sizes="192x192" href="/static/manifest/icon-192x192.png" />
      <meta name="theme-color" content="white" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta name="image" content="https://uni-sine.com/static/socials/800500_home.png" />



      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <base href='/glsoft-calculator'></base>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

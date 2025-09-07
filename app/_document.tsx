import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="font-sans min-h-dvh bg-gradient-to-b from-black to-white dark:bg-gradient-to-b dark:from-black dark:to-background text-white dark:text-foreground">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
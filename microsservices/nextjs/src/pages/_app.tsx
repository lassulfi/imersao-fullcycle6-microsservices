import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className='container mx-auto px-8 sm:px-24'>
      <Component {...pageProps} />
    </main>
  )
}
export default MyApp

import '../styles/globals.css'
import Footer from '../components/Footer'
import Head from 'next/head'
import { Montserrat } from 'next/font/google'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The Coffee House</title>
      </Head>
      <main className={`${montserrat.variable} font-sans`}>
        <Component {...pageProps} />
        <Footer />
      </main>
        <ToastContainer />
    </>
  )
}

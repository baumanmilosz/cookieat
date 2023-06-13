import '../styles/globals.css'
import Footer from '../components/Footer'
import Head from 'next/head'
import { Montserrat } from 'next/font/google'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default function MyApp({ Component, pageProps }) {

    useEffect(() => {
        const sseSource = new EventSource("/api/events");
        sseSource.onmessage = function (event) {
            const data = JSON.parse(event.data)
            if(data?.data) {
                toast.success(`Added new recipe ${data?.data?.fullDocument?.name ?? ''}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        };
        return () => {
            sseSource.close();
        };
    }, []);
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

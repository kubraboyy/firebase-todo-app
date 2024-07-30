"use client";
import { AppProps } from "next/app";
import PrivateRoute from "../components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Head from "next/head"; // Head bileşenini içe aktarıyoruz

function MyApp({ Component, pageProps }: AppProps) {
  /*MyApp fonksiyonu uygulamanın ana bileşenini tanımlar.
    PrivateRoute ile tüm sayfaları sararak kullanıcı erişimini kontrol ediyoruz.
    Components ve pageProps ile her sayfanın bileşenini ve özelliklerini alıp render ediyoruz.*/
  return (
    <>
      <Head>
        <title>To Do App</title> {/* Ortak başlığı burada belirtiyoruz */}
      </Head>
      <PrivateRoute>
        <Component {...pageProps} />
      </PrivateRoute>
    </>
  );
}

export default MyApp;

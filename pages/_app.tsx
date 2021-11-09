import Header from "components/Header/Header";
import type { AppProps } from "next/app";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "store/store";
import Head from "next/head";
import "../styles/stylesheets/style.scss";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Social portal</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <main>
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </main>
    </>
  );
};
export default MyApp;

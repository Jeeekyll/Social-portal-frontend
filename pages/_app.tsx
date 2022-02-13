import type { AppProps } from 'next/app';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import 'styles/stylesheets/style.scss';
import { socket, SocketContext } from '@/context/socket';
import { store } from '@/store/store';
import DefaultLayout from '@/layouts/DefaultLayout';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Social portal</title>
      </Head>
      <main>
        <SocketContext.Provider value={socket}>
          <Provider store={store}>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </Provider>
        </SocketContext.Provider>
      </main>
    </>
  );
};

export default App;

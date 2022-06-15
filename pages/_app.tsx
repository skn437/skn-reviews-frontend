import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";
import client from '@/Apollo/client';
import Layout from '@/components/Layout';
import { RecoilRoot } from 'recoil';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps}></Component>
        </Layout>
      </RecoilRoot>
    </ApolloProvider>
  )
}

export default MyApp;

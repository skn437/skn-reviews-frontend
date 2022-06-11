import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";
import client from '@/Apollo/client';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps}></Component>
    </ApolloProvider>
  )
}

export default MyApp;

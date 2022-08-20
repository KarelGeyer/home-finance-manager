import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import MaxWidth from "../components/MaxWidth";

import "../styles/globals.css";

const client = new ApolloClient({
  uri: "http://localhost:2000/graphql",
  cache: new InMemoryCache(),
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <MaxWidth>
        <Component {...pageProps} />
      </MaxWidth>
    </ApolloProvider>
  );
};

export default MyApp;

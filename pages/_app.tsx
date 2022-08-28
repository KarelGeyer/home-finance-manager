import React, { useState } from "react";
import { store } from "../state/store";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import MaxWidth from "../components/MaxWidth";

import "../styles/globals.css";
import { UserSearchContext } from "../state/context/userContext";

const client = new ApolloClient({
  uri: "http://localhost:2000/graphql",
  cache: new InMemoryCache(),
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [userSearch, setUserSearch] = useState("");

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <UserSearchContext.Provider value={{ userSearch, setUserSearch }}>
          <MaxWidth>
            <Component {...pageProps} />
          </MaxWidth>
        </UserSearchContext.Provider>
      </Provider>
    </ApolloProvider>
  );
};

export default MyApp;

import { store } from "../state/store";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import MaxWidth from "../layout/MaxWidth";

import "../styles/globals.css";
import AuthWrapper from "../layout/AuthWrapper";
const client = new ApolloClient({
  uri: "http://localhost:2000/graphql",
  cache: new InMemoryCache(),
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AuthWrapper>
          <MaxWidth>
            <Component {...pageProps} />
          </MaxWidth>
        </AuthWrapper>
      </Provider>
    </ApolloProvider>
  );
};

export default MyApp;

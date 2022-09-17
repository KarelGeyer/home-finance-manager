import { store } from "../state/store";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import client from "../apollo-client";

import AuthWrapper from "../layout/AuthWrapper";
import MaxWidth from "../layout/MaxWidth";
import Page from "../layout/Page";

import "../styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AuthWrapper>
          <MaxWidth>
            <Page>
              <Component {...pageProps} />
            </Page>
          </MaxWidth>
        </AuthWrapper>
      </Provider>
    </ApolloProvider>
  );
};

export default MyApp;

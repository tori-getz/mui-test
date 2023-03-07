import React from "react";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "~/apollo-client";

import { MainPage } from "~/pages";

export const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <MainPage />
    </ApolloProvider>
  );
};

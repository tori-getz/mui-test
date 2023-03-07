import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_APP_API_URL,
  cache: new InMemoryCache(),
});

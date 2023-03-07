import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://152.228.215.94:83/api',
  cache: new InMemoryCache(),
});

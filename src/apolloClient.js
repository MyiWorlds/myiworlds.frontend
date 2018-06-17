import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';

const apolloClient = new ApolloClient({
  link: new BatchHttpLink({
    uri: `${process.env.URL}/graphql`,
    batchInterval: 100,
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;

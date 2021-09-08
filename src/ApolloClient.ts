import {ApolloClient, InMemoryCache, split, createHttpLink, ApolloLink} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {getAuthToken} from './authentication';

// node-fetch didn't work
// https://github.com/apollographql/apollo-link/issues/513#issuecomment-580990233
import fetch from 'cross-fetch';
import {isBrowser} from './utils';

// Describe our environment
const host = '192.168.2.99:4000';
const graphql_path = '/graphql/';
const httpEndpoint = 'http://' + host + graphql_path;
const wsEndpoint = 'ws://' + host + graphql_path;

// HTTP requests
const httpLink = createHttpLink({
  uri: httpEndpoint,
  fetch: fetch,
});

// Initially assign to httpLink. This is used when running unit tests.
let splitLink: ApolloLink = httpLink;

// WebSocket requests are browser only. Unit tests choke on WebSocket stuff.
// See https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-359261024
if (isBrowser()) {
  const wsLink = new WebSocketLink({
    uri: wsEndpoint,
    wsProtocols: ['graphql-ws'],
    options: {
      reconnect: true,
      // The connectionParams object is passed to the server when connects.
      // See the on_connect(self, payload) function in the Django consumer.
      connectionParams: {
        // The assumption is that we pass the authToken got from JWT through
        // the WebSocket, which passes through the payload to the consumer,
        // e.g. MyGraphqlWsConsumer in my Django back end.
        authToken: getAuthToken('WebSocket')
      },
    },
  });

  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
  splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
}

// simple cache
const cache = new InMemoryCache();

// Cache with options
// https://stackoverflow.com/questions/63423578/cache-data-may-be-lost-when-replacing-the-my-field-of-a-query-object
// Didn't quite fix the issue:
//    Cache data may be lost when replacing the limitedSnippets field of a Query object.
// const cache = new InMemoryCache({
//   typePolicies: {
//     SnippetType: {
//       keyFields: ['id']
//     }
//   }
// });

// initialize ApolloClient
export const client = new ApolloClient({
  link: splitLink,
  cache: cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  }
});

export default client;

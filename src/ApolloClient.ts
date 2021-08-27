import {ApolloClient, InMemoryCache, split, createHttpLink} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {getAuthToken} from './authentication';
// import * as ws from 'ws';

// node-fetch didn't work
// https://github.com/apollographql/apollo-link/issues/513#issuecomment-580990233
import fetch from 'cross-fetch';

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

// WebSocket requests
const wsLink = new WebSocketLink({
  uri: wsEndpoint,
  wsProtocols: ['graphql-ws'],
  options: {
    reconnect: true,
    // The connectionParams object is passed to the server when connects.
    // See the on_connect(self, payload) function in the Django consumer.
    connectionParams: {
      // The authToken we pass might be from a cookie or whatnot
      authToken: getAuthToken()
    },
  },
  // webSocketImpl: ws
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
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

// initialize ApolloClient
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

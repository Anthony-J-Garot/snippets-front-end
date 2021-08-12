import {ApolloClient, InMemoryCache, split, HttpLink} from "@apollo/client";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from '@apollo/client/utilities';

// Describe our environment
const host = '192.168.2.99:4000';
const graphql_path = '/graphql/';

// HTTP
const httpLink = new HttpLink({
  uri: 'http://' + host + graphql_path
});

// WebSocket
const wsLink = new WebSocketLink({
  uri: 'ws://' + host + graphql_path,
  wsProtocols: ['graphql-ws'],
  options: {
    reconnect: true,
    // The connectionParams object is passed to the server when connects.
    // See the on_connect(self, payload) function in the Django consumer.
    connectionParams: {
      // The authToken we pass might be from a cookie or whatnot
      // authToken: localStorage.getItem('authToken'),
      authToken: (() => {
        let authToken = localStorage.getItem('authToken');
        if (!authToken) {
          console.log("Generating authToken");
          authToken = 'ABCDEFG';
          localStorage.setItem('authToken', authToken);
        } else {
          console.log("Using existing authToken");
        }
        return authToken;
      })()
    }
  },
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
  fetchOptions: {
    mode: 'no-cors',
  },
});

export default client;

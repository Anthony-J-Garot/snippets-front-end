import {ApolloClient, InMemoryCache} from "@apollo/client";
import {WebSocketLink} from "@apollo/client/link/ws";

// initialize ApolloClient
const host = '192.168.2.99:4000';
const graphql_path = '/graphql/';
export const client = new ApolloClient({
	uri: 'http://'+host+graphql_path,
	cache: new InMemoryCache(),
	fetchOptions: {
		mode: 'no-cors',
	},
});

const websocket_path = '/graphql/';
const wsLink = new WebSocketLink({
	uri: 'ws://'+host+websocket_path,
	options: {
		reconnect: true
	}
});

import {ApolloClient, InMemoryCache} from "@apollo/client";

// initialize ApolloClient
let uri = 'http://192.168.2.99:4000/graphql/';
export const client = new ApolloClient({
	uri: uri,
	cache: new InMemoryCache(),
	fetchOptions: {
		mode: 'no-cors',
	},
});

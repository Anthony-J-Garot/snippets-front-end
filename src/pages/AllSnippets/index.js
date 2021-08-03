import {
	ApolloProvider,
	gql,
	useQuery
} from "@apollo/client";

import * as Constants from '../../constants.js';

/*
 * Define this page component
 */
const AllSnippets = () => {
	return (
		<div>
			<p>AllSnippets Breadcrumb</p>
			<ApolloProvider client={Constants.client}>
				<AllSnippetsQuery />
			</ApolloProvider>
		</div>
	);
}

// Defines the GraphQL client query to see all the things
const ALL_SNIPPETS = gql`
query qryAllSnippets {
  allSnippets {
    id
    title
    body
    created
    private
    owner
    __typename
  }
  __typename
}
`

/*
 * Defines the client to pull the GraphQL query results
 */
Constants.client
	.query({
		query: ALL_SNIPPETS
	})
	.then(result => console.log(result));

/*
 * Defines a component that executes the GraphQL query with
 * the useQuery hook and returns the data in a formatted way.
 */
function AllSnippetsQuery() {

	const {loading, error, data} = useQuery(ALL_SNIPPETS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return data.allSnippets.map(({id, title, body}) => (
		<div key={title} className="snippet">
			<p>
				{id} - {title}: {body}
			</p>
		</div>
	));
}

export default AllSnippets;

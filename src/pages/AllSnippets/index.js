import {
	gql,
	useQuery
} from "@apollo/client";
import {
	Link
} from 'react-router-dom';
import './index.css';
//import * as Constants from '../../constants.js';

/*
 * Define this page component
 */
const AllSnippets = () => {
	return (
		<div>
			<p>AllSnippets Breadcrumb</p>
			<AllSnippetsQuery />
		</div>
	);
}

// Defines the GraphQL client query to see all the things.
const ALL_SNIPPETS_QUERY = gql`
query qryAllSnippets {
  allSnippets {
    id
    title
    body
    bodyPreview
    created
    private
    owner
    __typename
  }
  __typename
}
`

/*
 * Sets up the Apollo Client to pull the GraphQL query results.
 * This is the REST way. It's not needed when using useQuery.
 */
// Constants.client
// 	.query({
// 		query: ALL_SNIPPETS_QUERY
// 	})
// 	.then(result => {
// 		console.log("query result (ALL_SNIPPETS_QUERY):", result);
// 	});

/*
 * Defines a component that executes the GraphQL query with
 * the useQuery hook and returns the data in a formatted way.
 */
const AllSnippetsQuery = () => {

	const {loading, error, data, refetch} = useQuery(ALL_SNIPPETS_QUERY, {
		// Necessary for refetchQueries to work after creating a new entry.
		// I chose this because there may be changes to the DB from other places
		// than this front-end App.
		fetchPolicy: "cache-and-network",
		onCompleted: () => {
			console.log("onCompleted (ALL_SNIPPETS_QUERY) fired");
			console.log("data is", data);
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error! ${error}</p>;

	const handleClick = () => {
		// manually refetch
		console.log("refetch button clicked");
		refetch();
	}

	// This creates all the snippets as an object
	let allTheThings = data.allSnippets.map(({id, title, bodyPreview}) => (
		<div key={id} className="snippet">
			<p>
				<Link to={`/snippet/${id}`}>{id}</Link> - {title}: {bodyPreview}
			</p>
		</div>
	));

	return (
		<div>
			{allTheThings}
			<button onClick={handleClick}>Refetch!</button>
		</div>
	);
}

export default AllSnippets;

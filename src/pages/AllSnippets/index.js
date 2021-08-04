import {
	gql,
	useQuery
} from "@apollo/client";
import {
	Link
} from 'react-router-dom';
import './index.css';
import * as Constants from '../../constants.js';

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
 * Defines the client to pull the GraphQL query results
 */
Constants.client
	.query({
		query: ALL_SNIPPETS_QUERY
	})
	.then(result => console.log(result));

/*
 * Defines a component that executes the GraphQL query with
 * the useQuery hook and returns the data in a formatted way.
 */
function AllSnippetsQuery() {

	const {loading, error, data} = useQuery(ALL_SNIPPETS_QUERY);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return data.allSnippets.map(({id, title, bodyPreview}) => (
		<div key={id} className="snippet">
			<p>
				<Link to={`/snippet/${id}`}>{id}</Link> - {title}: {bodyPreview}
			</p>
		</div>
	));
}

export default AllSnippets;

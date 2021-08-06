import React, {useState} from "react";
import './index.css';
import {
	gql,
	useMutation,
	useQuery,
} from "@apollo/client";
import {useRouteMatch, Redirect, useHistory} from "react-router-dom";
import ALL_SNIPPETS_QUERY from '../AllSnippets/index.js'
import SnippetFormFields from '../../SnippetFormFields.js'

/*
 * Define this page component.
 * Note that I blend the useQuery and useMutation hooks in the same component.
 * This was a little tricky because of the deconstruction variables of the same
 * name, i.e. data, loading, error. I followed the advice here:
 * https://stackoverflow.com/questions/62571120/apollo-hooks-usequery-and-usemutation-under-the-same-component
 */
const UpdateSnippet = () => {
	let match = useRouteMatch();
	let snippetId = match.params['snippetId'];
	//console.log("snippetId is ", snippetId);
	let history = useHistory();

	const {data} = useQuery(GET_SNIPPET_QUERY, {
		fetchPolicy: "network-only", // if only grabbing one record, always get from DB
		//fetchPolicy: "cache-and-network",
		variables: {
			id: snippetId
		},
		onCompleted: () => {
			console.log("onCompleted (GET_SNIPPET_QUERY)", data);
			if (data) {
				setFormState(data.snippetById);
			} else {
				console.log("No data???");
			}
		},
		onError: (error) => {
			console.log("QUERY Error: ", error);
		},
	});

	// The data that’s typed into the form fields is held in the
	// component’s local state by way of the useState hook.
	const [formState, setFormState] = useState({
		title: 'Loading . . . ',
		body: 'Loading . . . ',
		private: true
	});

	// The useMutation hook passes the state into the mutation
	const [updateSnippet] = useMutation(UPDATE_SNIPPET_MUTATION, {
		variables: {
			id: snippetId,
			input: {
				title: formState.title,
				body: formState.body,
				private: formState.private,
			}
		},
		refetchQueries: [ALL_SNIPPETS_QUERY],	// This is wrapped in gql tab
		onCompleted: (data) => {
			console.log("onCompleted (updateSnippet) ", data);
			// Preferred way to redirect
			history.push("/snippet");
		},
		onError: (error) => {
			console.log("MUTATION Error: ", error);
		},
	});

	return (
		<div>
			<p>Update Snippet Breadcrumb {snippetId}</p>
			<form onSubmit={(e) => {
				e.preventDefault();
				updateSnippet();
			}}>
				{SnippetFormFields(formState, setFormState)}
				<br />
				<button type="submit">Update Snippet</button>
			</form>
		</div>
	);
}

const GET_SNIPPET_QUERY = gql`
query snippetById($id: String!) {
  snippetById(id: $id) {
    id
    title
    body
    private
    owner
    created
    __typename
  }
}
`

const UPDATE_SNIPPET_MUTATION = gql`
mutation updateSnippet($id: ID!, $input: SnippetInput!) {
  updateSnippet(id: $id, input: $input) {
    snippet {
      title
      body
      private
      bodyPreview
    }
    ok
  }
}
`

export default UpdateSnippet;

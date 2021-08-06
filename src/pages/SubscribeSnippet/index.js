import './index.css';
import {gql, useSubscription, useApolloClient} from "@apollo/client";
import {useState} from "react";

/*
 * Define this page component
 */
const SubscribeSnippet = () => {

	const [state, setState] = useState({
		title: '. . . ',
		body: '. . . ',
		private: true
	});

	const {loading, data, error} = useSubscription(SNIPPET_NOGROUP_SUBSCRIPTION, {
		variables: {},
		onSubscriptionData: (data) => {
			console.log("SUBSCRIPTION: data is ", data);
			setState(data.subscriptionData.data.onSnippetNoGroup.snippet);
		},
		fetchPolicy: "network-only", // not really sure what a caching option means in the context of a subscription
		client: useApolloClient(), // unneeded, but leaving as a placeholder to show that I could specify a different one
	});

	if (loading) {
		// console.log("loading");
	}

	if (error) {
		console.log(error);
	}

	return (
		<Transaction {...state} />
	)
}

const Transaction = (state) => {
	//console.log("State ", state);

	return (
		<div>
			<p>Snippet.title: <span id="title">{state.title}</span></p>
			<p>Snippet.body: <span id="body">{state.body}</span></p>
			<p>Snippet.private: <span id="private">{state.private}</span></p>
		</div>
	)
}

/*
 * The backend currently has two subscription possibilities:
 * 1. with group
 * 2. no group
 * No group is the simpler, so I will start with that.
 */
const SNIPPET_NOGROUP_SUBSCRIPTION = gql`
subscription subNoGroup {
  onSnippetNoGroup {
    sender
    snippet {
      id
      title
      private
      created
      body
    }
    ok
  }
}
`

export default SubscribeSnippet;

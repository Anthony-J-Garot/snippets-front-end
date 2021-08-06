import './index.css';
import {gql, useSubscription, useApolloClient} from "@apollo/client";
import {useState} from "react";

/*
 * Define this page component
 */
const SubscribeSnippet = () => {

	const transactions = [];

	// Some placeholder values as I figure out where these fields should go on the page.
	transactions.push({
		sender: 'Books R Us',
		snippet: {
			id: '0',
			title: 'Pippi Longstocking',
			body: 'This was a really good book. It starts in  . . . ',
			private: false,
			created: '2021-08-04T15:49:43.000000-07:00'
		}
	});

	// Set up useState with the initial value from above
	const [state, setState] = useState(transactions);

	const {loading, error} = useSubscription(SNIPPET_NOGROUP_SUBSCRIPTION, {
		variables: {},
		onSubscriptionData: (data) => {
			console.log("SUBSCRIPTION: data is ", data);
			transactions.push(data.subscriptionData.data.onSnippetNoGroup);
			setState(transactions);
			//console.log(transactions);
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
		<div id="feed">
			<Transaction items={state} />
		</div>
	)
}

const Transaction = ({items}) => {
	console.log("Transactions ", items);

	return items.map(item => (
		<div>
			<h2 key={item.snippet.id}>{item.sender}</h2>
			<div className="row">
				<div className="col1">
					{item.snippet.id}
				</div>
				<div className="col2">
					{item.snippet.title}
				</div>
				<div className="col3">
					{item.snippet.body}
				</div>
				<div className="col4">
					{item.snippet.private}
				</div>
			</div>
		</div>
	));
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

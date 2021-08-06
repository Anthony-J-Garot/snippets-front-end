import './index.css';
import {gql, useSubscription,} from "@apollo/client";
import * as Constants from '../../constants.js';

/*
 * Define this page component
 */
const SubscribeSnippet = () => {

	// const [subscribe, {data: {onSnippetNoGroup}, loading}] = useSubscription(SNIPPET_NOGROUP_SUBSCRIPTION, {
	const {loading, data, error} = useSubscription(SNIPPET_NOGROUP_SUBSCRIPTION, {});

	if (loading) {
		console.log("loading");
	}

	if (error) {
		console.log(error);
	}

	if (data) {
		console.log(data);
	}

	return (
		<div>
			<p className="App-page-title">Subscribe Snippet</p>
			<p>{data}</p>
		</div>
	);
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
    }
    ok
  }
}
`

export default SubscribeSnippet;

import React, {ReactElement} from 'react';
import './index.css';
import {gql, useSubscription, useApolloClient} from '@apollo/client';
import {useState} from 'react';
import noticesStore from '../../Observables/noticesStore';

interface IFeedItem {
  ok: boolean,
  sender: string,
  snippet: {
    id: string,
    title: string,
    body: string,
    private: boolean,
    created: string
  }
  transType: string
}

// Do not create an instance of this. It will make you unhappy.
export interface ISubscriptionProps {
  transactions: IFeedItem[]
}

const transactions: IFeedItem[] = [];

// Just a simple seed value
const placeholder: IFeedItem = {
  ok: true,
  sender: 'Books R Us',
  snippet: {
    id: '0',    // placeholder can have a 0 id
    title: 'Calahan\'s Crosstime Saloon',
    body: 'Lighter fare. Enjoyable read.',
    private: false,
    created: '2021-08-04T15:49:43.000000-07:00'
  },
  transType: ''
};
transactions.push(placeholder);

/*
 * Define this page component
 */
const SubscribeSnippet = (): ReactElement => {

  // Set up useState with the initial value from above
  const [state, setState] = useState({
    transactions: transactions
  });

  const {loading, error} = useSubscription(SNIPPET_NOGROUP_SUBSCRIPTION, {
    variables: {}, // no inputs necessary for this particular (no-group) subscription
    onSubscriptionData: (data) => {
      console.log('SUBSCRIPTION: data sent is ', data);
      // console.log('SUBSCRIPTION: data in JSON is ', JSON.stringify(data.subscriptionData));
      transactions.push(data.subscriptionData.data.onSnippetNoGroup);
      console.log('Transactions (' + (transactions.length) + ') ', transactions);

      // Send the transactions array inside an anonymous object
      setState({transactions});
    },
    fetchPolicy: 'network-only', // not really sure what a caching option means in the context of a subscription
    client: useApolloClient(), // unneeded, but leaving as a placeholder to show that I could specify a different one
    shouldResubscribe: true, // not sure what this does
  });

  if (loading) {
    console.log('loading');
  }

  if (error) {
    console.log('Error: ' + error);
    noticesStore.setNotice({notice: 'Error: ' + error});
  }

  return (
    <div id="feed">
      <p className="App-page-title">Real-time Subscription Feed</p>
      <Transaction {...state} />
    </div>
  );
};

const Transaction: React.FC<ISubscriptionProps> = (SubscriptionProps: ISubscriptionProps): ReactElement => {

  const items = SubscriptionProps.transactions;		// shorthand

  // console.log('Mapping Feed Transactions (' + (items.length) + ')', items);

  const SubscriptionFeed = items.map((item: IFeedItem, index: number) => {

    if (item.snippet !== null) {
      return (
        <li key={index}>
          <div className="sender">{item.sender}</div>
          <div className="row">
            <div className="col1">
              {item.snippet.id}&nbsp;{item.transType}
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
        </li>
      );
    }
  });

  return (
    <ul>
      {SubscriptionFeed}
    </ul>
  );
};

/*
 * The backend currently has two subscription possibilities:
 * 1. with group
 * 2. no group
 * No group is the simpler, so I will start with that.
 */
export const SNIPPET_NOGROUP_SUBSCRIPTION = gql`
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
    transType
    ok
  }
}
`;

export default SubscribeSnippet;

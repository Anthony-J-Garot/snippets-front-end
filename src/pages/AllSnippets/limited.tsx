import React, {ReactElement} from 'react';
import {gql, useQuery, DocumentNode} from '@apollo/client';
import './index.css';
import {getAuthToken} from '../../authentication';
import userStore from '../../Observables/userStore';

/*
 * This shows which snippets a user can view according to
 * permissions. I didn't port over the delete or edit functionality
 * from All Snippets.
 */

// Defines the GraphQL client query to see all the things.
export const LIMITED_SNIPPETS_QUERY: DocumentNode = gql`
query qryLimitedSnippets {
  limitedSnippets {
    id
    title
    bodyPreview
    owner
    isPrivate: private
    __typename
  }
  __typename
}
`;

/*
 * Sets up the Apollo Client to pull the GraphQL query results.
 * This is the REST way. It's not needed when using useQuery.
 */

const checkMarkIcon = (isPrivate: boolean) => {
  const check: string = process.env.PUBLIC_URL + '/check-mark-8-64.png';
  //console.log(check);
  if (isPrivate) {
    return (
      <img src={check} width={24} alt="Is Private" />
    );
  }
  return ('');
};

/*
 * Defines a component that executes the GraphQL query with
 * the useQuery hook and returns the data in a formatted way.
 */
const username = userStore.getUser();
const authToken = getAuthToken('LimitedSnippets');

const LimitedSnippets = (): ReactElement => {

  const {loading, data, refetch} = useQuery(LIMITED_SNIPPETS_QUERY, {
    // fetchPolicy is necessary for refetchQueries to work after creating a new entry.
    fetchPolicy: 'cache-and-network',
    context: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + authToken
      }
    },
    onCompleted: () => {
      console.log('onCompleted (LIMITED_SNIPPETS_QUERY) fired');
      console.log('data is', data);
    },
    onError: (error) => {
      console.log('QUERY Error: ', error);
    },
  });

  if (loading) return (
    <div>
      <p className='loading'>Loading...</p>
    </div>
  );

  const handleClick = () => {
    // manually refetch
    console.log('refetch button clicked');
    refetch().then(() => {
      console.log('Refetch finished');
    });
  };

  const Headers = () => (
    <div className="row">
      <div className="col1 header">
        ID
      </div>
      <div className="col2 header">
        Title
      </div>
      <div className="col3 header">
        Body Preview
      </div>
      <div className="col4 header">
        Owner
      </div>
      <div className="col5 header">
        Private
      </div>
    </div>
  );

  interface ISnippetMap {
    __typename: string,
    body: string,
    bodyPreview: string,
    created: string,
    id: string,
    isPrivate: boolean,
    owner: string,
    title: string,
  }

  // This creates all the snippets as an object
  const limitedThings: ReactElement =
    data.limitedSnippets.map(({id, title, bodyPreview, owner, isPrivate}: ISnippetMap): ReactElement => {
      return (
        <div key={id} className="row">
          <div className="col1">
            {id}
          </div>
          <div className="col2">
            {title}
          </div>
          <div className="col3">
            {bodyPreview}
          </div>
          <div className="col4">
            {owner}
          </div>
          <div className="col5">
            {checkMarkIcon(isPrivate)}
          </div>
        </div>
      );
    });

  return (
    <div>
      <p className="App-page-title">My [{username}] + Public Snippets List</p>
      <div id="snippets-list">
        <Headers />
        {limitedThings}
      </div>
      <button onClick={handleClick}>Refetch!</button>
    </div>
  );
};

export default LimitedSnippets;

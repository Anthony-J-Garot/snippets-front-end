import React, {ReactElement} from 'react';
import {gql, useMutation, useQuery, DocumentNode} from '@apollo/client';
import {Link} from 'react-router-dom';
import './index.css';

// Defines the GraphQL client query to see all the things.
export const ALL_SNIPPETS_QUERY: DocumentNode = gql`
query qryAllSnippets {
  allSnippets {
    id
    title
    body
    bodyPreview
    created
    isPrivate: private
    owner
    __typename
  }
  __typename
}
`;

export const DELETE_SNIPPET_MUTATION = gql`
mutation mutDeleteSnippet($id: ID!) {
  deleteSnippet(id: $id) {
    ok
    snippet {
      id
      title
      private
      created
      body
    }
  }
}
`;

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

const deleteIcon = () => {
  const icon: string = process.env.PUBLIC_URL + '/delete.svg';
  return (
    <img src={icon} width={24} alt="Delete item" />
  );
};

const editIcon = () => {
  const icon: string = process.env.PUBLIC_URL + '/pencil.svg';
  return (
    <img src={icon} width={24} alt="Edit item" />
  );
};

/*
 * Defines a component that executes the GraphQL query with
 * the useQuery hook and returns the data in a formatted way.
 */
const AllSnippets = (): ReactElement => {

  const {loading, data, refetch} = useQuery(ALL_SNIPPETS_QUERY, {
    // fetchPolicy is necessary for refetchQueries to work after creating a new entry.
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      console.log('onCompleted (ALL_SNIPPETS_QUERY) fired');
      console.log('data is', data);
    },
    onError: (error) => {
      console.log('QUERY Error: ', error);
    },
  });

  // The useMutation hook passes the state into the mutation.
  // The variables option must be passed in.
  const [mutDeleteSnippet] = useMutation(DELETE_SNIPPET_MUTATION, {
    // Note that is is an array. You can specify multiple queries to refetch after the mutation occurs.
    // Note: refetchQueries will only work with strings if the component that defined the original query
    // is not unmounted. On the contrary, it will always work when using the
    // { query... , variables: ... } style.
    // https://github.com/apollographql/apollo-client/issues/5419#issuecomment-598065442
    refetchQueries: [{
      query: ALL_SNIPPETS_QUERY,
      variables: {}
    }],
    onCompleted: (data) => {
      console.log('onCompleted (DeleteSnippet)', data);
    },
    onError: (error) => {
      console.log('MUTATION Error: ', error);
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
        Act
      </div>
      <div className="col2 header">
        Title
      </div>
      <div className="col3 header">
        Body Preview
      </div>
      <div className="col4 header">
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

  // 	<Link to={`/snippet/delete/${id}`}>{deleteIcon(id)}</Link>
  // This creates all the snippets as an object
  const allTheThings: ReactElement = data.allSnippets.map(({id, title, bodyPreview, isPrivate}: ISnippetMap): ReactElement => {
    return (
      <div key={id} className="row">
        <div className="col1">
          <Link to={`/snippet/${id}`}>{editIcon()}</Link>
          &nbsp;&nbsp;
          <Link to="#" className='deleteIcon' id={`delete_${id}`} onClick={() => mutDeleteSnippet({variables: {id: id}})}>{deleteIcon()}</Link>
        </div>
        <div className="col2">
          {title}
        </div>
        <div className="col3">
          {bodyPreview}
        </div>
        <div className="col4">
          {checkMarkIcon(isPrivate)}
        </div>
      </div>
    );
  });

  return (
    <div>
      <p className="App-page-title">All Snippets List</p>
      <div id="allTheThings">
        <Headers />
        {allTheThings}
      </div>
      <button onClick={handleClick}>Refetch!</button>
    </div>
  );
};

export default AllSnippets;

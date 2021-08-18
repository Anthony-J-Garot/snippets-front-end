import React, {ReactElement, useState} from 'react';
import './index.css';
import {
  gql,
  useMutation,
  useQuery,
} from '@apollo/client';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {ALL_SNIPPETS_QUERY} from '../AllSnippets/index';
import SnippetFormFields from '../../SnippetFormFields';
import noticesStore from '../../Observables/noticesStore.ts';

/*
 * Define this page component.
 * Note that I blend the useQuery and useMutation hooks in the same component.
 * This was a little tricky because of the deconstruction variables of the same
 * name, i.e. data, loading, error. I followed the advice here:
 * https://stackoverflow.com/questions/62571120/apollo-hooks-usequery-and-usemutation-under-the-same-component
 */
const UpdateSnippet: React.FC = (): ReactElement => {
  let match = useRouteMatch();
  let snippetId = match.params['snippetId'];
  let history = useHistory();

  const {data} = useQuery(GET_SNIPPET_QUERY, {
    fetchPolicy: 'network-only', // if only grabbing one record, always get from DB
    //fetchPolicy: "cache-and-network",
    variables: {
      id: snippetId
    },
    onCompleted: () => {
      console.log('onCompleted (GET_SNIPPET_QUERY)', data);
      if (data) {
        setFormState(data.snippetById);
      } else {
        noticesStore.setNotice({notice: 'Error: no data??'});
      }
    },
    onError: (error) => {
      console.log('QUERY Error: ', error);
      noticesStore.setNotice({notice: 'Error: ' + error});
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
      console.log('onCompleted (updateSnippet) ', data);
      // Preferred way to redirect
      history.push('/snippet');
      noticesStore.setNotice({notice: 'Your snippet has been updated'});
    },
    onError: (error) => {
      console.log('MUTATION Error: ', error);
      noticesStore.setNotice({notice: 'Error: ' + error});
    },
  });

  return (
    <div>
      <p className="App-page-title">Update Snippet {snippetId}</p>
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
};

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
`;

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
`;

export default UpdateSnippet;

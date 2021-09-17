import React, {ReactElement, useState} from 'react';
import './index.css';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {ALL_SNIPPETS_QUERY} from '../AllSnippets';
import SnippetFormFields from '../../SnippetFormFields';
import noticesStore from '../../Observables/noticesStore';
import {RouteComponentProps} from 'react-router-dom';
import {now} from './mockFixtures';

export interface IUpdateProps extends RouteComponentProps {
  snippetId: string,
}

/*
 * Define this page component.
 * Note that I blend the useQuery and useMutation hooks in the same component.
 * This was a little tricky because of the deconstruction variables of the same
 * name, i.e. data, loading, error. I followed the advice here:
 * https://stackoverflow.com/questions/62571120/apollo-hooks-usequery-and-usemutation-under-the-same-component
 */
const UpdateSnippet: React.FC<IUpdateProps> = (UpdateProps :IUpdateProps): ReactElement => {

  // console.log('UpdateProps', UpdateProps);

  const history = useHistory();

  let snippetId = '';   // initialize to nonsensical value
  if ('match' in UpdateProps) {
    //console.log('Found match');
    snippetId = (UpdateProps.match.params as {snippetId:string}).snippetId;
  } else if ('snippetId' in UpdateProps) {
    //console.log('Found snippetId');
    snippetId = UpdateProps.snippetId;
  } else {
    console.error('Fundamental flaw: Couldn\'t find snippetId');
    return (
      <div>Fundamentally flawed code</div>
    );
  }
  // console.log('ENTERED . . . id is: ', snippetId);

  // We need the id of the snippet to display to the user and update later.
  // Where does it come from? The Router in normal use, passes through the props
  // With unit tests I might pass it through the parameters.

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
      noticesStore.setNotice({notice: '' + error});
    },
  });

  // The data that’s typed into the form fields is held in the
  // component’s local state by way of the useState hook.
  const [formState, setFormState] = useState({
    title: 'Loading . . . ',
    body: 'Loading . . . ',
    private: true,
    user: 1
  });

  // The useMutation hook passes the state into the mutation
  const [updateSnippet] = useMutation(UPDATE_SNIPPET_MUTATION, {
    variables: {
      id: snippetId,
      input: {
        title: formState.title,
        body: formState.body,
        private: formState.private,
        created: now
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
      noticesStore.setNotice({notice: '' + error});
    },
  });

  return (
    <div>
      <p className="App-page-title">Update Snippet {snippetId}</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        updateSnippet().then(() => {console.log('promise handled');});
      }}>
        {SnippetFormFields(formState, setFormState)}
        <br />
        <button type="submit">Update Snippet</button>
      </form>
    </div>
  );
};

export const GET_SNIPPET_QUERY = gql`
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

export const UPDATE_SNIPPET_MUTATION = gql`
mutation mutUpdateSnippet($id: ID!, $input: SnippetInput!) {
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

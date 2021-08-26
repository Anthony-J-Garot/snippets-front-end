import React, {ReactElement, useState} from 'react';
import './index.css';
import {
  gql,
  useMutation,
} from '@apollo/client';
import {ALL_SNIPPETS_QUERY} from '../AllSnippets';
import SnippetFormFields, {IFormState} from '../../SnippetFormFields';
import noticesStore from '../../Observables/noticesStore';

const initialState: IFormState = {
  title: '',
  body: '',
  private: true
};

/*
 * Define this page component
 */
const CreateSnippet = (): ReactElement => {

  // The data that’s typed into the form fields is held in the
  // component’s local state by way of the useState hook.
  const [formState, setFormState] = useState(initialState);

  // The useMutation hook passes the state into the mutation
  const [createSnippet] = useMutation(CREATE_SNIPPET_MUTATION, {
    variables: {
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
      console.log('onCompleted (createSnippet)', data);
      noticesStore.setNotice({notice: 'Your snippet has been created'});
    },
    onError: (error) => {
      console.log('MUTATION Error: ', error);
      noticesStore.setNotice({notice: 'Error: ' + error});
    },
  });

  return (
    <div>
      <p className="App-page-title">Create Snippet</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        createSnippet().then(()=>{
          console.log('Snippet created');
        });
      }}>
        {SnippetFormFields(formState, setFormState)}
        <br />
        <button type="submit">Create Snippet</button>
      </form>
    </div>
  );
};


// This is a basic mutation used with hard coded inputs to get
// the above code working. Leaving around for a bit.
// const CREATE_SNIPPET_MUTATION = gql`
// mutation mutCreateSnippet {
//   createFormSnippet(input: {title: "#N Coffee Tales", body: "A full rich flavor", private: true}) {
//     snippet {
//       title
//       body
//       private
//     }
//     ok
//   }
// }
// `

// Export for the unit test
export const CREATE_SNIPPET_MUTATION = gql`
mutation mutCreateSnippet($input: FormCreateSnippetMutationInput!) {
  createFormSnippet(input: $input) {
    snippet {
      id
      title
      body
      private
      owner
    }
    ok
  }
}
`;

export default CreateSnippet;

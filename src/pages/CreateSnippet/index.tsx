import React, {ReactElement, useState} from 'react';
import './index.css';
import {
  gql,
  useMutation,
} from '@apollo/client';
import ALL_SNIPPETS_QUERY from '../AllSnippets/index';
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
const CreateSnippet: React.FC = (): ReactElement => {

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
    refetchQueries: [ALL_SNIPPETS_QUERY],	// This is wrapped in gql tab
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
        createSnippet();
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

const CREATE_SNIPPET_MUTATION = gql`
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

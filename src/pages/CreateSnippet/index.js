import {useState} from "react";
import './index.css';
import {
	gql,
	useMutation,
} from "@apollo/client";

/*
 * Define this page component
 */
const CreateSnippet = () => {

	// The data that’s typed into the form fields is held in the
	// component’s local state by way of the useState hook.
	const [formState, setFormState] = useState({
		title: '',
		body: '',
		private: false
	});

	// The useMutation hook passes the state into the mutation
	const [createSnippet, {data, loading, error}] = useMutation(CREATE_SNIPPET_MUTATION, {
		variables: {
			input: {
				title: formState.title,
				body: formState.body,
				private: formState.private,
			}
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	// After the mutation occurs, let's take a peek
	if (data) {
		console.log("mutation completed");
		console.log(data);
	}

	return (
		<div>
			<p>Create Snippet Breadcrumb</p>
			<form onSubmit={(e) => {
				e.preventDefault();
				createSnippet();
			}}>
				<div className="flex flex-column mt3">
					<input className="mb2"
						   value={formState.title}
						   onChange={(e) =>
							   setFormState({
								   ...formState,
								   title: e.target.value
							   })
						   }
						   type="text"
						   placeholder="A title for the snippet"
					/>
					<textarea value={formState.body}
							  onChange={(e) =>
								  setFormState({
									  ...formState,
									  body: e.target.value
								  })
							  }
							  rows={8}
							  placeholder="The body of the snippet"
					/>
					<div>
						<span>Private: </span>
						<input className="mb2"
							   value={formState.private}
							   onChange={(e) =>
								   setFormState({
									   ...formState,
									   private: e.target.value
								   })
							   }
							   type="checkbox"
							   placeholder="The private of the snippet"
						/>
					</div>
				</div>
				<br />
				<button type="submit">Create Snippet</button>
			</form>
		</div>
	);
}


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
`

export default CreateSnippet;

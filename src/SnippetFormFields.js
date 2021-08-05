const SnippetFormFields = (formState, setFormState) => {
	return (
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
					   checked={formState.private}
					   onChange={(e) =>
						   setFormState({
							   ...formState,
							   private: e.target.checked
						   })
					   }
					   type="checkbox"
					   placeholder="The private of the snippet"
				/>
			</div>
		</div>
	);
}

export default SnippetFormFields;

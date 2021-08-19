import React, {ReactElement} from 'react';

export interface IFormState {
  title: string,
  body: string,
  private: boolean
}

const SnippetFormFields = (formState: IFormState, setFormState: (arg0: IFormState) => void): ReactElement => {

  return (
    <div className='flex flex-column mt3'>
      <input
        id='title'
        className='mb2'
        value={formState.title}
        onChange={(e) => {
          // console.log('Inside onChange event', e);
          setFormState({
            ...formState,
            title: e.target.value
          });
        }}
        type='text'
        placeholder='A title for the snippet'
      />
      <textarea
        id='body'
        value={formState.body}
        onChange={(e) =>
          setFormState({
            ...formState,
            body: e.target.value
          })
        }
        rows={8}
        placeholder='The body of the snippet'
      />
      <div>
        <span>Private: </span>
        <input
          id='private'
          className='mb2'
          checked={formState.private}
          onChange={(e) =>
            setFormState({
              ...formState,
              private: e.target.checked
            })
          }
          type='checkbox'
          placeholder='The private of the snippet'
        />
      </div>
    </div>
  );
};

export default SnippetFormFields;

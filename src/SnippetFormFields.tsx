import React, {ReactElement} from 'react';
import userStore from './Observables/userStore';

export interface IFormState {
  title: string,
  body: string,
  private: boolean,
  user: number
}

const SnippetFormFields = (formState: IFormState, setFormState: (arg0: IFormState) => void): ReactElement => {

  // The userID doesn't really matter because the back-end will set
  // a snippet's owner to the authenticated user. Maybe if I do something
  // with admin functions I will change this.
  const userID = userStore.getUserId();
  if (formState.user != userID) {
    setFormState({
      ...formState,
      user: userID
    });
  }

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

import React, {ReactElement, useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import noticesStore from '../../Observables/noticesStore';
import {noop} from '../../utils';
import './index.css';
import {clearAuthToken, newAuthToken} from '../../authentication';
import userStore from '../../Observables/userStore';
import {ANONYMOUS_USER} from '../../constants';

export interface IFormState {
  username: string,
  password: string
}

const initialState: IFormState = {
  username: '',
  password: ''
};

/*
 * Signon or Login component
 */
export const Signon = (): ReactElement => {

  // The data that’s typed into the form fields is held in the
  // component’s local state by way of the useState hook.
  const [formState, setFormState] = useState(initialState);

  // The useMutation hook passes the state into the mutation
  const [authenticate] = useMutation(LOGIN_MUTATION, {
    variables: {
      input: {
        username: formState.username,
        password: formState.password
      }
    },
    onCompleted: (data) => {
      console.log('onCompleted (authenticate)', data);
      if (data.login.ok) {
        newAuthToken();
        noticesStore.setNotice({notice: 'SUCCESS: You have been signed on'});
        userStore.setUser({username: formState.username});
      } else {
        clearAuthToken();
        noticesStore.setNotice({notice: 'FAILED: You failed to sign on'});
        userStore.setUser({username: ANONYMOUS_USER});
      }
    },
    onError: (error) => {
      console.log('MUTATION Error: ', error);
      noticesStore.setNotice({notice: 'Error: ' + error});
    },
  });

  return (
    <div>
      <p className="App-page-title">Login</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        authenticate().then(() => {
          noop('User authenticated');
        });
      }}>
        <div className='flex User-flex-column'>
          <input
            id='username'
            value={formState.username}
            onChange={(e) => {
              // console.log('username', 'Inside onChange event', e);
              setFormState({
                ...formState,
                username: e.target.value
              });
            }}
            type='text'
            placeholder='Enter your username'
          />
          <input
            id='password'
            value={formState.password}
            onChange={(e) => {
              // console.log('password', 'Inside onChange event', e);
              setFormState({
                ...formState,
                password: e.target.value
              });
            }}
            type='text'
            placeholder='Enter your password'
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


// Export for the unit test
export const LOGIN_MUTATION = gql`
mutation mutLogin($input: LoginInput!) {
  login(input: $input) {
    ok
  }
}
`;

export default Signon;

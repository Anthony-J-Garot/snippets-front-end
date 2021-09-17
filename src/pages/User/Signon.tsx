import React, {ReactElement, useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import noticesStore from '../../Observables/noticesStore';
import {noop} from '../../utils';
import './index.css';
import userStore from '../../Observables/userStore';
import {PUBLIC_USER} from '../../constants';
import {clearAuthToken, setAuthToken} from '../../authentication';

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
 * This uses JWT, which means a token is passed back and forth such
 * that security information is available on the React front-end.
 */
export const Signon = (): ReactElement => {

  // The data that’s typed into the form fields is held in the
  // component’s local state by way of the useState hook.
  const [formState, setFormState] = useState(initialState);

  // The useMutation hook passes the state into the mutation.
  // Using the JWT tokenAuth to generate a token.
  const [tokenAuth] = useMutation(TOKEN_AUTH_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password
    },
    onCompleted: (data) => {
      console.log('onCompleted (tokenAuth)', data);
      if (data.tokenAuth.token) {
        // Capture token for the front-end. Set this before Observables.
        setAuthToken(data.tokenAuth.token);
        noticesStore.setNotice({notice: 'SUCCESS: You have been signed on'});
        userStore.setUser({id: data.tokenAuth.payload.user_id, username: formState.username});
      } else {
        clearAuthToken(); // Clear the front-end token
        noticesStore.setNotice({notice: 'FAILED: You failed to sign on'});
        userStore.setUser(PUBLIC_USER);
      }
    },
    onError: (error) => {
      console.log('MUTATION Error: ', error);
      noticesStore.setNotice({notice: '' + error});
      userStore.setUser(PUBLIC_USER);
    },
  });

  return (
    <div>
      <p className="App-page-title">Sign on</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        tokenAuth().then(() => {
          // Runs after onCompleted()
          noop();
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
            type='password'
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
export const TOKEN_AUTH_MUTATION = gql`
mutation mutSignonJWT($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
    payload
    refreshExpiresIn
  }
}
`;

export default Signon;

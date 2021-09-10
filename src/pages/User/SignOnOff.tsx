import React, {ReactElement, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getAuthToken} from '../../authentication';
import userStore from '../../Observables/userStore';
import {signOffUser} from './signoff';
import {ANONYMOUS_USER} from '../../constants';


/*
 * The <SignOnOff /> component renders based upon current authentication state.
 */


// Show the username in the Navbar
const Username = (username: string): ReactElement => (
  <p><span className='username-label'>User: </span><span className='username'>{username}</span></p>
);

/*
 * Component that shows the Sign-on/Sign-off link as well as the current user.
 */
const SignOnOff = (): ReactElement => {

  // Set-up the authToken state
  const [authToken, setAuthToken] = useState(ANONYMOUS_USER.username);

  // Set-up the username state
  const [username, setUsername] = useState(ANONYMOUS_USER);

  useEffect(() => {
    // Subscribe to the username because that will be the dependency for the next effect
    userStore.subscribe(setUsername);
  }, []);

  // Next cycle, this gets run. (After the component is rendered.)
  // Is only called once.
  // deps = what it triggers from.
  useEffect(() => {
    // Every time the username changes, I want to verify that the user is still authenticated.
    const tempToken = getAuthToken('SignOnOff . . . useEffect');

    // A change in the token triggers the whole component to re-render.
    if (tempToken !== authToken) {
      setAuthToken(tempToken);
    }
  }, [username]);

  // Shows up the second time-through.
  if (authToken !== '') {
    return (
      <div>
        {Username(username.username)}
        <p><a href='#' onClick={signOffUser}>Sign off</a></p>
      </div>
    );
  } else {
    return (
      <div>
        {Username(username.username)}
        <p><Link to="/user">Sign on</Link></p>
      </div>
    );
  }
};

export default SignOnOff;

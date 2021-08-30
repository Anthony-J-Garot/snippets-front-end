import React, {ReactElement, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {clearAuthToken, getAuthToken} from './authentication';
import userStore from './Observables/userStore';
import {ANONYMOUS_USER} from './constants';

const defaultUsername = {username: ANONYMOUS_USER};

// Logs off the user
const signOffUser = (): void => {
  clearAuthToken();
  userStore.setUser({username: ANONYMOUS_USER});  // Clear it
};

// The <SignOnOff /> component renders based upon current authentication state.
const SignOnOff = (): ReactElement => {

  // Set-up the authToken state
  const [authToken, setAuthToken] = useState(getAuthToken());

  // Set-up the username state
  const [username, setUsername] = useState(defaultUsername);

  useEffect(() => {
    // Subscribe to the username because that will be the dependency for the next effect
    userStore.subscribe(setUsername);
  }, []);

  // Next cycle, this gets run. (After the component is rendered.)
  // Is only called once.
  // deps = what it triggers from.
  useEffect(() => {
    // Every time the username changes, I want to verify that the user is still authenticated.
    const tempToken = getAuthToken();

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

// Show the username in the Navbar
const Username = (username: string): ReactElement => (
  <p><span className='username-label'>User: </span><span className='username'>{username}</span></p>
);


/*
 * The component I want to render
 */
const Navbar = (): ReactElement => {

  return (
    <div className="navbar">
      <p><Link to="/">Home</Link></p>
      <p><Link to="/snippet">All Snippets</Link></p>
      <p><Link to="/snippet/create">Create Snippet</Link></p>
      <p><Link to="/snippet/subscribe">Subscribe</Link></p>

      {/* A link to the Playground on the API side. */}
      <p><a href="http://192.168.2.99:4000/graphql/" target="_blank" rel="noreferrer">GraphiQL Playground</a></p>
      <br />
      <br />
      <br />
      <SignOnOff />
    </div>
  );
};

export default Navbar;

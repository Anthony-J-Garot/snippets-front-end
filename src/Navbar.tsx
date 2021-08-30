import React, {ReactElement, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {clearAuthToken, getAuthToken} from './authentication';
import Username from './Username';
import userStore from './Observables/userStore';


// Logs off the user
const signOffUser = (): void => {
  clearAuthToken();
  userStore.setUser({username: ''});
};

const defaultUsername = {username: ''};

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
  // The deps = what it triggers off of.
  useEffect(() => {
    // Every time the username changes, I want to verify that the user is still logged in.
    const tempToken = getAuthToken();

    // This triggers the whole component to re-render.
    if (tempToken !== authToken) {
      setAuthToken(tempToken);
    }
  }, [username]);

  // Shows up the second time-through.
  if (authToken !== '') {
    return (
      <p><a href='#' onClick={signOffUser}>Sign off</a></p>
    );
  } else {
    return (
      <p><Link to="/user">Sign on</Link></p>
    );
  }
};

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
      <Username />
      <SignOnOff />
    </div>
  );
};

export default Navbar;

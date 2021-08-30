import React, {ReactElement, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {clearAuthToken, getAuthToken} from './authentication';
import Username from './Username';
import userStore from './Observables/userStore';


// Logs off the user
const signOff = (): void => {
  clearAuthToken();
  userStore.setUser({username: ''});
};

const defaultUsername = {username: ''};

// Probably going to have to link this to an observable . . .
const ShowSignOffButton = (): ReactElement => {

  // Set the authToken state
  const [authToken, setAuthToken] = useState('');

  // Set the username state
  const [username, setUsername] = useState(defaultUsername);

  useEffect(() => {
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
  // <p><a href='' onClick={signOff}>Sign off</a></p>
  if (authToken !== '') {
    return (
      <p>
        <button onClick={signOff}>Sign off</button>
      </p>
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
      <ShowSignOffButton />
      <Username />
    </div>
  );
};

export default Navbar;

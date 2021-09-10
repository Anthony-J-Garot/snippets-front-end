import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import SignOnOff from './pages/User/SignOnOff';


/*
 * The component I want to render
 */
const Navbar = (): ReactElement => {

  return (
    <div className="navbar">
      <p><Link to="/">Home</Link></p>
      <p><Link to="/snippet/my">My Snippets</Link></p>
      <p><Link to="/snippet/all">All Snippets</Link></p>
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

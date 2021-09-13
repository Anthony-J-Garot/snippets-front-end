import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import SignOnOff from './pages/User/SignOnOff';


const Navbar = (): ReactElement => {

  return (
    <div className="navbar">
      <p className='navbar-header'>Main Links</p>

      <p><Link to="/">Home</Link></p>
      <p><Link to="/snippet/my">List My Snippets</Link></p>
      <p><Link to="/snippet/create">Create New Snippet</Link></p>
      <p><Link to="/snippet/subscribe">Subscribe To Feed</Link></p>
      <SignOnOff />

      <hr />
      <p className='navbar-header'>Developer Links</p>
      <p><Link to="/snippet/all">List All Snippets</Link></p>
      {/* A link to the Playground on the API side. */}
      <p><a href="http://192.168.2.99:4000/graphql/" target="_blank" rel="noreferrer">GraphiQL Playground</a></p>
      <p><a href="http://192.168.2.99:4000/snippets/" target="_blank" rel="noreferrer">Django API GUI</a></p>
    </div>
  );
};

export default Navbar;

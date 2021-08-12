import React from 'react';
import './App.css';
import Main from './Main.js';
import Navbar from './Navbar.js';

/*
 * App level component
 */
const App = () => {
  let logo = process.env.PUBLIC_URL + '/logo.svg';

  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          <div className="column left">
            <img src={logo} className="App-logo" alt="Spinning logo" />
          </div>
          <div className="column right">
            <h2>Snippets Front-end App</h2>
            <p>A React App that uses Apollo Client and GraphQL to connect to Django backend API.</p>
          </div>
        </div>
      </header>
      <div className="row">
        <div className="column left">
          <Navbar />
        </div>
        <div className="column right">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default App;

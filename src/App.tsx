import React, {ReactElement} from 'react';
import './App.css';
import Main from './Main';
import Navbar from './Navbar';
import Notice from './Notice';

/*
 * App level component
 */
const App: React.FC = (): ReactElement => {
  const logo = process.env.PUBLIC_URL + '/logo.svg';

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
            <Notice />
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

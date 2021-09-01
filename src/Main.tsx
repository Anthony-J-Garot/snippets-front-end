import React, {ReactElement} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import AllSnippets from './pages/AllSnippets';
import LimitedSnippets from './pages/AllSnippets/limited';
import CreateSnippet from './pages/CreateSnippet';
import UpdateSnippet from './pages/UpdateSnippet';
import SubscribeSnippet from './pages/SubscribeSnippet';
import {Signon} from './pages/User/Signon';

/*
 * The Main component renders the "main" section from "pages."
 */
const Main = (): ReactElement => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home} />
      <Route exact path='/user' component={Signon} />
      <Route exact path='/snippet' component={LimitedSnippets} />
      <Route exact path='/snippet/all' component={AllSnippets} />
      <Route exact path='/snippet/create' component={CreateSnippet} />

      <Route exact path='/snippet/:snippetId(\d+)' component={UpdateSnippet} />
      <Route path='/snippet/subscribe' component={SubscribeSnippet} />
    </Switch>
  );
};

export default Main;

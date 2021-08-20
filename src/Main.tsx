import React, {ReactElement} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import AllSnippets from './pages/AllSnippets';
import CreateSnippet from './pages/CreateSnippet';
import UpdateSnippet from './pages/UpdateSnippet';
import SubscribeSnippet from './pages/SubscribeSnippet';

/*
 * The Main component renders the "main" section from "pages."
 */
const Main: React.FC = (): ReactElement => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home} />
      <Route exact path='/snippet' component={AllSnippets} />
      <Route exact path='/snippet/create' component={CreateSnippet} />

      <Route exact path='/snippet/:snippetId(\d+)' component={UpdateSnippet} />
      <Route path='/snippet/subscribe' component={SubscribeSnippet} />
    </Switch>
  );
};

export default Main;

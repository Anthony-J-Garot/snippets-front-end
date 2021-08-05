import React from 'react';
import {
	Switch,
	Route,
} from 'react-router-dom';
// Pages
import Home from './pages/Home';
import AllSnippets from './pages/AllSnippets';
import CreateSnippet from './pages/CreateSnippet';
import UpdateSnippet from './pages/UpdateSnippet';

const Main = () => {

	return (
		<Switch> {/* The Switch decides which component to show based on the current URL.*/}
			<Route exact path='/' component={Home} />
			<Route exact path='/snippet' component={AllSnippets} />
			<Route exact path='/snippet/create' component={CreateSnippet} />

			{/* This will capture an update URL, e.g. /snippets/1 */}
			<Route path='/snippet/:snippetId' component={UpdateSnippet} />
		</Switch>
	);
}

export default Main;

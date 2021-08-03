import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import AllSnippets from './pages/AllSnippets';
import CreateSnippet from './pages/CreateSnippet';

const Main = () => {
	return (
		<Switch> {/* The Switch decides which component to show based on the current URL.*/}
			<Route exact path='/home' component={Home}></Route>
			<Route exact path='/all_snippets' component={AllSnippets}></Route>
			<Route exact path='/create_snippet' component={CreateSnippet}></Route>
		</Switch>
	);
}

export default Main;

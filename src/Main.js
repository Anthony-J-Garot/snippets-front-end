import React from 'react';
import {
	Switch,
	Route,
	useRouteMatch,
} from 'react-router-dom';
// Pages
import Home from './pages/Home';
import AllSnippets from './pages/AllSnippets';
import CreateSnippet from './pages/CreateSnippet';

const UpdateSnippet = () => {
	let match = useRouteMatch();
	let snippetId = match.params['snippetId'];
	//console.log(snippetId);

	return (
		<p>YYZ Placeholder {snippetId}</p>
	)
}

const Main = () => {

	return (
		<Switch> {/* The Switch decides which component to show based on the current URL.*/}
			<Route exact path='/' component={Home}></Route>
			<Route exact path='/snippet' component={AllSnippets}></Route>
			<Route exact path='/create_snippet' component={CreateSnippet}></Route>

			{/* This will capture an update URL, e.g. /snippets/1 */}
			<Route path={`/snippet/:snippetId`}>
				<UpdateSnippet />
			</Route>
		</Switch>
	);
}

export default Main;

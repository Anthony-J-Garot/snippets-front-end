import logo from './logo.svg';
import './App.css';
import Main from './Main.js'
import {Link} from "react-router-dom"

function Navbar() {
	return (
		<div className="Navbar">
			<p><Link to="/">Home</Link></p>
			<p><Link to="/all_snippets">All Snippets</Link></p>
			<p><Link to="/create_snippet">Create Snippet</Link></p>
		</div>
	);
}

/*
 * This is the wrapper around the HTML for the page.
 */
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2>Snippets App</h2>
			</header>
			<Navbar />
			<Main />
		</div>
	);
}

export default App;

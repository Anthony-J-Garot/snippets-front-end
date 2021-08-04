import logo from './logo.svg';
import './App.css';
import Main from './Main.js'
import {Link} from "react-router-dom"

function Navbar() {
	return (
		<div className="navbar">
			<p><Link to="/">Home</Link></p>
			<p><Link to="/snippet">All Snippets</Link></p>
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
				<div className="row">
					<div className="column">
						<img src={logo} className="App-logo" alt="logo" />
					</div>
					<div className="column">
						<h2>Snippets Front-end App</h2>
						<p>This React App communicates with a Django backend API via GraphQL.</p>
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
}

export default App;

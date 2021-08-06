import {Link} from "react-router-dom"

const Navbar = () => {
	return (
		<div className="navbar">
			<p><Link to="/">Home</Link></p>
			<p><Link to="/snippet">All Snippets</Link></p>
			<p><Link to="/snippet/create">Create Snippet</Link></p>
			<p><Link to="/snippet/subscribe">Subscribe</Link></p>
		</div>
	);
}

export default Navbar;

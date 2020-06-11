import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import * as firebase from "firebase";
import './NavBar.css';
import logo from '../assets/findappy-logoo.png';

class NavigationBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			
		};
		this.returnNav=this.returnNav.bind(this);
	}
	componentWillMount() {
		this.checkAuthentication();

	}
	checkAuthentication() {
		firebase.auth().onAuthStateChanged((authUser) => {
			if (authUser) {
				this.setState({
					user: authUser.email
				});
			}
			else {
				this.setState({ user: null });
			}
		})
	}
	returnNav() {
		if (this.state.user === null) {
			return (<Nav.Link href="/login" style={{ textAlign: "right", color: "#5a6f83" }} >Login</Nav.Link>);
		}
		else if (this.state.user === "") {
			return null;
		}
		else {
			return(<Nav.Link href="/profile" style={{ textAlign: "right", color: "#5a6f83" }} >Profile</Nav.Link>);
		}


	}
	render() {
		return (
			<Navbar id="nav-bar"  >
				<Navbar.Brand href="/" style={{ color: "#5a6f83" }}><h2 style={{color:"#5a6f83"}}>Find Appy</h2></Navbar.Brand>
				<Nav className="ml-auto" >
					{this.returnNav()}
				</Nav>
			</Navbar>
		);
	}
}
export default NavigationBar;
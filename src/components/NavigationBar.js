import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import * as firebase from "firebase";
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
			return (<Nav.Link href="/login" style={{ textAlign: "right", color: "white" }} >Login</Nav.Link>);
		}
		else if (this.state.user === "") {
			return null;
		}
		else {
			return(<Nav.Link href="/profile" style={{ textAlign: "right", color: "white" }} >Profile</Nav.Link>);
		}


	}
	render() {
		return (
			<Navbar style={{ backgroundColor: "rgb(26, 38, 49)" }} >
				<Navbar.Brand href="/" style={{ color: "white" }}>FindMyApp</Navbar.Brand>
				<Nav className="ml-auto" >
					{this.returnNav()}
				</Nav>
			</Navbar>
		);
	}
}
export default NavigationBar;
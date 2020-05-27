import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
class NavigationBar extends React.Component{
	render(){
		return(
				 <Navbar bg="dark" variant="dark">
				 	<Navbar.Brand href="/">FindMyApp</Navbar.Brand>
				 	<Nav className="ml-auto">
				      <Nav.Link href="#" style={{textAlign:"right"}}>Profile</Nav.Link>
				    </Nav>
				 </Navbar>
		);
	}
}
export default NavigationBar;
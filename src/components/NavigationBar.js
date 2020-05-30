import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
class NavigationBar extends React.Component{
	render(){
		return(
				 <Navbar  >
				 	<Navbar.Brand href="/" style={{color:"white"}}>FindMyApp</Navbar.Brand>
				 	<Nav className="ml-auto" >
				      <Nav.Link href="/signup" style={{textAlign:"right"}} style={{color:"white"}}>Sign Up</Nav.Link>
				    </Nav>
				 </Navbar>
		);
	}
}
export default NavigationBar;
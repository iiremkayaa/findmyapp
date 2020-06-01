import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
class NavigationBar extends React.Component{
	render(){
		return(
				 <Navbar style={{backgroundColor:"#6F90AF"}} >
				 	<Navbar.Brand href="/" style={{color:"white"}}>FindMyApp</Navbar.Brand>
				 	<Nav className="ml-auto" >
				      <Nav.Link href="/signup" style={{textAlign:"right",color:"white"}} >Sign Up</Nav.Link>
				    </Nav>
				 </Navbar>
		);
	}
}
export default NavigationBar;
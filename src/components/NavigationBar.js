import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
class NavigationBar extends React.Component{
	render(){
		return(
				 <Navbar style={{backgroundColor:"rgb(26, 38, 49)"}} >
				 	<Navbar.Brand href="/" style={{color:"white"}}>FindMyApp</Navbar.Brand>
				 	<Nav className="ml-auto" >
				      <Nav.Link href="/login" style={{textAlign:"right",color:"white"}} >Login</Nav.Link>
				    </Nav>
				 </Navbar>
		);
	}
}
export default NavigationBar;
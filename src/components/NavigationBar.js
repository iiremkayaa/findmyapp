import React from 'react';
import { Navbar, Nav, Table } from 'react-bootstrap';
import * as firebase from "firebase";
import './NavBar.css';
import logo from '../assets/findappy-logoo.png';
import { useMediaQuery } from 'react-responsive';
const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}
const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
}
const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
}
class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",

        };
        this.returnNav = this.returnNav.bind(this);
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
            return (<Nav.Link href="/login" style={{ textAlign: "right", color: "#5a6f83",fontSize:"16px",fontWeight:"600"  }} >Login</Nav.Link>);
        }
        else if (this.state.user === "") {
            return null;
        }
        else {
            return (<div style={{}}>
                <Nav.Link href="/suggestions" style={{ textAlign: "right", color: "#5a6f83", display: "inline",fontSize:"16px",fontWeight:"600" }} >Suggestions</Nav.Link>
                <Nav.Link href="/sharings" style={{ textAlign: "right", color: "#5a6f83", display: "inline",fontSize:"16px",fontWeight:"600"  }} >Sharings</Nav.Link>
                <Nav.Link href="/logout" style={{ textAlign: "right", color: "#5a6f83", display: "inline",fontSize:"16px",fontWeight:"600"  }} >Logout</Nav.Link>
            </div>);
        }
    }
    returnNavMobile() {
        if (this.state.user === null) {
            return (<Nav.Link href="/login" style={{ textAlign: "right", color: "#5a6f83" }} >Login</Nav.Link>);
        }
        else if (this.state.user === "") {
            return null;
        }
        else {
            return (<div style={{}}>
                <Nav.Link href="/suggestions" style={{ textAlign: "right", color: "#5a6f83", display: "inline" }} >Suggestions</Nav.Link>
                <Nav.Link href="/sharings" style={{ textAlign: "right", color: "#5a6f83", display: "inline" }} >Sharings</Nav.Link>
                <Nav.Link href="/logout" style={{ textAlign: "right", color: "#5a6f83", display: "inline" }} >Logout</Nav.Link>
            </div>);
        }
    }
    render() {
        return (
            <div>
                <div>
                <Desktop>
                    <Navbar id="nav-bar"  >
                        <Navbar.Brand href="/" style={{ color: "#5a6f83" }}><h2 style={{ color: "#5a6f83",fontSize:"35px" }}>Find Appy</h2></Navbar.Brand>
                        <Nav className="ml-auto" >
                            {this.returnNav()}
                        </Nav>
                    </Navbar>
                </Desktop>
                </div>
                <div>
                <Tablet>
                    <Navbar id="nav-bar"  >
                        <Navbar.Brand href="/" style={{ color: "#5a6f83" }}><h2 style={{ color: "#5a6f83",fontSize:"35px" }}>Find Appy</h2></Navbar.Brand>
                        <Nav className="ml-auto" >
                            {this.returnNav()}
                        </Nav>
                    </Navbar>
                </Tablet>
                </div>
                <div >
                <Mobile>
                    <Navbar id="nav-bar-mb"  >
                        <Navbar.Brand href="/" style={{ color: "#5a6f83" }}><h2 style={{ color: "#5a6f83",fontSize:"20px"}}>Find Appy</h2></Navbar.Brand>
                        <Nav className="ml-auto" >
                            {this.returnNavMobile()}
                        </Nav>
                    </Navbar>
                </Mobile>
                </div>
            </div>
        );
    }
}
export default NavigationBar;
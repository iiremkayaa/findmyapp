import React from 'react';
import { Navbar, Nav, Table } from 'react-bootstrap';
import * as firebase from "firebase";
import './NavBar.css';
import logo from '../assets/findappy-logoo.png';
import { useMediaQuery } from 'react-responsive';
import { slide as Menu } from 'react-burger-menu'

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
            return (<Nav.Link href="/login" style={{ textAlign: "right", color: "white",fontSize:"16px",fontWeight:"600"  }} >Login</Nav.Link>);
        }
        else if (this.state.user === "") {
            return null;
        }
        else {
            return (<div style={{}}>
                <Nav.Link href="/suggestions" style={{ textAlign: "right", color: "white", display: "inline",fontSize:"16px",fontWeight:"600" }} >Suggestions</Nav.Link>
                <Nav.Link href="/sharings" style={{ textAlign: "right", color: "white", display: "inline",fontSize:"16px",fontWeight:"600"  }} >Sharings</Nav.Link>
                <Nav.Link href="/logout" style={{ textAlign: "right", color: "white", display: "inline",fontSize:"16px",fontWeight:"600"  }} >Logout</Nav.Link>
            </div>);
        }
    }
    returnNavMobile() {
        if (this.state.user === null) {
            return (
                <div style={{ width: window.innerWidth }} className="navbar-mobile" >
                    <a href="/" className="headings" style={{ color: 'white', textDecoration: "none", fontSize: 25, fontWeight: 600, alignContent: "center" }} >FindAppy</a>
                    <div style={{ width: window.innerWidth * 0.2 }}>
                        <Menu width={200} right >
                            <a className="menu-item" style={{ fontSize: 18, fontWeight: "400", color: "white" }} id="login" href="/login">Suggestions</a>
                            <a className="menu-item" style={{ fontSize: 18, fontWeight: "400", color: "white" }} id="login" href="/login">Sharings</a>
                            <a className="menu-item" style={{ fontSize: 18, fontWeight: "400", color: "white" }} id="login" href="/login">Login</a>
                        </Menu>
                    </div>
                </div>
            );
        }
        else if (this.state.user === "") {
            return null;
        }
        else {
            return (
                <div style={{ width: window.innerWidth }} className="navbar-mobile" >
                    <a href="/" className="headings" style={{ color: 'white', textDecoration: "none", fontSize: 25, fontWeight: 600, alignContent: "center" }} >FindAppy</a>
                    <div style={{ width: window.innerWidth * 0.2 }}>
                        <Menu width={200} right >
                            <a className="menu-item" style={{ fontSize: 18, fontWeight: "400", color: "white" }} id="suggestions" href="/suggestions">Suggestions</a>
                            <a className="menu-item" style={{ fontSize: 18, fontWeight: "400", color: "white" }} id="sharings" href="/sharings">Sharings</a>
                            <a className="menu-item" style={{ fontSize: 18, fontWeight: "400", color: "white" }} id="logout" href="/logout">Logout</a>
                        </Menu>
                    </div>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
               
                <Desktop>
                <div>
                    <Navbar id="nav-bar"  >
                        <Navbar.Brand href="/" style={{  }}><h2 style={{ color: "white",fontSize:"35px" }}>Find Appy</h2></Navbar.Brand>
                        <Nav className="ml-auto" >
                            {this.returnNav()}
                        </Nav>
                    </Navbar>
                    </div>
                </Desktop>
                <Tablet>
                <div>
                    <Navbar id="nav-bar"  >
                        <Navbar.Brand href="/" style={{ }}><h2 style={{ color: "white",fontSize:"35px" }}>Find Appy</h2></Navbar.Brand>
                        <Nav className="ml-auto" >
                            {this.returnNav()}
                        </Nav>
                    </Navbar>
                    </div>
                </Tablet>
                <Mobile style={{width: window.innerWidth }}>
                <div style={{marginTop:"60px"}}>
                            {this.returnNavMobile()}
                            </div>
                </Mobile>
                
            </div>
        );
    }
}
export default NavigationBar;
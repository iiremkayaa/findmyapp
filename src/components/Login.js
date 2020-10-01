import React, { useState, } from 'react';
import Form from 'react-bootstrap/Form';
import * as firebase from "firebase";
import { MDBIcon } from "mdbreact";
import './Login.css';
import { Redirect } from 'react-router-dom';
import Page from 'react-page-loading'
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
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [charControl, setCharControl] = useState(false);
    const [passControl, setPassControl] = useState(false);
    const [inCorrectUser, setInCorrectUser] = useState(false);

    const submit = (event) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/invalid-email" || errorCode === "auth/wrong-password") {
                setInCorrectUser(true);
            }
            else {
                setInCorrectUser(false);
            }
        });
        firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser !== null) {
                props.history.push(`/`);
            }
        })
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
        if ((event.target.value.length > 0) && (event.target.value.length < 5)) {
            setCharControl(true);
        }
        else {
            setCharControl(false);
        }
        if (confirmPassword !== event.target.value) {
            setPassControl(true);
        }
        if (confirmPassword === event.target.value) {
            setPassControl(false);
        }
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    const renderRedirect = () => {
        props.history.push(`/signup`)
        /*if (this.state.redirect) {
          return <Redirect to='/target' />
        }*/
    }
    return (
        <div >
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Desktop>
                    <div style={{ marginLeft: "30%", marginRight: "30%", backgroundColor: "#3e414d", marginTop: "5%", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)" }}>
                        <div style={{ paddingBottom: "0px" }}>
                            <h2 id="login-top" ><MDBIcon icon="user-circle" style={{ fontSize: "100px" }} /></h2>
                        </div>
                        <Form style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                            <div style={{ display: "table", width: "85%", marginTop: "30px" }} >
                                <div style={{ display: "table-cell", textAlign: "center", paddingLeft: "5px", paddingRight: "5px" }} ><MDBIcon icon="user" style={{ color: "white", fontSize: "35px" }} /></div>
                                <Form.Control style={{ display: "table-cell", height: "35px" }} type="text" placeholder="Email" onChange={handleEmail} />
                            </div>
                            <div style={{ display: "table", width: "85%", marginTop: "30px" }} >
                                <div style={{ display: "table-cell", textAlign: "center", paddingLeft: "5px", paddingRight: "5px" }}><MDBIcon icon="lock" style={{ color: "white", fontSize: "35px" }} /></div>
                                <Form.Control style={{ display: "table-cell" }} type="password" placeholder="Password" onChange={handlePassword} />

                            </div>
                            <div style={{ width: "100%", marginTop: "20px" }}>
                                {inCorrectUser && <Form.Text id="message">
                                    Username or password is incorrect.
                        </Form.Text>}
                            </div>
                            <div style={{ textAlign: "center", width: "100%", marginTop: "30px" }}>
                                <button id="sign-in" type="submit" onClick={event => submit(event)} >
                                    SIGN IN
                        </button>
                            </div>
                        </Form>
                        <div style={{ textAlign: "center", paddingTop: "15px" }}>
                            <h2 id="no-account" >Don't have an account?</h2>
                            <button type="button" onClick={renderRedirect} style={{ display: "inline", fontWeight: "450", fontSize: "16px", border: "none", color: "white", backgroundColor: "#3e414d" }}>
                                Sign up here
                    </button>
                        </div>
                    </div>
                </Desktop>
            </Page>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Tablet>
                    <div style={{ marginLeft: "30%", marginRight: "30%", backgroundColor: "#3e414d", marginTop: "5%", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)" }}>
                        <div style={{ paddingBottom: "0px" }}>
                            <h2 id="login-top" ><MDBIcon icon="user-circle" style={{ fontSize: "100px" }} /></h2>
                        </div>
                        <Form style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                            <div style={{ display: "table", width: "85%", marginTop: "30px" }} >
                                <div style={{ display: "table-cell", textAlign: "center", paddingLeft: "5px", paddingRight: "5px" }} ><MDBIcon icon="user" style={{ color: "white", fontSize: "35px" }} /></div>
                                <Form.Control style={{ display: "table-cell", height: "35px" }} type="text" placeholder="Email" onChange={handleEmail} />
                            </div>
                            <div style={{ display: "table", width: "85%", marginTop: "30px" }} >
                                <div style={{ display: "table-cell", textAlign: "center", paddingLeft: "5px", paddingRight: "5px" }}><MDBIcon icon="lock" style={{ color: "white", fontSize: "35px" }} /></div>
                                <Form.Control style={{ display: "table-cell" }} type="password" placeholder="Password" onChange={handlePassword} />

                            </div>
                            <div style={{ width: "100%", marginTop: "20px" }}>
                                {inCorrectUser && <Form.Text id="message">
                                    Username or password is incorrect.
                        </Form.Text>}
                            </div>
                            <div style={{ textAlign: "center", width: "100%", marginTop: "30px" }}>
                                <button id="sign-in" type="submit" onClick={event => submit(event)} >
                                    SIGN IN
                        </button>
                            </div>
                        </Form>
                        <div style={{ textAlign: "center", paddingTop: "15px" }}>
                            <h2 id="no-account" >Don't have an account?</h2>
                            <button type="button" onClick={renderRedirect} style={{ display: "inline", fontWeight: "450", fontSize: "16px", border: "none", color: "white", backgroundColor: "#3e414d" }}>
                                Sign up here
                    </button>
                        </div>
                    </div>
                </Tablet>
            </Page>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Mobile>
                    <div style={{ marginLeft: "25px", marginRight: "25px", backgroundColor: "#3e414d", marginTop: "5%", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)" }}>
                        <div style={{ paddingBottom: "0px" }}>
                            <h2 id="login-top" ><MDBIcon icon="user-circle" style={{ fontSize: "75px" }} /></h2>
                        </div>
                        <Form style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                            <div style={{ display: "table", width: "85%", marginTop: "30px" }} >
                                <div style={{ display: "table-cell", textAlign: "center", paddingLeft: "5px", paddingRight: "5px" }} ><MDBIcon icon="user" style={{ color: "white", fontSize: "25px" }} /></div>
                                <Form.Control style={{ display: "table-cell", height: "25px" }} type="text" placeholder="Email" onChange={handleEmail} />
                            </div>
                            <div style={{ display: "table", width: "85%", marginTop: "30px" }} >
                                <div style={{ display: "table-cell", textAlign: "center", paddingLeft: "5px", paddingRight: "5px" }}><MDBIcon icon="lock" style={{ color: "white", fontSize: "25px" }} /></div>
                                <Form.Control style={{ display: "table-cell", height: "25px" }} type="password" placeholder="Password" onChange={handlePassword} />

                            </div>
                            <div style={{ width: "100%", marginTop: "10px" }}>
                                {inCorrectUser && <Form.Text id="message-mb">
                                    Username or password is incorrect.
                        </Form.Text>}
                            </div>
                            <div style={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
                                <button id="sign-in-mb" type="submit" onClick={event => submit(event)} >
                                    SIGN IN
                        </button>
                            </div>
                        </Form>
                        <div style={{ textAlign: "center", paddingTop: "15px" }}>
                            <h2 id="no-account-mb" >Don't have an account?</h2>
                            <button type="button" onClick={renderRedirect} style={{ display: "inline", fontWeight: "450", fontSize: "16px", border: "none", color: "white", backgroundColor: "#3e414d" }}>
                                Sign up here
                    </button>
                        </div>
                    </div>
                </Mobile>
            </Page>
        </div>
    );
}

export default Login;

import React, { useState, } from 'react';
import Form from 'react-bootstrap/Form';

import * as firebase from "firebase";
import { MDBIcon } from "mdbreact";
import { db } from '../firebase/index';
import './Register.css';
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
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [charControl, setCharControl] = useState(false);
    const [passControl, setPassControl] = useState(false);
    const [isExistUsername, setIsExistUsername] = useState(false);
    const [isExistMail, setIsExistMail] = useState(false);

    async function returnedIsExistUsername() {
        let flag = false;
        var dbFunc = await db.ref('/user').once('value', querySnapShot => {
            let values = [];
            querySnapShot.forEach((child) => {
                if (child.val().username === username) {
                    flag = true;
                }

            });
        });
        return flag;
    }
    async function returnedIsExistMail() {
        let flag = false;
        var dbFunc = await db.ref('/user').once('value', querySnapShot => {
            let values = [];
            querySnapShot.forEach((child) => {
                if (child.val().email === email) {
                    flag = true;
                }

            });
        });
        return flag;
    }
    const submit = async (event) => {
        console.log(email);
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            sharings: [],
            comments: [],
        }

        /*const dbFunc=await db.ref('/user').once('value', querySnapShot => {
            let values = [];
			querySnapShot.forEach((child) => {
                if( child.val().username===username ||child.val().email===email ){
                    setIsExist(true);
                }
               
			});
        });*/
        if (await returnedIsExistMail() === true) {
            setIsExistMail(true);
        }
        
        if (await returnedIsExistUsername() === true) {
            setIsExistUsername(true);
        }
        
        if (await returnedIsExistUsername() === false && await returnedIsExistMail() === false) {
            console.log("asaaa");
            db.ref('/user').push(data);
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                //var errorCode = error.code;
                //var errorMessage = error.message;

            });
            firebase.auth().onAuthStateChanged((authUser) => {
                if (authUser !== null) {
                    props.history.push(`/`);
                }
            })
        }


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
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
        if (password !== event.target.value) {
            setPassControl(true);
        }
        if (password === event.target.value) {
            setPassControl(false);
        }
    }
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    return (
        <div  >
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Desktop>
                <div style={{ marginLeft: "20%", marginRight: "20%", boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)", marginTop: "30px", marginBottom: "30px", paddingTop: "30px", paddingBottom: "30px" }}>
                    <div style={{ paddingLeft: "15%", paddingRight: "15%" }}>
                        <h2 style={{ textAlign: "center", color: "rgb(78, 85, 129)" }}><MDBIcon icon="users" style={{ fontSize: "100px" }} /></h2>
                    </div>
                    <Form style={{ paddingLeft: "15%", paddingRight: "15%" }}>
                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }} >Username:</Form.Label>
                            <Form.Control style={{}} type="text" placeholder="" onChange={handleUsername} />
                        </div>

                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Email:</Form.Label>
                            <Form.Control style={{}} type="email" placeholder="" onChange={handleEmail} />

                        </div>

                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Password:</Form.Label>
                            <Form.Control style={{}} type="password" placeholder="" onChange={handlePassword} />
                            {charControl && <Form.Text id="register-message">
                                The password field must be at least 5 characters.
                        </Form.Text>}
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Confirm Password:</Form.Label>
                            <Form.Control style={{}} type="password" placeholder="" onChange={handleConfirmPassword} />
                            {passControl && <Form.Text id="register-message">
                                The password must match confirm password.
                        </Form.Text>}
                        </div>
                        <div style={{ textAlign: "center", width: "100%", marginTop: "30px" }}>
                            <button type="submit" id="sign-up" onClick={event => submit(event)} >
                                SIGN UP
                    </button>
                        </div>
                    </Form>
                    <div style={{ width: "100%", marginTop: "10px" }}>
                        {isExistMail && <Form.Text id="message">
                            Email is already taken.
                        </Form.Text>}
                        {isExistUsername && <Form.Text id="message">
                            Username  is already taken.
                        </Form.Text>}
                    </div>
                </div>
                </Desktop>
            </Page>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Tablet>
                <div style={{ marginLeft: "20%", marginRight: "20%", boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)", marginTop: "30px", marginBottom: "30px", paddingTop: "30px", paddingBottom: "30px" }}>
                    <div style={{ paddingLeft: "15%", paddingRight: "15%" }}>
                        <h2 style={{ textAlign: "center", color: "rgb(78, 85, 129)" }}><MDBIcon icon="users" style={{ fontSize: "100px" }} /></h2>
                    </div>
                    <Form style={{ paddingLeft: "15%", paddingRight: "15%" }}>
                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }} >Username:</Form.Label>
                            <Form.Control style={{}} type="text" placeholder="" onChange={handleUsername} />
                        </div>

                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Email:</Form.Label>
                            <Form.Control style={{}} type="email" placeholder="" onChange={handleEmail} />

                        </div>

                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Password:</Form.Label>
                            <Form.Control style={{}} type="password" placeholder="" onChange={handlePassword} />
                            {charControl && <Form.Text id="register-message">
                                The password field must be at least 5 characters.
                        </Form.Text>}
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Confirm Password:</Form.Label>
                            <Form.Control style={{}} type="password" placeholder="" onChange={handleConfirmPassword} />
                            {passControl && <Form.Text id="register-message">
                                The password must match confirm password.
                        </Form.Text>}
                        </div>
                        <div style={{ textAlign: "center", width: "100%", marginTop: "30px" }}>
                            <button type="submit" id="sign-up" onClick={event => submit(event)} >
                                SIGN UP
                    </button>
                        </div>
                    </Form>
                    <div style={{ width: "100%", marginTop: "10px" }}>
                        {isExistMail && <Form.Text id="message">
                            Email is already taken.
                        </Form.Text>}
                        {isExistUsername && <Form.Text id="message">
                            Username  is already taken.
                        </Form.Text>}
                    </div>
                </div>
                </Tablet>
            </Page>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Mobile>
                <div style={{ marginLeft: "25px", marginRight: "25px", boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)", marginTop: "30px", marginBottom: "30px", paddingTop: "30px", paddingBottom: "30px" }}>
                    <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                        <h2 style={{ textAlign: "center", color: "rgb(78, 85, 129)" }}><MDBIcon icon="users" style={{ fontSize: "75px" }} /></h2>
                    </div>
                    <Form style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "rgb(78, 85, 129)", fontWeight: "500", fontSize: "16px" }} >Username:</Form.Label>
                            <Form.Control style={{height: "25px"}} type="text" placeholder="" onChange={handleUsername} />
                        </div>

                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "rgb(78, 85, 129)", fontWeight: "500", fontSize: "16px" }}>Email:</Form.Label>
                            <Form.Control style={{height: "25px"}} type="email" placeholder="" onChange={handleEmail} />

                        </div>

                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "rgb(78, 85, 129)", fontWeight: "500", fontSize: "16px" }}>Password:</Form.Label>
                            <Form.Control style={{height: "25px"}} type="password" placeholder="" onChange={handlePassword} />
                            {charControl && <Form.Text id="register-message">
                                The password field must be at least 5 characters.
                        </Form.Text>}
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                            <Form.Label style={{ color: "rgb(78, 85, 129)", fontWeight: "500", fontSize: "16px" }}>Confirm Password:</Form.Label>
                            <Form.Control style={{height: "25px"}} type="password" placeholder="" onChange={handleConfirmPassword} />
                            {passControl && <Form.Text id="register-message">
                                The password must match confirm password.
                        </Form.Text>}
                        </div>
                        <div style={{ width: "100%", marginTop: "10px" }}>
                        {isExistMail && <Form.Text id="message">
                            Email is already taken.
                        </Form.Text>}
                        {isExistUsername && <Form.Text id="message">
                            Username  is already taken.
                        </Form.Text>}
                    </div>
                        <div style={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
                            <button type="submit" id="sign-up-mb" onClick={event => submit(event)} >
                                SIGN UP
                    </button>
                        </div>
                    </Form>
                    
                </div>
                </Mobile>
            </Page>
        </div>
    );
}

export default Register;

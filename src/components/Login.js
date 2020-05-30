import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Sharing from './Sharing';
import SharingList from './SharingList';
import * as firebase from "firebase";
import { MDBIcon } from "mdbreact";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [charControl, setCharControl] = useState(false);
    const [passControl, setPassControl] = useState(false);
    const submit = (event) => {
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
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
        <div >
            <div style={{paddingLeft:"15px",paddingRight:"15px", backgroundColor: "white" }}>
                <div style={{ paddingTop:"30px",paddingBottom:"0px"}}>
                    <h2 style={{textAlign: "center", color:"rgb(67,152,232)"}}><MDBIcon icon="user-circle"  style={{ color: "rgb(67,152,232)",fontSize:"100px" }} /></h2>
                </div>
                <Form style={{  paddingLeft: "30%", paddingRight: "30%" }}>
                    <div style={{ display: "table", width: "85%", marginTop: "30px" }} >
                        <div style={{ display: "table-cell",textAlign:"center",paddingLeft:"5px",paddingRight:"5px"  }} ><MDBIcon icon="user"  style={{ color: "rgb(67,152,232)",fontSize:"35px" }} /></div>
                        <Form.Control style={{ display: "table-cell",height:"35px"}} type="text" placeholder="Email or username" onChange={handleUsername} />
                    </div>
                    <div style={{ display: "table", width: "85%", marginTop: "30px" }} >
                        <div style={{ display: "table-cell",textAlign:"center",paddingLeft:"5px",paddingRight:"5px" }}><MDBIcon icon="lock"  style={{ color: "rgb(67,152,232)",fontSize:"35px" }} /></div>
                        <Form.Control style={{ display: "table-cell"}} type="password" placeholder="Password" onChange={handlePassword} />
                    </div>

                    <div style={{ textAlign: "center", width: "100%", marginTop: "30px" }}>
                        <button  type="submit" onClick={submit} style={{fontSize:"15px",borderRadius:"8px", color:"white",backgroundColor: "rgb(67,152,232)",padding:"5px",paddingLeft:"40px",paddingRight:"40px"}}>
                            SIGN IN
                        </button>
                    </div>
                </Form>

            </div>
        </div>
    );
}

export default Login;

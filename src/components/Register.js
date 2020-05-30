import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Sharing from './Sharing';
import SharingList from './SharingList';
import * as firebase from "firebase";
import { MDBIcon } from "mdbreact";

const Register = () => {
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
            <div style={{ paddingLeft: "15px", paddingRight: "15px", backgroundColor: "white" }}>
                <div style={{ paddingTop: "30px", paddingBottom: "0px",paddingLeft: "30%", paddingRight: "30%" }}>
                    <h2 style={{ textAlign: "center", color: "rgb(67,152,232)" }}><MDBIcon icon="users" style={{ color: "rgb(67,152,232)", fontSize: "100px" }} /></h2>
                </div>
                <Form style={{ paddingLeft: "30%", paddingRight: "30%" }}>
                    <div style={{marginTop:"10px",marginBottom:"10px"}} >
                        <Form.Label style={{  color: "rgb(67,152,232)",fontWeight:"500",fontSize:"20px"}} >Username:</Form.Label>
                        <Form.Control style={{}} type="text" placeholder="" onChange={handleUsername} />
                    </div>

                    <div style={{marginTop:"10px",marginBottom:"10px"}} >
                        <Form.Label style={{ color: "rgb(67,152,232)" ,fontWeight:"500",fontSize:"20px"}}>Email:</Form.Label>
                        <Form.Control style={{ }} type="email" placeholder="" onChange={handleEmail} />
                        
                    </div>

                    <div style={{marginTop:"10px",marginBottom:"10px"}} >
                        <Form.Label style={{  color: "rgb(67,152,232)",fontWeight:"500",fontSize:"20px" }}>Password:</Form.Label>
                        <Form.Control style={{ }} type="password" placeholder="" onChange={handlePassword} />
                        {charControl && <Form.Text style={{ color: "red" }}>
                            The password field must be at least 5 characters.
                        </Form.Text>}
                    </div>
                    <div style={{marginTop:"10px",marginBottom:"10px"}} >
                        <Form.Label style={{ color: "rgb(67,152,232)" ,fontWeight:"500",fontSize:"20px"}}>Confirm Password:</Form.Label>
                        <Form.Control style={{ }} type="password" placeholder="" onChange={handleConfirmPassword} />
                        {passControl && <Form.Text style={{ color: "red" }}>
                            The password must match confirm password.
                        </Form.Text>}
                    </div>
                    <div style={{ textAlign: "center", width: "100%", marginTop: "30px" }}>
                    <button  type="submit" onClick={submit} style={{fontWeight:"400",fontSize:"18px",borderRadius:"8px", color:"white",backgroundColor: "rgb(67,152,232)",padding:"5px",paddingLeft:"40px",paddingRight:"40px"}}>
                            LOGIN
                    </button>
                    </div>
                </Form>

            </div>
        </div>
    );
}

export default Register;

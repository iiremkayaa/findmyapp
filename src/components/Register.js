import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Sharing from './Sharing';
import SharingList from './SharingList';
import * as firebase from "firebase";
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
            <div style={{ margin: "20%", marginTop: "30px", marginBottom: "10px" }}>
                
                <Form>
                    <Form.Group style={{display:"table",width:"100%"}} >
                        <Form.Label style={{display:"table-cell",width:"15%"}} >Username</Form.Label>
                        <Form.Control style={{display:"table-cell",width:"85%"}} type="text" placeholder="" onChange={handleUsername} />
                    </Form.Group>

                    <Form.Group  style={{display:"table",width:"100%"}}>
                        <Form.Label style={{display:"table-cell",width:"15%"}}>Email address</Form.Label>
                        <Form.Control style={{display:"table-cell",width:"85%"}} type="email" placeholder="" onChange={handleEmail} />
                        <Form.Text style={{ color: "white" }}>
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group  style={{display:"table",width:"100%"}} >
                        <Form.Label style={{display:"table-cell",width:"15%"}}>Password</Form.Label>
                        <Form.Control style={{display:"table-cell",width:"85%"}} type="password" placeholder="" onChange={handlePassword} />
                        {charControl && <Form.Text style={{ color: "red" }}>
                            The password field must be at least 5 characters.
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group  style={{display:"table",width:"100%"}} >
                        <Form.Label style={{display:"table-cell",width:"15%"}}>Confirm Password</Form.Label>
                        <Form.Control style={{display:"table-cell",width:"85%"}} type="password" placeholder="" onChange={handleConfirmPassword} />
                        {passControl && <Form.Text style={{ color: "red" }}>
                            The password must match confirm password.
                        </Form.Text>}
                    </Form.Group>
                    <div style={{ textAlign: "center",width:"100%" }}>
                        <Button variant="link" type="submit" onClick={submit} style={{ color: "white" }}>
                            Sign Up
                    </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
}

export default Register;

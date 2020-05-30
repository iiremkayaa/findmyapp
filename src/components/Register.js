import React,{useState,useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Sharing from './Sharing';
import SharingList from './SharingList';
import * as firebase from "firebase";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username,setUsername]=useState("");
    const submit= (event)=>{
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    }
    const handleEmail =(event)=>{
        setEmail(event.target.value);
    }
    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }
    const handleConfirmPassword = (event)=>{
        setPassword(event.target.value);
    }
    const handleUsername =(event)=>{
        setUsername(event.target.value);
    }
    return (
        <div >
            <div style={{ margin: "20%", marginTop: "30px", marginBottom: "10px" }}>
                <Form>
                <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={handleUsername} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="" onChange={handleEmail} />
                        <Form.Text  style={{color:"white"}}>
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="" onChange={handlePassword} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="" onChange={handleConfirmPassword} />
                    </Form.Group>
                    <div  style={{textAlign:"center"}}>
                    <Button variant="primary" type="submit" onClick={submit}>
                        Submit
                    </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
}

export default Register;

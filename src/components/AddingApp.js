import React, { useState, } from 'react';
import Form from 'react-bootstrap/Form';
import * as firebase from "firebase";
import { MDBIcon } from "mdbreact";
import { Redirect } from 'react-router-dom'
import logo from '../assets/findappy-logo.png';

const AddingApp = () => {
    const [appName,setAppName]=useState("");
    const [appDesc, setAppDesc] = useState("");
	const [appPayment, setAppPayment] = useState('');
	const [appStore, setAppStore] = useState('');
	const [appLink, setAppLink] = useState('');

    const shareApp = () => {

    }
    const handlePayment =(event)=>{
        setAppPayment(event.target.value);

    }
    const handleStore = (event)=>{
        setAppStore(event.target.value);
    }
    const handleName =(event)=>{
        setAppName(event.target.value);
    }
    const handleDesc = (event)=>{
        setAppDesc(event.target.value);
    }
    const handleLink =(event)=>{
        setAppLink(event.target.value);
    }
   
    return (
        <div >
            <div style={{ marginLeft: "15%", marginRight: "15%", backgroundColor: "white", marginTop: "30px", marginBottom: "30px", paddingTop: "30px", paddingBottom: "30px" }}>
                <div style={{ paddingLeft: "15%", paddingRight: "15%", height: "100%",textAlign:"center"}}>
                    <img src={logo} height={200} width={200} />
                </div>
                <Form style={{ paddingLeft: "15%", paddingRight: "15%", height: "100%" }}>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "20px" }} >Application Name:</Form.Label>
                        <Form.Control style={{}} type="text" placeholder="" onChange={handleName} />
                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "20px" }}>Application Description:</Form.Label>
                        <Form.Control required as="textarea" rows="3" placeholder="" onChange={handleDesc} />
                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "20px" }}>Application Store:</Form.Label>
                        <Form.Control as="select"  onChange={handleStore}>
                            <option value="App Store">App Store</option>
                            <option value="Google Play">Google Play</option>
                        </Form.Control>

                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "20px" }}>Payment:</Form.Label>
                        <Form.Control as="select" onChange={handlePayment}>
                            <option value="Free">Free</option>
                            <option value="Paid">Paid</option>
                        </Form.Control>

                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "20px" }} >Application Link:</Form.Label>
                        <Form.Control style={{}} type="text" placeholder="" onChange={handleLink} />
                    </div>
                    <div style={{ textAlign: "center", width: "100%", marginTop: "30px" }}>
                        <button type="submit" onClick={{}} style={{ fontWeight: "500", fontSize: "20px", borderRadius: "8px", color: "white", backgroundColor: "#3a5a69", padding: "5px", paddingLeft: "20px", paddingRight: "20px" }}>
                            SIGN UP
                    </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddingApp;

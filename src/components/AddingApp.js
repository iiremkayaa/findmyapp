import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import * as firebase from "firebase";
import { MDBIcon } from "mdbreact";
import { Redirect } from 'react-router-dom'
import logo from '../assets/findappy-logo.png';
import { db } from '../firebase/index';

const AddingApp = () => {
    const [appName,setAppName]=useState("");
    const [appDesc, setAppDesc] = useState("");
	const [appPayment, setAppPayment] = useState('');
	const [appStore, setAppStore] = useState('');
    const [appLink, setAppLink] = useState('');
    const [user, setUser] = useState("");

    const convertDateFormatToPost = (date) => {
		let day = date.split("-")[2].length === 1 ? "0" + date.split("-")[2].length : date.split("-")[2].length;
		let month = date.split("-")[1].length === 1 ? "0" + date.split("-")[1].length : date.split("-")[1];
		let year = date.split("-")[0];
		return (day + '.' + month + '.' + year);
    }
    useEffect(() => {
		firebase.auth().onAuthStateChanged((authUser) => {
			if (authUser) {
				db.ref('/user').on('value', querySnapShot => {
					querySnapShot.forEach((child) => {
						if (child.val().email == authUser.email) {
							setUser(child.val().username);
						}
					});
				});
			}
			else {
				setUser("");
			}
		})
	}, []);
    const shareApp = (event) => {
        event.preventDefault();
        
        console.log(user);
        if(user!==""){
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes();
            const data={
                description:appDesc,
                link:appLink,
                name: appName,
                payment:appPayment,
                store:appStore,
                date:convertDateFormatToPost(date),
                time:time,
                user:user,
                //userId:,
            }
            db.ref('/app').push(data);
        }
        else{
            console.log("giris yapınız");
        }
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
            <div style={{ marginLeft: "25%", marginRight: "25%", backgroundColor: "white", marginTop: "30px", marginBottom: "30px", paddingTop: "30px", paddingBottom: "30px",boxShadow:"0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)" }}>
                <div style={{ paddingLeft: "15%", paddingRight: "15%", height: "100%",textAlign:"center"}}>
                    <img src={logo} height={200} width={200} />
                </div>
                <Form style={{ paddingLeft: "15%", paddingRight: "15%", height: "100%" }}>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }} >Application Name:</Form.Label>
                        <Form.Control style={{}} type="text" placeholder="" onChange={handleName} />
                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Application Description:</Form.Label>
                        <Form.Control required as="textarea" rows="3" placeholder="" onChange={handleDesc} />
                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Application Store:</Form.Label>
                        <Form.Control as="select"  onChange={handleStore}>
                            <option value="App Store">App Store</option>
                            <option value="Google Play">Google Play</option>
                        </Form.Control>

                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Payment:</Form.Label>
                        <Form.Control as="select" onChange={handlePayment}>
                            <option value="Free">Free</option>
                            <option value="Paid">Paid</option>
                        </Form.Control>

                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }} >Application Link:</Form.Label>
                        <Form.Control style={{}} type="text" placeholder="" onChange={handleLink} />
                    </div>
                    <div style={{ textAlign: "center", width: "100%", marginTop: "30px" }}>
                        <button type="submit" onClick={shareApp} style={{ fontWeight: "400", fontSize: "16px", borderRadius: "5px",borderWidth:1, color: "white", backgroundColor: "rgb(78, 85, 129)", padding: "3px", paddingLeft: "30px", paddingRight: "30px" }}>
                            SHARE
                    </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddingApp;

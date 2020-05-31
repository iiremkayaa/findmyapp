import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db } from '../firebase/index';
import * as firebase from "firebase";

const Sharing = () => {

	const [description, setDescription] = useState('');
	const [username, setUsername] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [isAnon, setIsAnon] = useState(false);
	useEffect(() => {
		firebase.auth().onAuthStateChanged(userAuth => {
			db.ref('/user').on('value', querySnapShot => {
				let values = [];
				querySnapShot.forEach((child) => {
					if(child.val().email === userAuth.email){
						setUsername(child.val().username);
					}
				});
			});
		});
		
	}, []);
	const onSwitchSharing = () => {
		setIsAnon(!isAnon);
	};
	const convertDateFormatToPost = (date) => {
		let day=date.split("-")[2];
		let month=date.split("-")[1];
		let year=date.split("-")[0];
        return (day + '.' + month + '.' + year);
    }
	const submitSharing = (event) => {
		event.preventDefault();
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes();
		const data={
			user:username,
			description:description,
			date: convertDateFormatToPost(date), //todo:date will be added
			time:time,
			isAnon:isAnon
		}
		db.ref('/sharing').push(data);
		setIsAnon(false);
		setDescription("");
	}
	const sharingChange = (event) => {
		setDescription(event.target.value);
	}
	
	
	return (
		<div style={{ padding: "30px",borderRadius:"5px",borderColor:"white",border:"solid",borderWidth:"1px",backgroundColor:"#6F90AF"}} >
			<Form style={{textAlign:"center"}}>
				<Form.Group style={{ paddingLeft: "40px", paddingRight: "40px",textAlign:"center" }}>
					<Form.Label style={{fontSize:"20px",padding:"5px"}}>Please provide information of application you are looking for... </Form.Label>
					<Form.Control required as="textarea" rows="3" value={description} onChange={sharingChange} />
				</Form.Group>
				<Form.Group style={{textAlign:"center"}}>
					<Form.Check id="custom-switch" type="switch" onChange={onSwitchSharing} label="Anonymous" style={{ paddingTop: "10px", paddingBottom: "10px",fontSize:"18px" }} />
				</Form.Group>
				<button  type="submit" onClick={event=>submitSharing(event)} style={{fontWeight:"400",fontSize:"18px",borderRadius:"8px", color:"white",backgroundColor: "#6F90AF",padding:"5px",paddingLeft:"25px",paddingRight:"25px"}}>
                            SEND
                </button>
				
			</Form>
			
		</div>
	);

}
export default Sharing;
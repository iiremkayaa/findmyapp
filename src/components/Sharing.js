import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db } from '../firebase/index';

const Sharing = () => {

	const [description, setDescription] = useState('');
	const [userId, setUserId] = useState(1);
	const [isAnon, setIsAnon] = useState(false);

	const onSwitchSharing = () => {
		setIsAnon(!isAnon);
	};
	const convertDateFormatToPost = (date) => {
		console.log(date);
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
			user:isAnon? "":"userId",
			description:description,
			date: convertDateFormatToPost(date), //todo:date will be added
			time:time
		}
		db.ref('/sharing').push(data);
	}
	const sharingChange = (event) => {
		setDescription(event.target.value);
	}
	return (
		<div style={{ padding: "30px",borderRadius:"5px" }} className="bg-dark text-white">
			<Form style={{textAlign:"center"}}>
				<Form.Group style={{ paddingLeft: "40px", paddingRight: "40px",textAlign:"center" }}>
					<Form.Label style={{fontSize:"20px",padding:"5px"}}>Please provide information of application you are looking for... </Form.Label>
					<Form.Control required as="textarea" rows="3" value={description} onChange={sharingChange} />
				</Form.Group>
				<Form.Group style={{textAlign:"center"}}>
					<Form.Check id="custom-switch" type="switch" onChange={onSwitchSharing} label="Anonymous" style={{ paddingTop: "10px", paddingBottom: "10px",fontSize:"18px" }} />
				</Form.Group>
				<Button onClick={submitSharing} variant="secondary" className="btn  btn-lg" style={{padding:"14px",paddingTop:"2px",paddingBottom:"2px",fontSize:"20px" }}>Send</Button>
			</Form>
			
		</div>
	);

}
export default Sharing;
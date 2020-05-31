import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { db } from '../firebase/index';
import { MDBIcon } from "mdbreact";
import { Modal, Button, Form } from 'react-bootstrap';

const SharingList = () => {
	const [sharings, setSharings] = useState([]);

	const [selectedSharingId, setSelectedSharingId] = useState("");
	const [show, setShow] = useState(false);
	const [comment, setComment] = useState("");
	const [selectedComment, setSelectedComment] = useState("");
	const [commentMessage, setCommentMessage] = useState(false);
	useEffect(() => {
		db.ref('/sharing').on('value', querySnapShot => {
			let values = [];
			querySnapShot.forEach((child) => {
				values.push({ sharingId: child.ref.key, sharing: child.val() })
			});
			setSharings(values);
		});
	}, []);
	const makeSuggestion = (event, id) => {
		event.preventDefault();
		setSelectedSharingId(id);
		db.ref(`sharing/${id}`).on('value', querySnapShot => {
			console.log(querySnapShot.val());
			setSelectedComment(querySnapShot.val().description);
		});
		setShow(true);
	}
	const handleClose = () => {
		setShow(false);
	}
	const handleCommentChange = (event) => {
		setComment(event.target.value);

	}
	const convertDateFormatToPost = (date) => {
		let day = date.split("-")[2];
		let month = date.split("-")[1];
		let year = date.split("-")[0];
		return (day + '.' + month + '.' + year);
	}
	const sendCommentChange = (event) => {
		event.preventDefault();
		setCommentMessage(true);
		var today = new Date();
		var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		var time = today.getHours() + ":" + today.getMinutes();
		const data = {
			comment: comment,
			sharingId: selectedSharingId,
			date: convertDateFormatToPost(date), //todo:date will be added
			time: time
		}
		db.ref('/comment').push(data);
		setTimeout(function () {
			setCommentMessage(false);
			setShow(false);
			setSelectedSharingId("");
			setComment("");
		}, 3000);
	}
	const showPopUp = () => {
		return (
			<Modal show={show} onHide={handleClose} animation={true} centered backdrop={false} >
				<Modal.Header closeButton>
					<Modal.Title style={{ fontSize: "20px" }}>Sharing</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div style={{}}>
						<h2 style={{ fontSize: "15px", fontWeight: "400" }}>{selectedComment}</h2>
					</div>
					<Form style={{ marginTop: "20px", marginBottom: "20px"}}>
						<Form.Control  type="text" value={comment} placeholder="Enter your suggestion here" onChange={(event) => { handleCommentChange(event) }} />
					</Form>
					{commentMessage && <div style={{textAlign:"center" }}>
						<h2 style={{ fontSize: "15px", fontWeight: "400",color:"#6F90AF"}}>Your suggestion has been sent!</h2>
					</div>}
				</Modal.Body>
				<Modal.Footer>
					<button onClick={sendCommentChange} style={{ fontWeight: "400", fontSize: "18px", borderRadius: "8px", color: "white", backgroundColor: "#6F90AF", padding: "2px", paddingLeft: "15px", paddingRight: "15px" }}>
						SEND
                </button>

				</Modal.Footer>
			</Modal>);
	}
	return (
		<div style={{ marginTop: "15px" }} >
			{sharings.map((sharings, index) => (
				<div key={index} style={{ backgroundColor: "#6F90AF", borderRadius: "5px", borderColor: "white", border: "solid", marginTop: "5px", marginBottom: "5px", borderWidth: "1px" }}>
					{showPopUp()}
					<div style={{ marginTop: "0px", width: "100%" }}>
						<div style={{ width: "100%", display: "table" }} >
							<h1 style={{ fontSize: "20px", fontWeight: "100", display: "table-cell" }}>From: {sharings.sharing.user == "" ? "Anonymous" : sharings.sharing.user}</h1>
							<h1 style={{ fontSize: "20px", fontWeight: "100", display: "table-cell", textAlign: "right" }} >{sharings.sharing.date}</h1>
						</div>
					</div>
					<div style={{ marginTop: "10px", width: "100%" }}>
						<div style={{ width: "100%" }}>
							<h1 style={{ fontSize: "20px", fontWeight: "100", textAlign: "center" }}>{sharings.sharing.description}</h1>
						</div>
						<div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
							<button style={{ backgroundColor: "Transparent", border: "none" }} onClick={(event) => { makeSuggestion(event, sharings.sharingId) }}><MDBIcon icon="comment-dots" style={{ width: "25px", height: "25px", color: "white" }} /></button>
						</div>
					</div>
				</div>
			))}
		</div>
	);

}
export default SharingList;
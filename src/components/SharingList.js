import React, { useState, useEffect } from "react";
import { db } from '../firebase/index';
import { MDBIcon } from "mdbreact";
import { Modal, Form } from 'react-bootstrap';
import './SharingList.css';

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
			date: convertDateFormatToPost(date),
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
					<Modal.Title style={{ fontSize: "20px" }}></Modal.Title>
				</Modal.Header>
				<Modal.Body >
					<div style={{}}>
						<h2 style={{ fontSize: "15px", fontWeight: "400" }}>{selectedComment}</h2>
					</div>
					<Form style={{ marginTop: "20px", marginBottom: "20px" }}>
						<Form.Control type="text" value={comment} placeholder="Enter your suggestion here" onChange={(event) => { handleCommentChange(event) }} />
					</Form>
					{commentMessage && <div style={{ textAlign: "center" }}>
						<h2 style={{ fontSize: "15px", fontWeight: "400", color: "#6F90AF" }}>Your suggestion has been sent!</h2>
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
		<div id="sharings">
		<div  style={{ padding: "30px",paddingLeft:"150px",paddingRight:"150px"}} >
			{sharings.map((sharings, index) => (
				<div key={index} id="sharing" style={{  borderRadius: "5px", borderColor: "white", border: "solid", borderWidth: "1px", padding: "15px", paddingBottom: "0px",marginBottom:"5px" }}>
					{showPopUp()}
					<div style={{ marginTop: "0px", width: "100%" }}>
						<div style={{ width: "100%", display: "table" }} >
							<h1 style={{ fontSize: "20px", fontWeight: "500", display: "table-cell" }}>From: {sharings.sharing.isAnon === true ? "Anonymous" : sharings.sharing.user}</h1>
							<h1 style={{ fontSize: "20px", fontWeight: "500", display: "table-cell", textAlign: "right" }} >{sharings.sharing.date}</h1>
						</div>
					</div>
					<div style={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}>
						<div style={{ width: "100%" }}>
							<h1 style={{ fontSize: "20px", fontWeight: "500", textAlign: "center" }}>{sharings.sharing.description}</h1>
						</div>
					</div>
					<div style={{ width: "100%" }}>
						<div style={{ width: "100%", display: "inline-block" }}>

							<div style={{ display: "flex", float: "left"}}>
								<button style={{ backgroundColor: "Transparent", border: "none", display: "inline",padding:0 }} onClick={(event) => { makeSuggestion(event, sharings.sharingId) }}>
									<h2 style={{ fontSize: "18px", fontWeight: "500",color:"white" }}>Suggestions</h2>
								</button>
							</div>
							<div style={{ display: "flex", float: "right", margin: 0, padding: 0 }}>
								<div style={{ paddingRight: "15px" }}>
									<h2 style={{ fontSize: "18px", fontWeight: "450", marginLeft: "5px", display: "inline", marginRight: "5px" }}>{sharings.sharing.store}</h2>
									<div style={{ fontSize: "18px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px" }}></i></div>
								</div>
								<div style={{ paddingRight: "15px" }}>
									<h2 style={{ fontSize: "18px", fontWeight: "450", marginLeft: "5px", display: "inline", marginRight: "5px" }}>{sharings.sharing.payment}</h2>
									<div style={{ fontSize: "18px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px" }}></i></div>
								</div>
								<div>
									<button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { makeSuggestion(event, sharings.sharingId) }}><i class="far fa-comment " style={{ color: "white", fontSize: "20px" }}></i></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
		</div>
	);

}
export default SharingList;
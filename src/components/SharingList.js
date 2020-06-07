import React, { useState, useEffect } from "react";
import { db } from '../firebase/index';
import { MDBIcon } from "mdbreact";
import { Modal, Form } from 'react-bootstrap';
import './SharingList.css';
import * as firebase from "firebase";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

const SharingList = () => {
	const [sharings, setSharings] = useState([]);
	const [user, setUser] = useState("");
	const [selectedSharingId, setSelectedSharingId] = useState("");
	const [show, setShow] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [comment, setComment] = useState("");
	const [selectedComment, setSelectedComment] = useState("");
	const [selectedSharing, setSelectedSharing] = useState("");
	const [commentMessage, setCommentMessage] = useState(false);
	const [commentList, setCommentList] = useState([]);
	useEffect(() => {
		db.ref('/sharing').on('value', querySnapShot => {
			let values = [];
			querySnapShot.forEach((child) => {
				values.push({ sharingId: child.ref.key, sharing: child.val() })
			});
			setSharings(values);
		});
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
	const makeSuggestion = (event, id) => {
		event.preventDefault();
		setSelectedSharingId(id);
		db.ref(`sharing/${id}`).on('value', querySnapShot => {
			setSelectedSharing(querySnapShot.val().description);
		});
		setShow(true);
	}
	const showSuggestion = (event, id) => {
		event.preventDefault();
		setSelectedSharingId(id);
		db.ref(`sharing/${id}`).on('value', querySnapShot => {
			setSelectedSharing(querySnapShot.val().description);
		});
		db.ref(`comment/`).on('value', querySnapShot => {
			let comments = []
			querySnapShot.forEach((child) => {
				if (child.val().sharingId === id) {
					comments.push({ commentId: child.ref.key, comment: child.val() })

				}
			});
			setCommentList(comments);
		});
		setShowComments(true);
	}
	const handleClose = () => {
		setShow(false);
	}
	const handleCloseComments = () => {
		setShowComments(false);
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
			time: time,
			username: user
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
						<h2 style={{ fontSize: "20px", fontWeight: "500", }}>{selectedSharing}</h2>
					</div>
					<Form style={{ marginTop: "20px", marginBottom: "20px" }}>
						<Form.Control type="text" value={comment} placeholder="Enter your suggestion here" onChange={(event) => { handleCommentChange(event) }} />
					</Form>
					{commentMessage && <div style={{ textAlign: "center" }}>
						<h2 style={{ fontSize: "15px", fontWeight: "500", color: "#1a2631" }}>Your suggestion has been sent!</h2>
					</div>}
				</Modal.Body>
				<Modal.Footer>
					<button onClick={sendCommentChange} style={{ fontWeight: "500", fontSize: "20px", borderRadius: "8px", color: "white", backgroundColor: "#1a2631", padding: "2px", paddingLeft: "15px", paddingRight: "15px" }}>
						SEND
                </button>

				</Modal.Footer>
			</Modal>);
	}
	const convertDate = (date) => {
		return date;
	}
	const showCommentPopUp = () => {
		return (
			<Modal show={showComments} onHide={handleCloseComments} animation={true} centered backdrop={false} >
				<Modal.Header closeButton>
					<Modal.Title style={{ fontSize: "20px" }}>{selectedSharing}</Modal.Title>
				</Modal.Header>
				<Modal.Body >
					{commentList.map((comment, index) => (

						<div key={index} style={{ padding: "10px", }}>
							<div style={{ display: "inline-block", width: "100%", }}>
								<div style={{ display: "inline", float: "left" }}>
									<i class="far fa-user" style={{ width: "20px", height: "20px", color: "#1a2631" }}></i>
								</div>
								<div style={{ display: "inline", float: "left" }}>{comment.comment.username}</div>
								<div style={{ display: "inline", float: "right" }}>{convertDate(comment.comment.date)}</div>
							</div>
							<div >
								<div>{comment.comment.comment}</div>

							</div>
						</div>
					))}

				</Modal.Body>
				<Modal.Footer>


				</Modal.Footer>
			</Modal>);
	}
	return (
		<div id="sharings">
			<div  >
				{sharings.map((sharings, index) => (
					<div key={index} id="sharing" >
						{showPopUp()}
						{showCommentPopUp()}
						<div style={{ marginTop: "0px", width: "100%" }}>
							<div style={{ width: "100%", display: "inline-block" }} >
								<h1 style={{ color: "#616364 ", fontSize: "18px", fontWeight: "500", float: "left" }}>From:</h1>
								<h1 style={{ color: "#1a2631", fontSize: "18px", fontWeight: "500", display: "inline", float: "left", paddingLeft: "5px" }}> {sharings.sharing.isAnon === true ? "Anonymous" : sharings.sharing.user}</h1>
								<h1 style={{ color: "#616364 ", fontSize: "18px", fontWeight: "500", display: "inline", float: "right" }} >{convertDate(sharings.sharing.date)}</h1>
							</div>
						</div>
						<div style={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}>
							<div style={{ width: "100%" }}>
								<h1 style={{ fontSize: "20px", fontWeight: "500", textAlign: "center", color: "#1a2631" }}>{sharings.sharing.description}</h1>
							</div>
						</div>
						<div style={{ width: "100%" }}>
							<div style={{ width: "100%", display: "inline-block" }}>

								<div style={{ display: "flex", float: "left" }}>
									<button style={{ backgroundColor: "Transparent", border: "none", display: "inline", padding: 0 }} onClick={(event) => { showSuggestion(event, sharings.sharingId) }}>
										<h2 id="suggestion-header" >Suggestions</h2>
									</button>
								</div>
								<div style={{ display: "flex", float: "right", margin: 0, padding: 0 }}>
									<div style={{ paddingRight: "15px" }}>
										<h2 style={{ fontSize: "18px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>{sharings.sharing.store}</h2>
										<div style={{ fontSize: "18px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
									</div>
									<div style={{ paddingRight: "15px" }}>
										<h2 style={{ fontSize: "18px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>{sharings.sharing.payment}</h2>
										<div style={{ fontSize: "18px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
									</div>
									<div>
										<button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { makeSuggestion(event, sharings.sharingId) }}><i class="far fa-comment " style={{ color: "#1a2631", fontSize: "20px" }}></i></button>
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
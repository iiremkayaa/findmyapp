import React, { useState, useEffect} from 'react';
import * as firebase from "firebase";
import { MDBIcon } from "mdbreact";
import { db } from '../firebase/index';
import { Modal, Form } from 'react-bootstrap';
import './UserSharings.css';

const UserSharings = () => {
    
    const [user, setUser] = useState("");
    const [sharings, setSharings] = useState([]);
	const [show, setShow] = useState(false);
	const [selectedSharing, setSelectedSharing] = useState("");
	const [selectedSharingId, setSelectedSharingId] = useState("");
	const [commentList, setCommentList] = useState([]);
	const [showComments, setShowComments] = useState(false);

    useEffect(() => {
	
		firebase.auth().onAuthStateChanged((authUser) => {
			if (authUser) {
				db.ref('/user').on('value', querySnapShot => {
					querySnapShot.forEach((child) => {
						if (child.val().email == authUser.email) {
							setUser(child.val());
						}
					});
				});
			}
			else {
				setUser("");
			}
		})
    }, []);
    useEffect(() => {
		db.ref('/sharing').on('value', querySnapShot => {
			let values = [];
			querySnapShot.forEach((child) => {
                if(child.val().userEmail === user.email){
                    values.push({ sharingId: child.ref.key, sharing: child.val() })
                }
			});
			setSharings(values);
		});
		
    }, [user]);
    
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
    const handleCloseComments = () => {
		setShowComments(false);
	}
    const showCommentPopUp = () => {
		return (
			<Modal show={showComments} onHide={handleCloseComments} animation={true} centered backdrop={false} >
				<Modal.Header closeButton>
					<Modal.Title style={{ fontSize: "15px",fontWeight:"500" }}>{selectedSharing}</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{paddingTop:"5px",paddingBottom:"0px"}}>
					{commentList.map((comment, index) => (
						<div key={index} style={{ padding: "5px",borderBottom: "1px solid #DEE2E6"}}>
							<div style={{ display: "inline-block", width: "100%" }}>
								
								<div style={{ float: "left"}}><h2 style={{fontWeight:"500",fontSize:"14px",color:"rgb(243, 82, 82)",marginBottom:"0"}}>{comment.comment.username}</h2></div>
								<div style={{  float: "right" }}><h2 style={{fontWeight:"500",fontSize:"13px",color:"#616364 "}}>{comment.comment.date}</h2></div>
							</div>
							<div >
								<div><h2 style={{fontWeight:"400",fontSize:"13px"}}>{comment.comment.comment}</h2></div>
							</div>
							{comment.comment.isSelected &&<div style={{ display: "inline-block",textAlign:"center",width:"100%"}}>
								 <div style={{ display:"table",float:"right",backgroundColor:"rgba(56, 175, 41, 0.815)",padding:"5px",paddingRight:"10px",paddingLeft:"10px",border:"solid",borderRadius:"12px",borderColor:"white"}} >
									<h2 style={{display:"table-cell",fontSize:"13px",fontWeight:"500",paddingRight:"5px",color:"white"}}>SELECTED</h2>
									<i class="fas fa-check" id="check-icon-comment"></i>
								</div>
							</div>}
						</div>
					))}
				</Modal.Body>
				
			</Modal>);
	}
    return (
        <div id="sharings">
			
			
				{showCommentPopUp()}
				{sharings.map((sharings, index) => (
					<div key={index} id="sharing" >
						<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
							{!sharings.sharing.isAnswered && <div style={{textAlign:"center",paddingLeft:"12px",paddingRight:"12px"}}>
								<i class="fas fa-question" id="question-icon" ></i>
								 <h2 id ="unanswered-header" >Unanswered</h2>
								
							</div>}
							{sharings.sharing.isAnswered && <div style={{textAlign:"center",paddingLeft:"20px",paddingRight:"20px"}}>
								<i class="fas fa-check" id="check-icon"></i>
								<h2 id ="answered-header" >Answered</h2>
							</div>}
						</div>
						<div style={{ width:"100%",overflow:"auto"}}>
							<div style={{ marginTop: "0px" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "rgb(151, 140, 140)", fontSize: "15px", fontWeight: "500", float: "left", marginBottom: "0px" }}>From:</h1>
									<h1 style={{ color: "#1a2631", fontSize: "15px", fontWeight: "500", display: "inline", float: "left", paddingLeft: "5px", marginBottom: "0px" }}> {sharings.sharing.isAnon === true ? "Anonymous" : sharings.sharing.user}</h1>
									<h1 style={{ color: "#616364 ", fontSize: "15px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >{sharings.sharing.date}</h1>
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
								<div style={{ width: "100%" }}>
									<h1 style={{ fontSize: "16px", fontWeight: "500", color: "#1a2631" }}>{sharings.sharing.description}</h1>
								</div>
							</div>
							<div style={{ width: "100%", verticalAlign: "middle",overflow:"auto", }}>
								<div style={{ width: "100%", display: "inline-block" }}>

									<div style={{ display: "flex", float: "left" }}>
										<button style={{ backgroundColor: "Transparent", border: "none", display: "inline", padding: 0 }} onClick={(event) => { showSuggestion(event, sharings.sharingId) }}>
											<h2 id="suggestion-header" >Suggestions</h2>
										</button>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0 }}>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "15px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "rgb(151, 140, 140)" }}>{sharings.sharing.store}</h2>
											<div style={{ fontSize: "15px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "15px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "rgb(151, 140, 140)" }}>{sharings.sharing.payment}</h2>
											<div style={{ fontSize: "15px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										
									</div>
								</div>
							</div>
						</div>
					</div>
				))}

		</div>
    );
}

export default UserSharings;

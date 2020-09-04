import React, { useState, useEffect } from 'react';
import { db } from '../firebase/index';
import * as firebase from "firebase";
import './Suggestions.css';
import { Modal, Form } from 'react-bootstrap';
import Page from 'react-page-loading'

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [user, setUser] = useState("");
    const [sharings, setSharings] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedSuggestionId,setSelectedSuggestionId]=useState("");
    const [selectedSuggestion, setSelectedSuggestion] = useState("");

    const handleClose = () => {
		setShow(false);
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

    useEffect(() => {
        db.ref('/sharing').on('value',querySnapShot=>{
            let values = [];
            querySnapShot.forEach((child) => {
                    values.push({ sharingId: child.ref.key, sharing: child.val() })
            });
            setSharings(values);
        })
        db.ref('/comment').on('value', querySnapShot => {
            let values = [];
            querySnapShot.forEach((child) => {
                if (user === child.val().username) {
                    var parts =child.val().date.split('.');
                    values.push({ commentId: child.ref.key, comment: child.val(),date:new Date(parts[2], parts[1] - 1, parts[0]) })
                }
            });
            const sorted=values.sort((a, b) => b.date - a.date);
            setSuggestions(values);
        });
    }, [user])
   
    const deleteComment=(event,id)=>{
        event.preventDefault();
        setSelectedSuggestionId(id);
		db.ref(`comment/${id}`).on('value', querySnapShot => {
			setSelectedSuggestion(querySnapShot.val().description);
		});
		setShow(true);
    }
    const showPopUp = () => {
		return (
			<Modal show={show} onHide={handleClose} animation={true} centered backdrop={false} >
				<Modal.Header closeButton>
					<Modal.Title style={{ fontSize: "20px" }}></Modal.Title>
				</Modal.Header>
				<Modal.Body >
					<div style={{}}>
						<h2 style={{ fontSize: "16px", fontWeight: "500", }}>Are you sure?</h2>
					</div>
					
				</Modal.Body>
				<Modal.Footer>
					<button onClick={(event) => { deleteFunc(event) }} style={{ fontWeight: "500", fontSize: "15px",borderWidth:"1px", borderRadius: "5px",borderColor:"white", color: "white", backgroundColor:"#244869", padding: "3px", paddingLeft: "15px", paddingRight: "15px" }}>
						Delete
                </button>

				</Modal.Footer>
			</Modal>);
    }
    const deleteFunc = (event) => {
        event.preventDefault();
        let userRef = db.ref('comment/' + selectedSuggestionId);
        userRef.remove();
        setShow(false);
        window.location.reload(false);
    }
    const getSharing=(id)=>{
        sharings.forEach((sharing) => {
            if(sharing.sharingId===id){
                let text=sharing.sharing.description;
                console.log(sharing.sharing.description);
            return(<div><h3 style={{color:"red"}}>{text}</h3></div>);
            }
        })
			
    }
    return (
        <div style={{ paddingLeft: "15%", paddingRight: "15%", paddingTop: "20px" }}>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
            {showPopUp()}

            {suggestions.map((suggestion, index) => (
                <div key={index} id="suggestion" >
                    <div style={{ width: "100%", display: "inline-block" }}>
                        <div style={{ display: "inline", float: "left", fontSize: "15px", fontWeight: "500" }}>{suggestion.comment.isApproved && <h2 style={{ color: "rgba(56, 175, 41, 0.815)", fontSize: "15px" }}>Approved</h2>}</div>
                        <div style={{ display: "inline", float: "left", fontSize: "15px", fontWeight: "500" }}>{!suggestion.comment.isApproved && <h2 style={{ color: "rgb(151, 140, 140)", fontSize: "15px" }}>Unapproved</h2>}</div>
                        <div style={{ display: "inline", float: "right", color: "black", fontSize: "15px", fontWeight: "500" }}>{suggestion.comment.date}</div>
                    </div>
                    <div style={{width: "100%", display: "inline-block" }}>
                        {/*<div style={{display:"flex",float:"left"}}>
                                {getSharing(suggestion.comment.sharingId)}
            </div>*/}
                        <div style={{display:"flex",float:"left"}}><h2 style={{ color: "black", fontSize: "15px" }}>{suggestion.comment.comment}</h2></div>
                        <div style={{display:"flex",float:"right"}}>
                            <button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { deleteComment(event,suggestion.commentId) }}><i className="fas fa-trash-alt"  style={{  color: "rgb(61,83,119)",fontSize:"15px" }}></i></button>
                        </div>
                    </div>
                </div>
            ))}
            </Page>
        </div>
    );

}
export default Suggestions;
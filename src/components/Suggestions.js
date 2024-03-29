import React, { useState, useEffect } from 'react';
import { db } from '../firebase/index';
import * as firebase from "firebase";
import './Suggestions.css';
import { Modal } from 'react-bootstrap';
import Page from 'react-page-loading'
import { useHistory } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}
const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
}
const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
}
const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [user, setUser] = useState("");
    const [sharings, setSharings] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedSuggestionId, setSelectedSuggestionId] = useState("");
    const [selectedSuggestion, setSelectedSuggestion] = useState("");
	const history = useHistory();

    const handleClose = () => {
        setShow(false);
    }
    useEffect(() => {

        firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                db.ref('/user').on('value', querySnapShot => {
                    querySnapShot.forEach((child) => {
                        if (child.val().email === authUser.email) {
                            setUser(child.val().username);
                        }
                    });
                });
            }
            else {
                history.push(`/login`);
                setUser("");
            }
        })
    }, []);

    useEffect(() => {
        db.ref('/sharing').on('value', querySnapShot => {
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
                    var parts = child.val().date.split('.');
                    values.push({ commentId: child.ref.key, comment: child.val(), date: new Date(parts[2], parts[1] - 1, parts[0]) })
                }
            });
            const sorted = values.sort((a, b) => b.date - a.date);
            setSuggestions(values);
        });
    }, [user])

    const deleteComment = (event, id) => {
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
                    <button onClick={(event) => { deleteFunc(event) }} style={{ fontWeight: "500", fontSize: "15px", borderWidth: "1px", borderRadius: "5px", borderColor: "white", color: "white", backgroundColor: "rgb(78, 85, 129)", padding: "3px", paddingLeft: "15px", paddingRight: "15px" }}>
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
    const getSharing = (id) => {
        sharings.forEach((sharing) => {
            if (sharing.sharingId === id) {
                let text = sharing.sharing.description;
                return (<div><h3 style={{ color: "red" }}>{text}</h3></div>);
            }
        })

    }
    return (
        <div style={{  }}>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Desktop>
                    <div style={{paddingLeft: "15%", paddingRight: "15%", paddingTop: "20px"}}>
                    {showPopUp()}

                    {suggestions.map((suggestion, index) => (
                        <div key={index} id="suggestion" >
                            <div style={{ width: "100%", display: "inline-block" }}>
                                <div style={{ display: "inline", float: "left", fontSize: "15px", fontWeight: "500" }}>{suggestion.comment.isApproved && <h2 style={{ color: "rgba(56, 175, 41, 0.815)", fontSize: "15px" }}>Approved</h2>}</div>
                                <div style={{ display: "inline", float: "left", fontSize: "15px", fontWeight: "500" }}>{!suggestion.comment.isApproved && <h2 style={{ color: "rgb(151, 140, 140)", fontSize: "15px" }}>Unapproved</h2>}</div>
                                <div style={{ display: "inline", float: "right", color: "#616364", fontSize: "15px", fontWeight: "500" }}>{suggestion.comment.date}</div>
                            </div>
                            <div style={{ width: "100%", display: "inline-block" }}>
                                {/*<div style={{display:"flex",float:"left"}}>
                                {getSharing(suggestion.comment.sharingId)}
            </div>*/}
                                <div style={{ display: "flex", float: "left" }}><h2 style={{ color: "white", fontSize: "15px" }}>{suggestion.comment.comment}</h2></div>
                                <div style={{ display: "flex", float: "right" }}>
                                    <button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { deleteComment(event, suggestion.commentId) }}><i className="fas fa-trash-alt" style={{ color: "white", fontSize: "15px" }}></i></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </Desktop>
            </Page>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Tablet>
                    <div style={{paddingLeft: "15%", paddingRight: "15%", paddingTop: "20px"}}>
                    {showPopUp()}

                    {suggestions.map((suggestion, index) => (
                        <div key={index} id="suggestion" >
                            <div style={{ width: "100%", display: "inline-block" }}>
                                <div style={{ display: "inline", float: "left", fontSize: "15px", fontWeight: "500" }}>{suggestion.comment.isApproved && <h2 style={{ color: "rgba(56, 175, 41, 0.815)", fontSize: "15px" }}>Approved</h2>}</div>
                                <div style={{ display: "inline", float: "left", fontSize: "15px", fontWeight: "500" }}>{!suggestion.comment.isApproved && <h2 style={{ color: "rgb(151, 140, 140)", fontSize: "15px" }}>Unapproved</h2>}</div>
                                <div style={{ display: "inline", float: "right", color: "#616364", fontSize: "15px", fontWeight: "500" }}>{suggestion.comment.date}</div>
                            </div>
                            <div style={{ width: "100%", display: "inline-block" }}>
                                {/*<div style={{display:"flex",float:"left"}}>
                                {getSharing(suggestion.comment.sharingId)}
            </div>*/}
                                <div style={{ display: "flex", float: "left" }}><h2 style={{ color: "white", fontSize: "15px" }}>{suggestion.comment.comment}</h2></div>
                                <div style={{ display: "flex", float: "right" }}>
                                    <button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { deleteComment(event, suggestion.commentId) }}><i className="fas fa-trash-alt" style={{ color: "white", fontSize: "15px" }}></i></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </Tablet>
            </Page>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Mobile>
                <div style={{paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px"}}>
                    {showPopUp()}

                    {suggestions.map((suggestion, index) => (
                        <div key={index} id="suggestion-mb" >
                            <div style={{ width: "100%", display: "inline-block" }}>
                                <div style={{ display: "inline", float: "left", fontSize: "14px", fontWeight: "500" }}>{suggestion.comment.isApproved && <h2 style={{ color: "rgba(56, 175, 41, 0.815)", fontSize: "15px" }}>Approved</h2>}</div>
                                <div style={{ display: "inline", float: "left", fontSize: "14px", fontWeight: "500" }}>{!suggestion.comment.isApproved && <h2 style={{ color: "rgb(151, 140, 140)", fontSize: "15px" }}>Unapproved</h2>}</div>
                                <div style={{ display: "inline", float: "right", color: "#616364", fontSize: "14px", fontWeight: "500" }}>{suggestion.comment.date}</div>
                            </div>
                            <div style={{ width: "100%", display: "inline-block" }}>
                                {/*<div style={{display:"flex",float:"left"}}>
                                {getSharing(suggestion.comment.sharingId)}
            </div>*/}
                                <div style={{ display: "flex", float: "left" }}><h2 style={{ color: "white", fontSize: "15px" }}>{suggestion.comment.comment}</h2></div>
                                <div style={{ display: "flex", float: "right" }}>
                                    <button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { deleteComment(event, suggestion.commentId) }}><i className="fas fa-trash-alt" style={{ color: "white", fontSize: "14px" }}></i></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </Mobile>
            </Page>
        </div>
    );

}
export default Suggestions;
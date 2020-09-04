import React, { useState, useEffect } from "react";
import { db } from '../firebase/index';
import { MDBIcon } from "mdbreact";
import { Modal, Form } from 'react-bootstrap';
import './SharingList.css';
import * as firebase from "firebase";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router-dom";
import Page from 'react-page-loading'

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
    const history = useHistory();
    useEffect(() => {
        db.ref('/sharing').on('value', querySnapShot => {
            let values = [];
            querySnapShot.forEach((child) => {
                var parts = child.val().date.split('.');
                values.push({ sharingId: child.ref.key, sharing: child.val(), date: new Date(parts[2], parts[1] - 1, parts[0]) })
            });
            const sorted = values.sort((a, b) => b.date - a.date);
            setSharings(sorted);
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
        let day = date.split("-")[2].length === 1 ? "0" + date.split("-")[2].length : date.split("-")[2].length;
        let month = date.split("-")[1].length === 1 ? "0" + date.split("-")[1].length : date.split("-")[1].length;
        let year = date.split("-")[0];
        return (day + '.' + month + '.' + year);
    }
    const sendCommentChange = (event) => {
        event.preventDefault();

        if (user === "") {

            history.push("/login");
        }
        else {
            setCommentMessage(true);
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes();
            const data = {
                comment: comment,
                sharingId: selectedSharingId,
                date: convertDateFormatToPost(date),
                time: time,
                username: user,
                isApproved: false
            }
            db.ref('/comment').push(data);
            setTimeout(function () {
                setCommentMessage(false);
                setShow(false);
                setSelectedSharingId("");
                setComment("");
            }, 3000);
        }

    }
    const showPopUp = () => {
        return (
            <Modal show={show} onHide={handleClose} animation={true} centered backdrop={false} >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "20px" }}></Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div style={{}}>
                        <h2 style={{ fontSize: "16px", fontWeight: "500", }}>{selectedSharing}</h2>
                    </div>
                    <Form style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Form.Control type="text" value={comment} placeholder="Enter your suggestion here" onChange={(event) => { handleCommentChange(event) }} />
                    </Form>
                    {commentMessage && <div style={{ textAlign: "center" }}>
                        <h2 style={{ fontSize: "15px", fontWeight: "500", color: "#1a2631" }}>Your suggestion has been sent!</h2>
                    </div>}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={sendCommentChange} style={{ fontWeight: "400", fontSize: "15px", borderWidth: "1px", borderRadius: "5px", borderColor: "white", color: "white", backgroundColor: "#244869", padding: "3px", paddingLeft: "30px", paddingRight: "30px" }}>
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
                    <Modal.Title style={{ fontSize: "16px" }}>{selectedSharing}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: "2px" }} >
                    {commentList.length > 0 ? commentList.map((comment, index) => (

                        <div key={index} style={{ margin: "10px", backgroundColor: "#f2edf1", borderRadius: "5px", padding: "5px" }}>
                            <div style={{ display: "inline-block", width: "100%" }}>
                                <div style={{ display: "inline", float: "left" }}>
                                    <i class="far fa-user" style={{ width: "20px", height: "20px", color: "#1a2631", fontWeight: "600" }}></i>
                                </div>
                                <div style={{ display: "inline", float: "left", fontSize: "16px", fontWeight: "600" }}>{comment.comment.username}</div>
                                <div style={{ display: "inline", float: "right", fontSize: "15px", fontWeight: "600" }}>{convertDate(comment.comment.date)}</div>
                            </div>
                            <div >
                                <div style={{ fontSize: "14px", fontWeight: "400" }}>{comment.comment.comment}</div>

                            </div>
                        </div>
                    )) : <div style={{ textAlign: "center", fontSize: "15px", fontWeight: "600", color: "gray" }}>There is no suggestion.</div>}

                </Modal.Body>
                <Modal.Footer>


                </Modal.Footer>
            </Modal>);
    }
    return (
        <div id="sharings">

            {showPopUp()}
            {showCommentPopUp()}
            {sharings.map((sharings, index) => (
                <div key={index} id="sharing" >

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {!sharings.sharing.isAnswered && <div style={{ textAlign: "center", paddingLeft: "12px", paddingRight: "12px" }}>
                            <i class="fas fa-question" id="question-icon" ></i>
                            <h2 id="unanswered-header" >Unanswered</h2>

                        </div>}
                        {sharings.sharing.isAnswered && <div style={{ textAlign: "center", paddingLeft: "20px", paddingRight: "20px" }}>
                            <i class="fas fa-check" id="check-icon"></i>
                            <h2 id="answered-header" >Answered</h2>
                        </div>}
                    </div>
                    <div style={{ width: "100%", overflow: "auto" }}>
                        <div style={{ marginTop: "0px" }}>
                            <div style={{ width: "100%", display: "inline-block" }} >
                                <h1 style={{ color: "rgb(151, 140, 140)", fontSize: "15px", fontWeight: "500", float: "left", marginBottom: "0px" }}>From:</h1>
                                <h1 style={{ color: "#1a2631", fontSize: "15px", fontWeight: "500", display: "inline", float: "left", paddingLeft: "5px", marginBottom: "0px" }}> {sharings.sharing.isAnon === true ? "Anonymous" : sharings.sharing.user}</h1>
                                <h1 style={{ color: "#616364 ", fontSize: "15px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >{convertDate(sharings.sharing.date)}</h1>
                            </div>
                        </div>
                        <div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
                            <div style={{ width: "100%" }}>
                                <h1 style={{ fontSize: "16px", fontWeight: "500", color: "#1a2631" }}>{sharings.sharing.description}</h1>
                            </div>
                        </div>
                        <div style={{ width: "100%", verticalAlign: "middle", overflow: "auto", }}>
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
                                    <div style={{ borderColor: "white" }}>
                                        <button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { makeSuggestion(event, sharings.sharingId) }}><i class="far fa-comment " style={{ color: "rgb(61,83,119)", fontSize: "20px" }}></i></button>
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
export default SharingList;
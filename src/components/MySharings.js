import React, { useState, useEffect } from 'react';
import { db } from '../firebase/index';
import * as firebase from "firebase";
import './MySharings.css';
import { Modal, Form } from 'react-bootstrap';
import Page from 'react-page-loading'
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
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
const MySharings = () => {
    const [sharings, setSharings] = useState([]);
    const [user, setUser] = useState("");
    const [comments, setComments] = useState([]);
    const [selectedSharingId, setSelectedSharingId] = useState("");
    const [selectedSharing, setSelectedSharing] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [show, setShow] = useState(false);
    const [isApproved, setIsApproved] = useState("");
	const history = useHistory();

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
                    <button onClick={(event) => { deleteFunc(event) }} style={{ fontWeight: "500", fontSize: "15px", borderWidth: "1px", borderRadius: "5px", borderColor: "white", color: "white", backgroundColor: "#3e414d", padding: "3px", paddingLeft: "15px", paddingRight: "15px" }}>
                        Delete
                </button>

                </Modal.Footer>
            </Modal>);
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
                history.push(`/login`);

                setUser("");
            }
        })
    }, []);
    useEffect(() => {
        db.ref('/sharing').on('value', querySnapShot => {
            let values = [];
            querySnapShot.forEach((child) => {
                if (user === child.val().user) {
                    var parts = child.val().date.split('.');
                    values.push({ sharingId: child.ref.key, sharing: child.val(), date: new Date(parts[2], parts[1] - 1, parts[0]) })
                }
            });
            const sorted = values.sort((a, b) => b.date - a.date);
            setSharings(sorted);
        });
        db.ref('/comment').on('value', querySnapShot => {
            let values = [];
            querySnapShot.forEach((child) => {
                if (user === child.val().username && child.val().isApproved === true) {
                    values.push({ commentId: child.ref.key, comment: child.val() })
                }
            });
            setComments(values);
        });
    }, [user])
    const handleCloseComments = () => {
        setShowComments(false);
    }
    const handleClose = () => {
        setShow(false);
    }
    const convertDate = (date) => {
        return date;
    }
    const deleteFunc = (event) => {
        event.preventDefault();
        let userRef = db.ref('sharing/' + selectedSharingId);
        userRef.remove();
        setShow(false);
        window.location.reload(false);
    }
    const approveComment = (event, comment) => {
        event.preventDefault();
        let answeredNum = 0;
        let sharingIds = "";
        sharings.forEach((sharing) => {
            if (sharing.sharingId === comment.comment.sharingId) {
                answeredNum = sharing.sharing.answeredNum;
                sharingIds = sharing.sharingId;
            }
        })
        db.ref(`sharing/${sharingIds}`).update({
            answeredNum: answeredNum + 1,

        });
        db.ref(`comment/${comment.commentId}`).update({
            isApproved: true,
        });
    }
    const notApproveComment = (event, comment) => {
        event.preventDefault();
        let answeredNum = 0;
        let sharingIds = "";
        sharings.forEach((sharing) => {
            if (sharing.sharingId === comment.comment.sharingId) {
                answeredNum = sharing.sharing.answeredNum;
                sharingIds = sharing.sharingId;
            }
        })
        db.ref(`comment/${comment.commentId}`).update({
            isApproved: false,
        });
        db.ref(`sharing/${sharingIds}`).update({
            answeredNum: answeredNum - 1,

        });
    }
    const showCommentPopUp = () => {
        return (
            <Modal show={showComments} onHide={handleCloseComments} animation={true} centered backdrop={false} >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "16px" }}>{selectedSharing}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: "2px" }} >
                    {commentList.length > 0 ? commentList.map((comment, index) => (

                        <div key={index} style={{ verticalAlign: "middle", overflow: "auto", margin: "10px", backgroundColor: "#f2edf1", borderRadius: "5px", padding: "5px" }}>
                            <div style={{ display: "inline-block", width: "100%" }}>
                                <div style={{ display: "inline", float: "left" }}>
                                    <i class="far fa-user" style={{ width: "20px", height: "20px", color: "#1a2631", fontWeight: "600" }}></i>
                                </div>
                                <div style={{ display: "inline", float: "left", fontSize: "16px", fontWeight: "600" }}>{comment.comment.username}</div>
                                <div style={{ display: "inline", float: "right", fontSize: "15px", fontWeight: "600" }}>{convertDate(comment.comment.date)}</div>
                            </div>
                            <div style={{ display: "inline-block", width: "100%" }} >
                                <div style={{ fontSize: "14px", fontWeight: "400", float: "left", }}>{comment.comment.comment}</div>

                            </div>
                            <div style={{ display: "flex", float: "right", margin: 0, padding: 0 }}>
                                {!comment.comment.isApproved && <button onClick={(event) => { approveComment(event, comment) }} style={{ display: "inline", border: "none" }} >
                                    <h2 style={{ fontSize: "14px", fontWeight: "600", display: "flex", float: "right", color: "rgb(243, 82, 82)" }}>Approve</h2>
                                </button>}
                                {comment.comment.isApproved && <button onClick={(event) => { notApproveComment(event, comment) }} style={{ display: "inline", border: "none" }} >
                                    <h2 style={{ fontSize: "14px", fontWeight: "600", display: "flex", float: "right", color: "rgba(56, 175, 41, 0.815)" }}>Approved</h2>
                                </button>}
                            </div>

                        </div>
                    )) : <div style={{ textAlign: "center", fontSize: "15px", fontWeight: "600", color: "gray" }}>There is no suggestion.</div>}

                </Modal.Body>
                <Modal.Footer>


                </Modal.Footer>
            </Modal>);
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
    };
    const deleteSharing = (event, id) => {
        event.preventDefault();
        setSelectedSharingId(id);
        db.ref(`sharing/${id}`).on('value', querySnapShot => {
            setSelectedSharing(querySnapShot.val().description);
        });
        setShow(true);
    }
    return (
        <div >
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Desktop>
                    <div style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "10px" }}>
                        {showPopUp()}
                        {showCommentPopUp()}
                        {sharings.map((sharings, index) => (
                            <div key={index} id="sharing" >
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {!(sharings.sharing.answeredNum > 0) && <div style={{ textAlign: "center", paddingLeft: "12px", paddingRight: "12px" }}>
                                        <i className="fas fa-question" id="question-icon" ></i>
                                        <h2 id="unanswered-header" >Unanswered</h2>

                                    </div>}
                                    {(sharings.sharing.answeredNum > 0) && <div style={{ textAlign: "center", paddingLeft: "20px", paddingRight: "20px" }}>
                                        <i className="fas fa-check" id="check-icon"></i>
                                        <h2 id="answered-header" >Answered</h2>
                                    </div>}
                                </div>
                                <div style={{ width: "100%", overflow: "auto" }}>
                                    <div style={{ marginTop: "0px" }}>
                                        <div style={{ width: "100%", display: "inline-block" }} >
                                            <h1 style={{ color: "rgb(151, 140, 140)", fontSize: "15px", fontWeight: "500", float: "left", marginBottom: "0px" }}>From:</h1>
                                            <h1 style={{ color: "white", fontSize: "15px", fontWeight: "500", display: "inline", float: "left", paddingLeft: "5px", marginBottom: "0px" }}> {sharings.sharing.isAnon === true ? "Anonymous" : sharings.sharing.user}</h1>
                                            <h1 style={{ color: "#616364 ", fontSize: "15px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >{convertDate(sharings.sharing.date)}</h1>
                                        </div>
                                    </div>
                                    <div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
                                        <div style={{ width: "100%" }}>
                                            <h1 style={{ fontSize: "16px", fontWeight: "500", color: "white" }}>{sharings.sharing.description}</h1>
                                        </div>
                                    </div>
                                    <div style={{ width: "100%", verticalAlign: "middle", overflow: "auto", }}>
                                        <div style={{ width: "100%", display: "inline-block" }}>

                                            <div style={{ display: "flex", float: "left" }}>
                                                <button style={{ backgroundColor: "Transparent", border: "none", display: "inline", padding: 0 }} onClick={(event) => { showSuggestion(event, sharings.sharingId) }}>
                                                    <h2 id="suggestion-header" >Suggestions</h2>
                                                </button>
                                            </div>
                                            <div style={{ display: "flex", float: "right" }}>
                                                <div style={{ paddingRight: "15px" }}>
                                                    <h2 style={{ fontSize: "15px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "rgb(151, 140, 140)" }}>{sharings.sharing.store}</h2>
                                                    <div style={{ fontSize: "15px", display: "inline" }}><i className="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
                                                </div>
                                                <div style={{ paddingRight: "15px" }}>
                                                    <h2 style={{ fontSize: "15px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "rgb(151, 140, 140)" }}>{sharings.sharing.payment}</h2>
                                                    <div style={{ fontSize: "15px", display: "inline" }}><i className="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
                                                </div>
                                                <div style={{ borderColor: "white" }}>
                                                    <button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { deleteSharing(event, sharings.sharingId) }}><i class="fas fa-trash-alt" style={{ width: "25px", height: "25px", color: "white", fontSize: "18px" }}></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>

                    </div>
                </Desktop>
            </Page>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Tablet>
                    <div style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "10px" }}>
                        {showPopUp()}
                        {showCommentPopUp()}
                        {sharings.map((sharings, index) => (
                            <div key={index} id="sharing" >
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {!(sharings.sharing.answeredNum > 0) && <div style={{ textAlign: "center", paddingLeft: "12px", paddingRight: "12px" }}>
                                        <i className="fas fa-question" id="question-icon" ></i>
                                        <h2 id="unanswered-header" >Unanswered</h2>

                                    </div>}
                                    {(sharings.sharing.answeredNum > 0) && <div style={{ textAlign: "center", paddingLeft: "20px", paddingRight: "20px" }}>
                                        <i className="fas fa-check" id="check-icon"></i>
                                        <h2 id="answered-header" >Answered</h2>
                                    </div>}
                                </div>
                                <div style={{ width: "100%", overflow: "auto" }}>
                                    <div style={{ marginTop: "0px" }}>
                                        <div style={{ width: "100%", display: "inline-block" }} >
                                            <h1 style={{ color: "rgb(151, 140, 140)", fontSize: "15px", fontWeight: "500", float: "left", marginBottom: "0px" }}>From:</h1>
                                            <h1 style={{ color: "white", fontSize: "15px", fontWeight: "500", display: "inline", float: "left", paddingLeft: "5px", marginBottom: "0px" }}> {sharings.sharing.isAnon === true ? "Anonymous" : sharings.sharing.user}</h1>
                                            <h1 style={{ color: "#616364 ", fontSize: "15px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >{convertDate(sharings.sharing.date)}</h1>
                                        </div>
                                    </div>
                                    <div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
                                        <div style={{ width: "100%" }}>
                                            <h1 style={{ fontSize: "16px", fontWeight: "500", color: "white" }}>{sharings.sharing.description}</h1>
                                        </div>
                                    </div>
                                    <div style={{ width: "100%", verticalAlign: "middle", overflow: "auto", }}>
                                        <div style={{ width: "100%", display: "inline-block" }}>

                                            <div style={{ display: "flex", float: "left" }}>
                                                <button style={{ backgroundColor: "Transparent", border: "none", display: "inline", padding: 0 }} onClick={(event) => { showSuggestion(event, sharings.sharingId) }}>
                                                    <h2 id="suggestion-header" >Suggestions</h2>
                                                </button>
                                            </div>
                                            <div style={{ display: "flex", float: "right" }}>
                                                <div style={{ paddingRight: "15px" }}>
                                                    <h2 style={{ fontSize: "15px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "rgb(151, 140, 140)" }}>{sharings.sharing.store}</h2>
                                                    <div style={{ fontSize: "15px", display: "inline" }}><i className="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
                                                </div>
                                                <div style={{ paddingRight: "15px" }}>
                                                    <h2 style={{ fontSize: "15px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "rgb(151, 140, 140)" }}>{sharings.sharing.payment}</h2>
                                                    <div style={{ fontSize: "15px", display: "inline" }}><i className="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
                                                </div>
                                                <div style={{ borderColor: "white" }}>
                                                    <button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { deleteSharing(event, sharings.sharingId) }}><i class="fas fa-trash-alt" style={{ width: "25px", height: "25px", color: "white", fontSize: "18px" }}></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>

                    </div>
                </Tablet>
            </Page>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Mobile>
                    <div style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px" }}>
                        {showPopUp()}
                        {showCommentPopUp()}
                        {sharings.map((sharings, index) => (
                            <div key={index} id="sharing-mb" >
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {!(sharings.sharing.answeredNum > 0) && <div style={{ textAlign: "center", paddingLeft: "5px", paddingRight: "8px" }}>
                                        <i className="fas fa-question" id="question-icon-mb" ></i>
                                        <h2 id="unanswered-header-mb" >Unanswered</h2>

                                    </div>}
                                    {(sharings.sharing.answeredNum > 0) && <div style={{ textAlign: "center", paddingLeft: "8px", paddingRight: "15px" }}>
                                        <i className="fas fa-check" id="check-icon-mb"></i>
                                        <h2 id="answered-header-mb" >Answered</h2>
                                    </div>}
                                </div>
                                <div style={{ width: "100%", overflow: "auto" }}>
                                    <div style={{ marginTop: "0px" }}>
                                        <div style={{ width: "100%", display: "inline-block" }} >
                                            <h1 style={{ color: "rgb(151, 140, 140)", fontSize: "12px", fontWeight: "500", float: "left", marginBottom: "0px" }}>From:</h1>
                                            <h1 style={{ color: "white", fontSize: "12px", fontWeight: "500", display: "inline", float: "left", paddingLeft: "5px", marginBottom: "0px" }}> {sharings.sharing.isAnon === true ? "Anonymous" : sharings.sharing.user}</h1>
                                            <h1 style={{ color: "#616364 ", fontSize: "12px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >{convertDate(sharings.sharing.date)}</h1>
                                        </div>
                                    </div>
                                    <div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
                                        <div style={{ width: "100%" }}>
                                            <h1 style={{ fontSize: "12px", fontWeight: "500", color: "white" }}>{sharings.sharing.description}</h1>
                                        </div>
                                    </div>
                                    <div style={{ width: "100%", verticalAlign: "middle", overflow: "auto", }}>
                                        <div style={{ width: "100%", display: "inline-block" }}>

                                            <div style={{ display: "flex", float: "left" }}>
                                                <button style={{ backgroundColor: "Transparent", border: "none", display: "inline", padding: 0 }} onClick={(event) => { showSuggestion(event, sharings.sharingId) }}>
                                                    <h2 id="suggestion-header-mb" >Suggestions</h2>
                                                </button>
                                            </div>
                                            <div style={{ display: "flex", float: "right" }}>
                                                <div style={{ paddingRight: "0px" }}>
                                                    <h2 style={{ fontSize: "12px", fontWeight: "600", marginLeft: "0px", display: "inline", marginRight: "5px", color: "rgb(151, 140, 140)" }}>{sharings.sharing.store}</h2>
                                                </div>
                                                <div style={{ paddingRight: "0px" }}>
                                                    <h2 style={{ fontSize: "12px", fontWeight: "600", marginLeft: "0px", display: "inline", marginRight: "5px", color: "rgb(151, 140, 140)" }}>{sharings.sharing.payment}</h2>
                                                </div>
                                                <div style={{ borderColor: "white" }}>
                                                    <button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { deleteSharing(event, sharings.sharingId) }}><i class="fas fa-trash-alt" style={{ width: "15px", height: "15px", color: "white", fontSize: "12px" }}></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>

                    </div>
                </Mobile>
            </Page>
        </div>
    );

}
export default MySharings;
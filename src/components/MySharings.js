import React, { useState, useEffect  } from 'react';
import { db } from '../firebase/index';
import * as firebase from "firebase";
import './MySharings.css';

const MySharings= ()=>{
    const [sharings, setSharings] = useState([]);
	const [user, setUser] = useState("");
    const [comments,setComments]=useState([]);
    /*useEffect(() => {
		console.log("xx");
		
    }, []);*/
    useEffect(() => {
		/*firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });*/
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
    useEffect(()=>{
        db.ref('/sharing').on('value', querySnapShot => {
			let values = [];
			querySnapShot.forEach((child) => {
               /* */
                if(user===child.val().user){
                    console.log("saa");
                    console.log(child.val().user);
                    console.log(user);
                    values.push({ sharingId: child.ref.key, sharing: child.val() })
                }
			});
			setSharings(values);
        });
        db.ref('/comment').on('value', querySnapShot => {
			let values = [];
			querySnapShot.forEach((child) => {
                if(user===child.val().username && child.val().isApproved===true){  
                    values.push({ commentId: child.ref.key, comment: child.val() })
                }
			});
			setComments(values);
		});
    }, [user])
    console.log(comments);
    return(
            <div style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"10px"}}>
                <div>
                    {/*<div style={{textAlign:"center"}}><h1 style={{color:"black",fontSize:"20px"}}>My Sharings</h1></div>*/}
				{sharings.map((sharings, index) => (
					<div key={index} id="sharing" >
						<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
							{!sharings.sharing.isAnswered && <div style={{textAlign:"center",paddingLeft:"12px",paddingRight:"12px"}}>
								<i className="fas fa-question" id="question-icon" ></i>
								 <h2 id ="unanswered-header" >Unanswered</h2>
								
							</div>}
							{sharings.sharing.isAnswered && <div style={{textAlign:"center",paddingLeft:"20px",paddingRight:"20px"}}>
								<i className="fas fa-check" id="check-icon"></i>
								<h2 id ="answered-header" >Answered</h2>
							</div>}
						</div>
						<div style={{ width:"100%",overflow:"auto"}}>
							<div style={{ marginTop: "0px" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "rgb(151, 140, 140)", fontSize: "15px", fontWeight: "500", float: "left", marginBottom: "0px" }}>From:</h1>
									<h1 style={{ color: "#1a2631", fontSize: "15px", fontWeight: "500", display: "inline", float: "left", paddingLeft: "5px", marginBottom: "0px" }}> {sharings.sharing.isAnon === true ? "Anonymous" : sharings.sharing.user}</h1>
									<h1 style={{ color: "#616364 ", fontSize: "15px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >{/*convertDate(sharings.sharing.date)*/}</h1>
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
										<button style={{ backgroundColor: "Transparent", border: "none", display: "inline", padding: 0 }} onClick={(event) => { /*showSuggestion(event, sharings.sharingId)*/ }}>
											<h2 id="suggestion-header" >Suggestions</h2>
										</button>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0 }}>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "15px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "rgb(151, 140, 140)" }}>{sharings.sharing.store}</h2>
											<div style={{ fontSize: "15px", display: "inline" }}><i className="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "15px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "rgb(151, 140, 140)" }}>{sharings.sharing.payment}</h2>
											<div style={{ fontSize: "15px", display: "inline" }}><i className="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										<div style={{borderColor:"white"}}>
											<button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { }}><i class="far fa-comment " style={{ color: "rgb(61,83,119)", fontSize: "20px" }}></i></button>
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

		</div>
        );
   
}
export default MySharings;
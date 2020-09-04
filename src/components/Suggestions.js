import React, { useState, useEffect  } from 'react';
import { db } from '../firebase/index';
import * as firebase from "firebase";
import './Suggestions.css';

const Suggestions= ()=>{
    const [suggestions, setSuggestions] = useState([]);
	const [user, setUser] = useState("");
    const [sharings,setSharings]=useState([]);
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
    
    useEffect(()=>{
        db.ref('/comment').on('value', querySnapShot => {
			let values = [];
			querySnapShot.forEach((child) => {
                if(user===child.val().username ){  
                    values.push({ commentId: child.ref.key, comment: child.val() })
                }
			});
			setSuggestions(values);
		});
    }, [user])
    /*useEffect(()=>{
        if(suggestions!==[]){
            let values = [];

            suggestions.forEach((suggestion)=>{
                db.ref(`/sharing/${suggestion.comment.sharingId}`).on("value",querySnapShot=>{
                    values.push({ sharingId: querySnapShot.key, sharing: querySnapShot.val() });
                    console.log(values);
                })
            });
            setSharings(values);
        } 
    },[suggestions])
    useEffect(()=>{
        console.log(sharings);

    },[sharings])*/
    return(
        <div style={{paddingLeft:"15%",paddingRight:"15%",paddingTop:"20px"}}>
            {suggestions.map((suggestion, index) => (
                <div key={index} id="suggestion" >
                    <div style={{width:"100%",display:"inline-block"}}>
                        <div style={{display: "inline", float: "left",fontSize:"15px",fontWeight: "500"}}>{suggestion.comment.isApproved && <h2 style={{color:"rgba(56, 175, 41, 0.815)",fontSize:"15px"}}>Approved</h2>}</div>
                        <div style={{display: "inline", float: "left",fontSize:"15px",fontWeight: "500"}}>{!suggestion.comment.isApproved && <h2 style={{color:"rgb(151, 140, 140)",fontSize:"15px"}}>Unapproved</h2>}</div>
            <div style={{display: "inline", float: "right",color:"black",fontSize:"15px",fontWeight: "500"}}>{suggestion.comment.date}</div>
                    </div>
                    <div style={{}}>
                        <h2 style={{color:"black",fontSize:"15px"}}>{suggestion.comment.comment}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
   
}
export default Suggestions;
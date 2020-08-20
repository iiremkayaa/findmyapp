import React, { useState, useEffect  } from 'react';
import { db } from '../firebase/index';
import * as firebase from "firebase";
const Profile= ()=>{
    useEffect(() => {
		console.log("xx");
		firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });

	}, []);
        return(
            <div style={{backgroundColor:"yellow"}}>
                <h1 >Hello Profile</h1>
            </div>
        );
   
}
export default Profile;
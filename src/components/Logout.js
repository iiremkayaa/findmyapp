import React, { useState,useEffect } from 'react';
import * as firebase from "firebase";
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
		firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
          history.push(`/login`);
        
    }, []);
  return (
    <div >
      
    </div>
  );
}

export default Logout;

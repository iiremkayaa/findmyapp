import React, { useState, useEffect } from 'react';
import { db } from '../firebase/index';
import * as firebase from "firebase";
import './Profile.css';
import Form from 'react-bootstrap/Form';

const Profile = (props) => {
    const [sharings, setSharings] = useState([]);
    const [user, setUser] = useState("");
    const [comments, setComments] = useState([]);
    //const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [charControl, setCharControl] = useState(false);
    const [passControl, setPassControl] = useState(false);
    const [isExistUsername, setIsExistUsername] = useState(false);
    const [isExistMail, setIsExistMail] = useState(false);
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
    async function returnedIsExistUsername() {
        let flag = false;
        var dbFunc = await db.ref('/user').once('value', querySnapShot => {
            let values = [];
            querySnapShot.forEach((child) => {
                if (child.val().username === username) {
                    flag = true;
                }

            });
        });
        return flag;
    }
    /*async function  returnedIsExistMail () {
        let flag=false;
        var dbFunc=await db.ref('/user').once('value', querySnapShot => {
            let values = [];
			querySnapShot.forEach((child) => {
                if(child.val().email===email ){
                    flag=true;
                }
               
            });
        });
        return flag;
    }*/
    const submit = async (event) => {
        event.preventDefault();

        /*const data={
			username:username,
			password:password,
            email: email,
            sharings:[],
            comments:[],
        }*/

        /*const dbFunc=await db.ref('/user').once('value', querySnapShot => {
            let values = [];
			querySnapShot.forEach((child) => {
                if( child.val().username===username ||child.val().email===email ){
                    setIsExist(true);
                }
               
			});
        });*/
        /*if( await returnedIsExistMail()===true){
            setIsExistMail(true);
        }*/
        if (await returnedIsExistUsername() === true) {
            setIsExistUsername(true);
        }
        /*if(await returnedIsExistUsername()===false && await returnedIsExistMail()===false){
            db.ref('/user').push(data);
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                //var errorCode = error.code;
                //var errorMessage = error.message;
              
            });
            firebase.auth().onAuthStateChanged((authUser) => {
                if(authUser!==null){
                    props.history.push(`/`);
                }	
            })
        }*/


    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
        if (password !== event.target.value) {
            setPassControl(true);
        }
        if (password === event.target.value) {
            setPassControl(false);
        }
    }
    useEffect(() => {
        db.ref('/sharing').on('value', querySnapShot => {
            let values = [];
            querySnapShot.forEach((child) => {
                /* */
                if (user === child.val().user) {
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
                if (user === child.val().username && child.val().isApproved === true) {
                    values.push({ commentId: child.ref.key, comment: child.val() })
                }
            });
            setComments(values);
        });
    }, [user])
    /*const handleEmail = (event) => {
        setEmail(event.target.value);
    }*/
    const handlePassword = (event) => {
        setPassword(event.target.value);
        if ((event.target.value.length > 0) && (event.target.value.length < 5)) {
            setCharControl(true);
        }
        else {
            setCharControl(false);
        }
        if (confirmPassword !== event.target.value) {
            setPassControl(true);
        }
        if (confirmPassword === event.target.value) {
            setPassControl(false);
        }
    }
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    return (
        <div  >
            <div style={{ marginLeft: "25%", marginRight: "25%", boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)", marginTop: "30px", marginBottom: "30px", paddingTop: "30px", paddingBottom: "30px" }}>
               
                <Form style={{ paddingLeft: "15%", paddingRight: "15%" }}>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }} >Username:</Form.Label>
                        <Form.Control style={{}} type="text" placeholder="" onChange={handleUsername} />
                    </div>

                    {/*<div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Email:</Form.Label>
                        <Form.Control style={{}} type="email" placeholder="" onChange={handleEmail} />

    </div>*/}

                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Password:</Form.Label>
                        <Form.Control style={{}} type="password" placeholder="" onChange={handlePassword} />
                        {charControl && <Form.Text id="register-message">
                            The password field must be at least 5 characters.
                    </Form.Text>}
                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }} >
                        <Form.Label style={{ color: "#526b77", fontWeight: "500", fontSize: "18px" }}>Confirm Password:</Form.Label>
                        <Form.Control style={{}} type="password" placeholder="" onChange={handleConfirmPassword} />
                        {passControl && <Form.Text id="register-message">
                            The password must match confirm password.
                    </Form.Text>}
                    </div>
                    <div style={{ textAlign: "center", width: "100%", marginTop: "30px" }}>
                        <button type="submit" id="sign-up" onClick={event => submit(event)} >
                            SAVE
                </button>
                    </div>
                </Form>
                <div style={{ width: "100%", marginTop: "10px" }}>
                    {/*isExistMail && <Form.Text id="message">
                        Email is already taken.
                    </Form.Text>*/}
                    {isExistUsername && <Form.Text id="message">
                        Username  is already taken.
                    </Form.Text>}
                </div>
            </div>
        </div>
    );

}
export default Profile;
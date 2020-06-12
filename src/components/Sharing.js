import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Form from 'react-bootstrap/Form';
import { db } from '../firebase/index';
import * as firebase from "firebase";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Modal } from 'react-bootstrap';
import './Sharing.css';
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),

		minWidth: 120,
	},
}));
const Sharing = (props) => {

	const [description, setDescription] = useState('');
	const [username, setUsername] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const [isAnon, setIsAnon] = useState(false);
	const [store, setStore] = useState("App Store");
	const [payment, setPayment] = useState("Free App");
	const [authUser, setAuthUser] = useState("");
	const [show, setShow] = useState(false);
	useEffect(() => {
		console.log("xx");
		firebase.auth().onAuthStateChanged(authUser => {
			if (authUser) {
				db.ref('/user').on('value', querySnapShot => {
					querySnapShot.forEach((child) => {
						if (child.val().email === authUser.email) {
							setUsername(child.val().username);
							setUserEmail(child.val().email);
						}
					});
				});
			}
		});

	}, []);
	const handleClose = () => {
		setShow(false);
	}
	const onSwitchSharing = () => {
		setIsAnon(!isAnon);
	};
	const convertDateFormatToPost = (date) => {
		console.log(date);
		let day = date.split("-")[2].length === 1 ? "0" + date.split("-")[2] : date.split("-")[2];
		let month = date.split("-")[1].length === 1 ? "0" + date.split("-")[1] : date.split("-")[1];
		let year = date.split("-")[0];
		console.log(day);
		console.log(date.split("-")[2]);
		return (day + '.' + month + '.' + year);
	}
	const submitSharing = (event) => {
		event.preventDefault();

		if (username === "") {
			console.log("ggr");
			//props.history.push("/login");
		}
		else {

			if (description === "") {

			}
			else {
				var today = new Date();
				var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
				var time = today.getHours() + ":" + today.getMinutes();
				const data = {
					user: username,
					description: description,
					date: convertDateFormatToPost(date),
					time: time,
					isAnon: isAnon,
					store: store,
					payment: payment,
					userEmail:userEmail,
				}
				db.ref('/sharing').push(data);
				setIsAnon(false);
				setDescription("");
				setStore("App Store");
				setPayment("Free App");
			}

		}


	}
	const sharingChange = (event) => {
		setDescription(event.target.value);
	}
	const handleSelectStore = (event) => {
		setStore(event.target.value);
	}
	const handleSelectPayment = (event) => {
		setPayment(event.target.value);

	}
	const showPopUp = () => {
		return (
			<Modal show={show} onHide={handleClose} animation={true} centered backdrop={false} >
				<Modal.Header closeButton>
					<Modal.Title style={{ fontSize: "20px" }}></Modal.Title>
				</Modal.Header>
				<Modal.Body >
					<div style={{}}>

					</div>
				</Modal.Body>
				<Modal.Footer>


				</Modal.Footer>
			</Modal>);
	}
	const classes = useStyles();
	return (
		<div id="sharing-form" >
			{showPopUp()}
			<Form style={{ textAlign: "center" }}>
				<div style={{ paddingLeft: "40px", paddingRight: "40px", textAlign: "center" }}>
					<Form.Label id="sharing-label" >Please provide information of application you are looking for... </Form.Label>
					<Form.Control required as="textarea" rows="3" value={description} onChange={sharingChange} />
				</div>
			</Form>
			<div style={{ textAlign: "center", paddingTop: "20px" }}>
				<div style={{ display: "inline-block", paddingRight: "20px", textAlign: "center" }}>
					<Form.Control as="select" onChange={handleSelectStore} style={{}}>
						<option value="App Store">App Store</option>
						<option value="Google Play">Google Play</option>
					</Form.Control>
				</div>
				<div style={{ display: "inline-block", paddingLeft: "20px", textAlign: "center" }}>
					<Form.Control as="select" onChange={handleSelectPayment} style={{}}>
						<option value="Free">Free</option>
						<option value="Paid">Paid</option>
					</Form.Control>
				</div>
			</div>
			<div style={{ textAlign: "center", paddingTop: "20px" }}>

				<div class="custom-control custom-switch">
					<input checked={isAnon} type="checkbox" onChange={onSwitchSharing} class="custom-control-input" id="customSwitch1" />
					<label class="custom-control-label" for="customSwitch1" style={{ fontSize: "18px", color: "white", fontWeight: "400" }} >Anonymous</label>
				</div>
				{/*<div>
					<input checked={isAnon} onChange={onSwitchSharing} type="checkbox" id="toggle" class="checkbox" />
					<label for="toggle" class="switch">Anonymous</label>
				</div>*/}


			</div>

			<div style={{ textAlign: "center", width: "100%", marginTop: "20px", marginBottom: "15px" }}>
				<button type="submit" onClick={event => submitSharing(event)} id="sendButton" >
					
						<div id="sendButtonHeader"><h2 style={{fontWeight:"400",fontSize:"15px",marginBottom:"0px"}}>SEND</h2></div>
						<div id="sendButtonIcon"><i class="fas fa-arrow-right" style={{width:"100%",heigth:"100%"}} ></i></div>
				
				</button>
			</div>
		</div>
	);

}
export default Sharing;
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
const Sharing = () => {

	const [description, setDescription] = useState('');
	const [username, setUsername] = useState("");
	const [isAnon, setIsAnon] = useState(false);
	const [store, setStore] = useState("App Store");
	const [payment, setPayment] = useState("Free App");
	const [authUser, setAuthUser] = useState("");
	const [show, setShow] = useState(false);
	useEffect(() => {
		firebase.auth().onAuthStateChanged(userAuth => {
			if (authUser) {
				db.ref('/user').on('value', querySnapShot => {
					querySnapShot.forEach((child) => {
						if (child.val().email === userAuth.email) {
							setUsername(child.val().username);
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
		let day = date.split("-")[2];
		let month = date.split("-")[1];
		let year = date.split("-")[0];
		return (day + '.' + month + '.' + year);
	}
	const submitSharing = (event) => {
		event.preventDefault();
		if (username === "") {
			setShow(true);
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

					</div>}
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
					<Form.Label style={{ fontSize: "20px", padding: "5px" }}>Please provide information of application you are looking for... </Form.Label>
					<Form.Control required as="textarea" rows="3" value={description} onChange={sharingChange} />
				</div>
			</Form>
			<div style={{ textAlign: "center", paddingTop: "20px" }}>
				<div style={{ display: "inline", paddingRight: "20px" }}>
					<FormControl variant="filled" className={classes.formControl} >
						<Select
							labelId="demo-simple-select-filled-label"
							style={{ color: 'white', minWidth: 130, maxHeight: 50 }}
							value={store}
							onChange={event => { handleSelectStore(event); }}
						>
							<MenuItem style={{ color: '#152c3b' }} value={"App Store"}> App Store</MenuItem>
							<MenuItem style={{ color: '#152c3b' }} value={"Google Play"}> Google Play</MenuItem>

						</Select>
					</FormControl>
				</div>
				<div style={{ display: "inline", paddingLeft: "20px" }}>
					<FormControl variant="filled" className={classes.formControl} >
						<Select
							labelId="demo-simple-select-filled-label"
							style={{ color: 'white', minWidth: 130, maxHeight: 50 }}
							value={payment}
							onChange={event => { handleSelectPayment(event); }}
						>
							<MenuItem style={{ color: '#152c3b' }} value={"Free App"}> Free App</MenuItem>
							<MenuItem style={{ color: '#152c3b' }} value={"Paid App"}> Paid App</MenuItem>
							<MenuItem style={{ color: '#152c3b' }} value={"Free and Paid"}> Both</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>
			<div style={{ textAlign: "center", paddingTop: "20px" }}>

				<div class="custom-control custom-switch">
					<input checked={isAnon} type="checkbox" onChange={onSwitchSharing} class="custom-control-input" id="customSwitch1" />
					<label class="custom-control-label" for="customSwitch1" style={{ fontSize: "18px" }} >Anonymous</label>
				</div>
				{/*<div>
					<input checked={isAnon} onChange={onSwitchSharing} type="checkbox" id="toggle" class="checkbox" />
					<label for="toggle" class="switch">Anonymous</label>
				</div>*/}


			</div>

			<div style={{ textAlign: "center", width: "100%", marginTop: "30px" }}>
				<button type="submit" onClick={event => submitSharing(event)} style={{ fontWeight: "400", fontSize: "18px", borderWidth: "1px", borderRadius: "8px", color: "white", backgroundColor: "#1a2631", padding: "5px", paddingLeft: "25px", paddingRight: "25px" }}>
					SEND
                </button>
			</div>
		</div>
	);

}
export default Sharing;
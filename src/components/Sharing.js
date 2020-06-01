import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Form from 'react-bootstrap/Form';
import { db } from '../firebase/index';
import * as firebase from "firebase";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
	const [store,setStore]=useState("AppStore");
	const [payment,setPayment]=useState("Free");
	useEffect(() => {
		firebase.auth().onAuthStateChanged(userAuth => {
			db.ref('/user').on('value', querySnapShot => {
				querySnapShot.forEach((child) => {
					if (child.val().email === userAuth.email) {
						setUsername(child.val().username);
					}
				});
			});
		});

	}, []);
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
		var today = new Date();
		var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		var time = today.getHours() + ":" + today.getMinutes();
		const data = {
			user: username,
			description: description,
			date: convertDateFormatToPost(date), 
			time: time,
			isAnon: isAnon,
			store:store,
			payment:payment,
		}
		db.ref('/sharing').push(data);
		setIsAnon(false);
		setDescription("");
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
	const classes = useStyles();
	return (
		<div style={{ padding: "30px", borderRadius: "5px", borderColor: "white", border: "solid", borderWidth: "1px", backgroundColor: "#6F90AF" }} >
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
							style={{ color: 'white', minWidth: 160, maxHeight: 50 }}
							value={store}
							onChange={event => { handleSelectStore(event); }}
						>
							<MenuItem style={{ color: '#152c3b' }} value={"AppStore"}> App Store</MenuItem>
							<MenuItem style={{ color: '#152c3b' }} value={"GooglePlay"}> Google Play</MenuItem>

						</Select>
					</FormControl>
				</div>
				<div style={{ display: "inline", paddingLeft: "20px" }}>
					<FormControl variant="filled" className={classes.formControl} >
						<Select
							labelId="demo-simple-select-filled-label"
							style={{ color: 'white', minWidth: 160, maxHeight: 50 }}
							value={payment}
							onChange={event => { handleSelectPayment(event); }}
						>
							<MenuItem style={{ color: '#152c3b' }} value={"Free"}> Free App</MenuItem>
							<MenuItem style={{ color: '#152c3b' }} value={"Paid"}> Paid App</MenuItem>
							<MenuItem style={{ color: '#152c3b' }} value={"Both"}> Both</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>
			<div style={{ textAlign: "center", paddingTop: "20px" }}>
				<Form>
					<Form.Check id="custom-switch" type="switch" onChange={onSwitchSharing} label="Anonymous" style={{ fontSize: "18px" }} />
				</Form>
			</div>

			<div style={{ textAlign: "center", width: "100%", marginTop: "30px" }}>
				<button type="submit" onClick={event => submitSharing(event)} style={{ fontWeight: "400", fontSize: "18px", borderRadius: "8px", color: "white", backgroundColor: "#6F90AF", padding: "5px", paddingLeft: "25px", paddingRight: "25px" }}>
					SEND
                </button>
			</div>
		</div>
	);

}
export default Sharing;
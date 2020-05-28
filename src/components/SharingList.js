import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import { db } from '../firebase/index';

const SharingList = () => {
	const [sharings, setSharings] = useState([]);
	const [commentList, setCommentList] = useState([]);
	useEffect(() => {
		db.ref('/sharing').on('value', querySnapShot => {
			let values = [];
			querySnapShot.forEach((child) => {
				values.push({sharingId:child.ref.key,sharing:child.val()})
			});
			setSharings(values);
		});
	}, []);
	const makeSuggestion = (event,id) => {
		event.preventDefault();
		console.log(id);
	}

	return (
		<div style={{ marginTop: "15px" }} >
			{sharings.map((sharings, index) => (
				<Container key={index} className={"border border-dark bg-dark text-white"} style={{ borderRadius: "5px", marginTop: "5px", marginBottom: "5px" }}>
					<Row style={{ marginTop: "0px" }}>
						<Col style={{ fontSize: "20px" }} >From: {sharings.sharing.user}</Col>
						<Col style={{ fontSize: "20px" }}>{sharings.sharing.date}</Col>
					</Row>
					<Row style={{ marginTop: "10px" }}>
						<Col style={{ fontSize: "20px" }}>
							{sharings.sharing.description}
						</Col>
						<Col style={{ fontSize: "20px" }}>
							<button onClick={(event)=> {makeSuggestion(event,sharings.sharingId)}}>Click</button>
						</Col>
					</Row>
				</Container>
			))}
		</div>
	);

}
export default SharingList;
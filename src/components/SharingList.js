import React, { useState, useEffect } from "react";
import {Card} from 'react-bootstrap';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import { db } from '../firebase/index';

const SharingList = ()=>{
	

    const [sharings,setSharings] = useState([]);
    const [commentList, setCommentList] = useState([]);
    useEffect(() => {
		console.log("eee");
		db.ref('/sharing').on('value', querySnapShot => {
            let values = [];
            querySnapShot.forEach((child) => {
					values.push(child.val())
					console.log(child.val());
			});
			setSharings(values);
		});
      }, []);
	
		return(	
				<div>	
					{sharings.map((sharing,index) => (
						<Card className={"border border-dark bg-dark text-white"} style={{marginBottom:"10px"}}>
								<Card.Header key={index} className="row" >
										<div className="col">From: {sharing.user="" ? "Anonymous":sharing.user}</div>
										<div className="col">{sharing.description}</div>
										<div className="col ">{sharing.sharingDate}</div>
									</Card.Header>
								<Card.Body key={index}>
										
								</Card.Body>
						</Card>
					))}
				</div>
		);

}
export default SharingList;
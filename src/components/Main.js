import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Sharing from './Sharing';
import SharingList from './SharingList';
const Main=()=> {

	return (
		<div >
	        <div style={{ margin:"20%",marginTop:"30px",marginBottom:"10px" }}>
                <Sharing/>
                <SharingList/>

            </div>
        </div>
  );
}

export default Main;

import React from 'react';
import Sharing from './Sharing';
import SharingList from './SharingList';
import AppSlide from './AppSlide';
const Main = () => {

  return (
    <div >
      {/*<div style={{ padding: "10%", paddingTop: "0px", paddingBottom: "0px" }}>
        <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
          <Sharing />
        </div>
        <div style={{ display: "inline-block", width: "70%", height: "100%" }}>
          <SharingList />
        </div>
        <div style={{ display: "inline-block", width: "30%", height: "100%", verticalAlign: "top" }}>
          <AppSlide />
        </div>
        </div>*/}
      <div style={{ padding: "10%", paddingTop: "0px", paddingBottom: "0px" }}>
        <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
          <Sharing />
        </div>
        <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
          <SharingList />
        </div>
        
      </div>
    </div>
  );
}

export default Main;

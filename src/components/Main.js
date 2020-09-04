import React from 'react';
import Sharing from './Sharing';
import SharingList from './SharingList';
import AppSlide from './AppSlide';
import Page from 'react-page-loading'

const Main = () => {

    return (
        <div >
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>

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
            </Page>
        </div>
    );
}

export default Main;

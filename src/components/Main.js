import React from 'react';
import Sharing from './Sharing';
import SharingList from './SharingList';
import Page from 'react-page-loading'
import { useMediaQuery } from 'react-responsive';
const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}
const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
}
const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
}
const Main = () => {

    return (
        <div >
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Desktop>
                   
                <div style={{ padding: "10%", paddingTop: "0px", paddingBottom: "0px" }}>
                    <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
                        <Sharing />
                    </div>
                    <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
                        <SharingList />
                    </div>

                </div>
                </Desktop>
                
            </Page>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Tablet>
                   
                <div style={{ padding: "10%", paddingTop: "0px", paddingBottom: "0px" }}>
                    <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
                        <Sharing />
                    </div>
                    <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
                        <SharingList />
                    </div>

                </div>
                </Tablet>
                
            </Page>
            <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4}>
                <Mobile>
                    
                <div style={{ padding: "5px", paddingTop: "0px", paddingBottom: "0px" }}>
                    <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
                        <Sharing />
                    </div>
                    <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
                        <SharingList />
                    </div>

                </div>
                </Mobile>
                
            </Page>
        </div>
    );
}

export default Main;

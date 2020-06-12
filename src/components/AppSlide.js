import React, { useState, } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './AppSlider.css';
import { useHistory } from 'react-router-dom';
const AppSlide = () => {
	const downloadApp = () => {

	}
	const history = useHistory();
	const renderRedirect = () => {
        history.push(`/share`)
      }
	return (
		<div>
		<div style={{ marginLeft:"10px",marginRight:"10px",boxShadow:"0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",border:"solid",borderWidth:"1px",borderRadius: "0px" }}>
			<div id="header"><h2 style={{ fontWeight: "500", fontSize: "20px" }}>New Applications</h2></div>
			<CarouselProvider
				naturalSlideWidth={130}
				naturalSlideHeight={75}
				totalSlides={4}
				orientation="vertical"
				interval={5000}
				isPlaying={true}
				visibleSlides={3}
			>
				<Slider>
					<Slide index={0}>
						<div style={{ marginBottom:"5px", backgroundColor: "white", padding: "5px", borderRadius: "5px" ,boxShadow:"0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)"}}>
							<div style={{ marginTop: "0px", width: "100%" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "rgb(243, 82, 82)", fontSize: "20px", fontWeight: "500", float: "left", marginBottom: "0px" }}>Evdeiz</h1>
									<h1 style={{ color: "#616364 ", fontSize: "15px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >01.02.2020</h1>
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
								<div style={{ width: "100%" }}>
									<h1 style={{ fontSize: "15px", fontWeight: "500", color: "#1a2631" }}>Etkinliklere ulaşmak için kgrfjgdl kgrfjgdl indirebilrisiniz</h1>
								</div>
							</div>
							<div style={{ width: "100%", verticalAlign: "middle" }}>
								<div style={{ width: "100%", display: "inline-block" }}>

									<div style={{ display: "flex", float: "left" }}>
										<h2 id="suggestion-header" >iremxkaya</h2>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0,overflow:"auto" }}>
										<div style={{ paddingRight: "3px" }}>
											<h2 style={{ fontSize: "13px", fontWeight: "500", marginLeft: "2px", display: "inline", marginRight: "2px", color: "rgb(151, 140, 140)" }}>AppStore</h2>
											<div style={{ fontSize: "13px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										<div style={{ paddingRight: "3px" }}>
											<h2 style={{ fontSize: "13px", fontWeight: "500", marginLeft: "2px", display: "inline", marginRight: "2px", color: "rgb(151, 140, 140)" }}>Parasız</h2>
											<div style={{ fontSize: "13px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										<div>
											<button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { }}><i class="fas fa-arrow-down" style={{ color: "#1a2631", fontSize: "20px" }}></i></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Slide>
					<Slide index={1}>
						<div style={{ marginBottom:"5px", backgroundColor: "white", padding: "5px", borderRadius: "5px" ,boxShadow:"0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)"}}>

							<div style={{ marginTop: "0px", width: "100%" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "rgb(243, 82, 82)", fontSize: "20px", fontWeight: "500", float: "left", marginBottom: "0px" }}>FindAppy</h1>
									<h1 style={{ color: "#616364 ", fontSize: "15px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >01.02.2020</h1>
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
								<div style={{ width: "100%" }}>
									<h1 style={{ fontSize: "15px", fontWeight: "500", color: "#1a2631" }}>Etkinliklere ulaşmak için kgrfjgdl indirebilrisiniz</h1>
								</div>
							</div>
							<div style={{ width: "100%", verticalAlign: "middle" }}>
								<div style={{ width: "100%", display: "inline-block" }}>

									<div style={{ display: "flex", float: "left" }}>
										<h2 id="suggestion-header" >ixxxkaya</h2>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0,overflow:"auto"  }}>
										<div style={{ paddingRight: "3px" }}>
											<h2 style={{ fontSize: "13px", fontWeight: "500", marginLeft: "2px", display: "inline", marginRight: "2px", color: "rgb(151, 140, 140)" }}>AppStore</h2>
											<div style={{ fontSize: "13px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										<div style={{ paddingRight: "3px" }}>
											<h2 style={{ fontSize: "13px", fontWeight: "500", marginLeft: "2px", display: "inline", marginRight: "2px", color: "rgb(151, 140, 140)" }}>Parasız</h2>
											<div style={{ fontSize: "13px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										<div>
											<button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { }}><i class="fas fa-arrow-down" style={{ color: "#1a2631", fontSize: "20px" }}></i></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Slide>
					<Slide index={2}>
						<div style={{marginBottom:"5px",  backgroundColor: "white", padding: "5px", borderRadius: "5px" ,boxShadow:"0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)"}}>

							<div style={{ marginTop: "0px", width: "100%" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "rgb(243, 82, 82)", fontSize: "20px", fontWeight: "500", float: "left", marginBottom: "0px" }}>Nebu</h1>
									<h1 style={{ color: "#616364 ", fontSize: "15px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >01.02.2020</h1>
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
								<div style={{ width: "100%" }}>
									<h1 style={{ fontSize: "15px", fontWeight: "500", color: "#1a2631" }}>n kgrfjgdl indirebilrisiniz</h1>
								</div>
							</div>
							<div style={{ width: "100%", verticalAlign: "middle" }}>
								<div style={{ width: "100%", display: "inline-block" }}>

									<div style={{ display: "flex", float: "left" }}>
										<h2 id="suggestion-header" >iremk</h2>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0,overflow:"auto"  }}>
										<div style={{ paddingRight: "3px" }}>
											<h2 style={{ fontSize: "13px", fontWeight: "500", marginLeft: "2px", display: "inline", marginRight: "2px", color: "rgb(151, 140, 140)" }}>AppStore</h2>
											<div style={{ fontSize: "13px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										<div style={{ paddingRight: "3px" }}>
											<h2 style={{ fontSize: "13px", fontWeight: "500", marginLeft: "2px", display: "inline", marginRight: "2px", color: "rgb(151, 140, 140)" }}>Parasız</h2>
											<div style={{ fontSize: "13px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										<div>
											<button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { }}><i class="fas fa-arrow-down" style={{ color: "#1a2631", fontSize: "20px" }}></i></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Slide>
					<Slide index={3}>
						<div style={{marginBottom:"5px",  backgroundColor: "white", padding: "5px", borderRadius: "5px",boxShadow:"0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)" }}>

							<div style={{ marginTop: "0px", width: "100%" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "rgb(243, 82, 82)", fontSize: "20px", fontWeight: "500", float: "left", marginBottom: "0px" }}>Last</h1>
									<h1 style={{ color: "#616364 ", fontSize: "15px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >01.02.2020</h1>
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
								<div style={{ width: "100%" }}>
									<h1 style={{ fontSize: "15px", fontWeight: "500", color: "#1a2631" }}>indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisiniz</h1>
								</div>
							</div>
							<div style={{ width: "100%", verticalAlign: "middle" }}>
								<div style={{ width: "100%", display: "inline-block" }}>

									<div style={{ display: "flex", float: "left" }}>
										<h2 id="suggestion-header" >asluser</h2>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0,overflow:"auto"  }}>
										<div style={{ paddingRight: "3px" }}>
											<h2 style={{ fontSize: "13px", fontWeight: "500", marginLeft: "2px", display: "inline", marginRight: "2px", color: "rgb(151, 140, 140)" }}>AppStore</h2>
											<div style={{ fontSize: "13px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										<div style={{ paddingRight: "3px" }}>
											<h2 style={{ fontSize: "13px", fontWeight: "500", marginLeft: "2px", display: "inline", marginRight: "2px", color: "rgb(151, 140, 140)" }}>Parasız</h2>
											<div style={{ fontSize: "13px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "rgb(151, 140, 140)" }}></i></div>
										</div>
										<div>
											<button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { }}><i class="fas fa-arrow-down" style={{ color: "#1a2631", fontSize: "20px" }}></i></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Slide>
					
				</Slider>

			</CarouselProvider>
			

		</div>
		<div style={{ paddingTop: "10px", paddingBottom: "10px", marginLeft:"10px",marginRight:"10px"}}>
		<h3 style={{ color: "#616364", fontSize: "15px", fontWeight: "500",display:"inline" }}>If you can share application, click </h3>
		<button type="button"  onClick={renderRedirect} style={{ backgroundColor: "Transparent", border: "none", display: "inline", padding: 0 }}>
			<h3 style={{ color: "#1a2631", fontSize: "15px", fontWeight: "500", }}>here.</h3>
		</button>
	</div>
	</div>
	);
}

export default AppSlide;

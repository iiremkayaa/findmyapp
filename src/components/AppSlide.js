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
		<div style={{ padding: "5px", marginTop: "50px", marginBottom: "50px",/*border:"solid 1px lightgray",*/borderRadius: "5px" }}>
			<div id="header"><h2 style={{ fontWeight: "500", fontSize: "35px" }}>New Applications</h2></div>
			<CarouselProvider
				naturalSlideWidth={100}
				naturalSlideHeight={55}
				totalSlides={6}
				orientation="vertical"
				interval={5000}
				isPlaying={true}
				visibleSlides={4}
			>
				<Slider>
					<Slide index={0}>
						<div style={{ backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>
							<div style={{ marginTop: "0px", width: "100%" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "#1a2631", fontSize: "25px", fontWeight: "500", float: "left", marginBottom: "0px" }}>Evdeiz</h1>
									<h1 style={{ color: "#616364 ", fontSize: "18px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >01.02.2020</h1>
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
								<div style={{ width: "100%" }}>
									<h1 style={{ fontSize: "16px", fontWeight: "500", color: "#1a2631" }}>Etkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisiniz</h1>
								</div>
							</div>
							<div style={{ width: "100%", verticalAlign: "middle" }}>
								<div style={{ width: "100%", display: "inline-block" }}>

									<div style={{ display: "flex", float: "left" }}>
										<h2 id="suggestion-header" >iremkaya</h2>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0 }}>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "16px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>AppStore</h2>
											<div style={{ fontSize: "16px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
										</div>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "16px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>Parasız</h2>
											<div style={{ fontSize: "16px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
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
						<div style={{ backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>

							<div style={{ marginTop: "0px", width: "100%" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "#1a2631", fontSize: "25px", fontWeight: "500", float: "left", marginBottom: "0px" }}>FindAppy</h1>
									<h1 style={{ color: "#616364 ", fontSize: "18px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >01.02.2020</h1>
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
								<div style={{ width: "100%" }}>
									<h1 style={{ fontSize: "16px", fontWeight: "500", color: "#1a2631" }}>Etkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisiniz</h1>
								</div>
							</div>
							<div style={{ width: "100%", verticalAlign: "middle" }}>
								<div style={{ width: "100%", display: "inline-block" }}>

									<div style={{ display: "flex", float: "left" }}>
										<h2 id="suggestion-header" >iremkaya</h2>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0 }}>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "18px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>AppStore</h2>
											<div style={{ fontSize: "18px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
										</div>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "18px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>Parasız</h2>
											<div style={{ fontSize: "18px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
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
						<div style={{ backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>

							<div style={{ marginTop: "0px", width: "100%" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "#1a2631", fontSize: "25px", fontWeight: "500", float: "left", marginBottom: "0px" }}>Nebu</h1>
									<h1 style={{ color: "#616364 ", fontSize: "18px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >01.02.2020</h1>
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
								<div style={{ width: "100%" }}>
									<h1 style={{ fontSize: "16px", fontWeight: "500", color: "#1a2631" }}>Etkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisiniz</h1>
								</div>
							</div>
							<div style={{ width: "100%", verticalAlign: "middle" }}>
								<div style={{ width: "100%", display: "inline-block" }}>

									<div style={{ display: "flex", float: "left" }}>
										<h2 id="suggestion-header" >iremkaya</h2>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0 }}>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "16px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>AppStore</h2>
											<div style={{ fontSize: "16px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
										</div>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "16px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>Parasız</h2>
											<div style={{ fontSize: "16px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
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
						<div style={{ backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>

							<div style={{ marginTop: "0px", width: "100%" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "#1a2631", fontSize: "25px", fontWeight: "500", float: "left", marginBottom: "0px" }}>Last</h1>
									<h1 style={{ color: "#616364 ", fontSize: "18px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >01.02.2020</h1>
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
								<div style={{ width: "100%" }}>
									<h1 style={{ fontSize: "16px", fontWeight: "500", color: "#1a2631" }}>Etkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisiniz</h1>
								</div>
							</div>
							<div style={{ width: "100%", verticalAlign: "middle" }}>
								<div style={{ width: "100%", display: "inline-block" }}>

									<div style={{ display: "flex", float: "left" }}>
										<h2 id="suggestion-header" >iremkaya</h2>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0 }}>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "18px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>AppStore</h2>
											<div style={{ fontSize: "18px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
										</div>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "18px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>Parasız</h2>
											<div style={{ fontSize: "18px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
										</div>
										<div>
											<button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { }}><i class="fas fa-arrow-down" style={{ color: "#1a2631", fontSize: "20px" }}></i></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Slide>
					<Slide index={4}>
						<div style={{ backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>
							<div style={{ marginTop: "0px", width: "100%" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "#1a2631", fontSize: "25px", fontWeight: "500", float: "left", marginBottom: "0px" }}>Downloader</h1>
									<h1 style={{ color: "#616364 ", fontSize: "18px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >01.02.2020</h1>
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
								<div style={{ width: "100%" }}>
									<h1 style={{ fontSize: "16px", fontWeight: "500", color: "#1a2631" }}>Etkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisiniz</h1>
								</div>
							</div>
							<div style={{ width: "100%", verticalAlign: "middle" }}>
								<div style={{ width: "100%", display: "inline-block" }}>

									<div style={{ display: "flex", float: "left" }}>
										<h2 id="suggestion-header" >iremkaya</h2>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0 }}>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "16px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>AppStore</h2>
											<div style={{ fontSize: "16px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
										</div>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "16px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>Parasız</h2>
											<div style={{ fontSize: "16px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
										</div>
										<div>
											<button style={{ backgroundColor: "Transparent", border: "none", display: "inline" }} onClick={(event) => { }}><i class="fas fa-arrow-down" style={{ color: "#1a2631", fontSize: "20px" }}></i></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Slide>
					<Slide index={5}>
						<div style={{ backgroundColor: "white", padding: "5px", borderRadius: "5px" }}>
							<div style={{ marginTop: "0px", width: "100%" }}>
								<div style={{ width: "100%", display: "inline-block" }} >
									<h1 style={{ color: "#1a2631", fontSize: "25px", fontWeight: "500", float: "left", marginBottom: "0px" }}>InstaFollow</h1>
									<h1 style={{ color: "#616364 ", fontSize: "18px", fontWeight: "500", display: "inline", float: "right", marginBottom: "0px" }} >01.02.2020</h1>
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
								<div style={{ width: "100%" }}>
									<h1 style={{ fontSize: "16px", fontWeight: "500", color: "#1a2631" }}>Etkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisinizEtkinliklere ulaşmak için kgrfjgdl indirebilrisiniz</h1>
								</div>
							</div>
							<div style={{ width: "100%", verticalAlign: "middle" }}>
								<div style={{ width: "100%", display: "inline-block" }}>

									<div style={{ display: "flex", float: "left" }}>
										<h2 id="suggestion-header" >iremkaya</h2>
									</div>
									<div style={{ display: "flex", float: "right", margin: 0, padding: 0 }}>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "16px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>AppStore</h2>
											<div style={{ fontSize: "16px", display: "inline" }}><i class="fas fa-mobile-alt" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
										</div>
										<div style={{ paddingRight: "15px" }}>
											<h2 style={{ fontSize: "16px", fontWeight: "500", marginLeft: "5px", display: "inline", marginRight: "5px", color: "#1a2631" }}>Parasız</h2>
											<div style={{ fontSize: "16px", display: "inline" }}><i class="fas fa-dollar-sign" style={{ width: "25px", height: "25px", color: "#1a2631" }}></i></div>
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
			<div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
				<h3 style={{ color: "#616364", fontSize: "20px", fontWeight: "500",display:"inline" }}>If you can share application, click </h3>
				<button type="button"  onClick={renderRedirect} style={{ backgroundColor: "Transparent", border: "none", display: "inline", padding: 0 }}>
					<h3 style={{ color: "#1a2631", fontSize: "20px", fontWeight: "500", }}>here.</h3>
				</button>
			</div>

		</div>
	);
}

export default AppSlide;

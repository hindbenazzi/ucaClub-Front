import React from 'react'

export default function Parallax() {
    return (
        <div>
            <div id="parallax123" className="parallax parallax-one clearfix margint60">
			<div className="support-section">
				<div className="container">
					<div className="row">
						<div className="col-lg-4 col-sm-4">
							<div className="flip-container" onTouchStart="this.classNameList.toggle('hover');">
								<div className="flipper">
									<div className="support-box pos-center front">
										<div className="support-box-title"><i className="fa fa-phone"></i></div>
										<h4>APPELEZ-NOUS</h4>
									</div>
									<div className="support-box pos-center back">
										<div className="support-box-title"><i className="fa fa-phone"></i></div>
										<h4>NUMERO DE TELEPHONE</h4>
										<p className="margint20"><br />0623-512698</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-4">
							<div className="flip-container" onTouchStart="this.classNameList.toggle('hover');">
								<div class="flipper">
									<div className="support-box pos-center front">
										<div className="support-box-title"><i className="fa fa-envelope"></i></div>
										<h4>ENVOYEZ NOUS UN E-MAIL</h4>
									</div>
									<div className="support-box pos-center back">
										<div className="support-box-title"><i className="fa fa-envelope"></i></div>
										<h4>E-MAIL</h4>
										<p className="margint20"><br />ucacom@uca.com</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-4">
							<div className="flip-container" onTouchStart="this.classNameList.toggle('hover');">
								<div className="flipper">
									<div className="support-box pos-center front">
										<div className="support-box-title"><i className="fa fa-home"></i></div>
										<h4>VISITEZ NOUS</h4>
									</div>
									<div className="support-box pos-center back">
										<div className="support-box-title"><i className="fa fa-home"></i></div>
										<h4>NOTRE ADDRESSE</h4>
										<p className="margint20">149 Rue Ibn Zohair, Marrakech 40000</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

        </div>
    )
}

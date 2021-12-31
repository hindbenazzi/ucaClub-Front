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
										<h4>CALL US</h4>
										<p className="margint20">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut ferme fentum</p>
									</div>
									<div className="support-box pos-center back">
										<div className="support-box-title"><i className="fa fa-phone"></i></div>
										<h4>PHONE NUMBER</h4>
										<p className="margint20">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, et.<br />+61 3 8376 6284</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-4">
							<div className="flip-container" onTouchStart="this.classNameList.toggle('hover');">
								<div class="flipper">
									<div className="support-box pos-center front">
										<div className="support-box-title"><i className="fa fa-envelope"></i></div>
										<h4>SEND US E-MAIL</h4>
										<p className="margint20">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut ferme fentum</p>
									</div>
									<div className="support-box pos-center back">
										<div className="support-box-title"><i className="fa fa-envelope"></i></div>
										<h4>E-MAIL ADDRESS</h4>
										<p className="margint20">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, et.<br />luxen@2035themes.com</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-sm-4">
							<div className="flip-container" onTouchStart="this.classNameList.toggle('hover');">
								<div className="flipper">
									<div className="support-box pos-center front">
										<div className="support-box-title"><i className="fa fa-home"></i></div>
										<h4>VISIT US</h4>
										<p className="margint20">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut ferme fentum</p>
									</div>
									<div className="support-box pos-center back">
										<div className="support-box-title"><i className="fa fa-home"></i></div>
										<h4>COMPANY ADDRESS</h4>
										<p className="margint20">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, et.<br />Manhattan square. 124 avenue. Bodrum</p>
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

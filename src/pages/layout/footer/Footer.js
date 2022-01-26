import React from 'react'
import logo from'./../../../images/logoFST.png';

export default function Footer() {
    return (
        <div>
            	<div className="footer margint40">
			<div className="main-footer">
				<div className="container">
					<div className="row">
						<div className="col-lg-2 col-sm-2 footer-logo">
							<img alt="Logo" src={logo} style={{width : '60px', height:'80px'}} className="img-responsive" />
						</div>
						<div className="col-lg-10 col-sm-10">
							
							<div className="col-lg-3 col-sm-3">
								<h6>CONTACT</h6>
								<ul className="footer-links">
									<li><p><i className="fa fa-map-marker"></i> 149 Rue Ibn Zohair, Marrakech 40000 </p></li>
									<li><p><i className="fa fa-phone"></i> 0623-512698</p></li>
									<li><p><i className="fa fa-envelope"></i> <a href="mailto:ucacom@uca.com">ucacom@uca.com</a></p></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			
        </div>
        </div>
    )
}

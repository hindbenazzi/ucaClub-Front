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
								<h6>TOUCH WITH US</h6>
								<ul className="footer-links">
									<li><a href="#">Facebook</a></li>
									<li><a href="#">Twitter</a></li>
									<li><a href="#">Google +</a></li>
									<li><a href="#">otels.com</a></li>
									<li><a href="#">Tripadvisor</a></li>
								</ul>
							</div>
							<div className="col-lg-3 col-sm-3">
								<h6>ABOUT LUXEN</h6>
								<ul className="footer-links">
									<li><a href="404.html">Error Page</a></li>
									<li><a href="about.html">About</a></li>
									<li><a href="blog.html">Blog</a></li>
									<li><a href="blog-details.html">Blog Single</a></li>
									<li><a href="category-grid.html">Category Grid</a></li>
									<li><a href="category-list.html">Category List</a></li>
								</ul>
							</div>
							<div className="col-lg-3 col-sm-3">
								<h6>PAGES SITE</h6>
								<ul className="footer-links">
									<li><a href="contact.html">Contact</a></li>
									<li><a href="gallery.html">Gallery</a></li>
									<li><a href="index-full-screen.html">Home Full Screen</a></li>
									<li><a href="left-sidebar-page.html">Left Sidebar Page</a></li>
									<li><a href="right-sidebar-page.html">Right Sidebar Page</a></li>
									<li><a href="room-single.html">Room Single</a></li>
									<li><a href="under-construction.html">Under Construction</a></li>
								</ul>
							</div>
							<div className="col-lg-3 col-sm-3">
								<h6>CONTACT</h6>
								<ul className="footer-links">
									<li><p><i className="fa fa-map-marker"></i> Lorem ipsum dolor sit amet lorem Victoria 8011 Australia </p></li>
									<li><p><i className="fa fa-phone"></i> +61 3 8376 6284 </p></li>
									<li><p><i className="fa fa-envelope"></i> <a href="mailto:info@2035themes.com">info@2035themes.com</a></p></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="pre-footer">
				<div className="container">
					<div className="row">
						<div className="pull-left"><p>© LUXEN OTELS 2014</p></div>
						
					</div>
				</div>
			</div>
        </div>
        </div>
    )
}

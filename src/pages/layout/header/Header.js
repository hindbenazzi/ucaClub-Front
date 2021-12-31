import React from 'react'
import logo from'./../../../images/logoFST.png';
import {Link , Router} from "react-router-dom";
import img from  './../../../images/default-user-icon-.jpg'
import logout from  './../../../images/logout.png'

export default function Header(props) {
	let active = props.active;
	/*function menuToggle(){
		const toggleMenu = document.querySelector('.menu');
		toggleMenu.classList.toggle('active');
	}*/
    return (
		<div id="wrapper">
		<div className="main-header">
			<div className="container">
				<div className="row">
					<div className="pull-left">
						<div className="logo">
							<a href="index.html"><img alt="Logo" src={logo} className="img-responsive" style={{width : '60px', height:'80px'}} /></a>
						</div>
					</div>
					<div className="pull-right">
						<div className="pull-left">
							<nav className="nav">
								<ul id="navigate" className="sf-menu navigate">
									
									<li  className={active == 'home' ? 'active' : ''}><Link to={{ pathname: "/home" }} >ACCUEIL</Link>
									</li>
									<li ><a href="#" className= {active == 'about' ? 'active' : ''}>A PROPOS</a>
									</li>
								
									<li><a href="contact.html">CONTACT</a></li>
								
									<div className="dropdown">
									<img src={img}  style={{width : '40px', height:'40px', marginBottom :'10px'}} />
									<div className="dropdown-content">
									<a href="#"><img src={logout} style={{width : '19px', height:'19px' ,marginRight:'6px'}}/> Déconnecter</a>							
									</div>
									</div>
									
								</ul>

							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
			
        
    )
}


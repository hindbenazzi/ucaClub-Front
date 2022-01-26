import React from 'react'
import logo from'./../../../images/logoFST.png';
import {Link , Router} from "react-router-dom";
import img from  './../../../images/default-user-icon-.jpg'
import logout from  './../../../images/logout.png'
import { useUserDispatch, signOutClient } from "../../../context/UserContext";

export default function Header(props) {
	var userDispatch = useUserDispatch();
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
									<li  href="#" className= {active == 'userSpace' ? 'active' : ''}><Link to={{ pathname: "/userSpace" }} >MES RESERVATIONS</Link>
									</li>
								
								
									<div className="dropdown">
									<img src={img}  style={{width : '40px', height:'40px', marginBottom :'10px'}} />
									<div className="dropdown-content">
									<a  onClick={() => signOutClient(userDispatch, props.history)}><img src={logout} style={{cursor:"pointer", float:"left", width : '19px', height:'19px' ,marginRight:'6px'}}/> Déconnecter</a>							
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


import React  , { useState, useEffect  } from 'react';
import {Link , useParams} from "react-router-dom";
import axios from 'axios';
import Header from './../layout/header/Header'
import Footer from '../layout/footer/Footer'
import SliderBook from './../layout/sliderBook/SliderBook'
import Parallax from '../layout/parallax/Parallax'
import shape from '../../images/shape.png'
import { useAlert } from "react-alert";
import { useUserDispatch, signOutClient } from "../../context/UserContext";
const urlgetAllType = "http://127.0.0.1:8000/api/types"

export default function Home(props) {
	const alert = useAlert();
	var userDispatch = useUserDispatch();
	const [types ,setTypes] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
		const token=localStorage.getItem('id_token');
		const user=localStorage.getItem('user');
		console.log(user)
        await axios.get(urlgetAllType,{ headers: {"Authorization" :token} }).then(
			(response)=>{
				setTypes(response.data);
			}
		).catch((error)=>{
			if (error.response) {
				if(error.response.status==401){
					alert.error("Votre session a expiré! reconnectez vous s'il vous plais");
					signOutClient(userDispatch, props.history)
				  }
			   
			  }
		});
	}
		
		
		fetchData();
    }, []);

    return (
		<div>
		<link rel="stylesheet" href="css/bootstrap.min.css" />
		<link rel="stylesheet" href="css/main.css" />
		<Header active={'home'}></Header>
		<div className="breadcrumb breadcrumb-1 pos-center">
		<h1> RESERVATION </h1>

</div>
<SliderBook typesLocal= {types}></SliderBook>

<div className="content">
		<div className="about clearfix">
		<div className="container">
			<div className="row">
				<div className="about-title pos-center mt-7" style ={{marginTop : '100px'}} >
					<h3>BIENVENUE A CLUB UCA</h3>
					<div className="title-shape"><img alt="Shape" src={shape}/></div>
				</div>
				</div>
				</div> 
				</div>
			 

	<Parallax></Parallax>
		 <div className="newsletter-section">
		<div className="container">
			<div className="row">
				<div className="newsletter-top pos-center margint30">
					<img alt="Shape Image" src={shape} />
				</div>
				
			</div>
		</div>
	</div>

	<Footer></Footer>   
	</div>       
	</div>
    )
}

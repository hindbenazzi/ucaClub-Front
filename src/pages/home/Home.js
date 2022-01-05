import React  , { useState, useEffect  } from 'react';
import {Link , useParams} from "react-router-dom";
import axios from 'axios';
import Header from './../layout/header/Header'
import Footer from '../layout/footer/Footer'
import SliderBook from './../layout/sliderBook/SliderBook'
import Parallax from '../layout/parallax/Parallax'
import shape from '../../images/shape.png'

const urlgetAllType = "http://127.0.0.1:8000/types"

export default function Home() {
	const [types ,setTypes] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
		try{
        const result = await axios(urlgetAllType);
        setTypes(result.data);
		}
		catch(err){
		console.log(err);
		}
		};
		fetchData();
    }, []);

    return (
        <div>
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
						<h3>WELCOME TO CLUB UCA</h3>
						<div className="title-shape"><img alt="Shape" src={shape}/></div>
						<p>Nullam quis risus eget urna mollis ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum. Praesent <span className="active-color">commodo</span> cursus magna, vel scelerisque nisl .Nulleget urna mattis consectetur purus sit amet fermentum</p>
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
					<div className="newsletter-form margint40 pos-center">
						<div className="newsletter-wrapper">
							<div className="pull-left">
								<h2>Sign up newsletter</h2>
							</div>
							<div className="pull-left">
								<form action="#" method="post" id="ajax-contact-form">
									<input type="text" placeholder="Enter a e-mail address"/>
									<input type="submit" value="SUBSCRIBE" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

        <Footer></Footer>   
		</div>       
        </div>
    )
}

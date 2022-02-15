import React from "react";
import { Button } from '@material-ui/core';
import { useAlert } from "react-alert";
import axios from "axios";
import Header from './../layout/header/Header'
import Footer from '../layout/footer/Footer'
import shape from '../../images/shape.png'
import { useUserDispatch, signOutClient } from "../../context/UserContext";
const baseURL = "http://127.0.0.1:8000/api/reservation/idMembre/"
const baseURL1 = "http://127.0.0.1:8000/reservation/annuler/";

export default function UserSpace(props) {
	const alert = useAlert();
	var userDispatch = useUserDispatch();
	const [reservations, setReservations] = React.useState([]);
	const fetchData = async () => {
		const token = localStorage.getItem('id_token');
		await axios.get(baseURL + localStorage.getItem('user'), { headers: { "Authorization": token } }).then((response) => {
			setReservations(response.data);
			console.log(response.data)
		}).catch((error) => {
			if (error.response) {
				if (error.response.status == 401) {
					alert.error("Votre session a expiré! reconnectez vous s'il vous plais");
					signOutClient(userDispatch, props.history)
				}
			}

		});
	}
	React.useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem('id_token');
			await axios.get(baseURL + localStorage.getItem('user'), { headers: { "Authorization": token } }).then((response) => {
				setReservations(response.data);
				console.log(response.data)
			}).catch((error) => {
				if (error.response) {
					if (error.response.status == 401) {
						alert.error("Votre session a expiré! reconnectez vous s'il vous plais");
						signOutClient(userDispatch, props.history)
					}
				}

			});
		}
		fetchData()

	}, []);
	const annuler = async ($id) => {
		await axios.put(baseURL1 + $id).then((response) => {
			console.log(response.data)
			fetchData()
		})
	}
	const toTimestamp = (timeStamp_value) => {
		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		var theDate = new Date(timeStamp_value * 1000);
		let dateString = theDate.toGMTString();

		return theDate.getDate() + '-' + (theDate.getMonth() + 1) + '-' + theDate.getFullYear();
	}
	const reservationList = reservations.map((item) => {
		return <div className="card surface-shadow-2">
			Votre reservation effectué le  <b>{toTimestamp(item.dateReservation)}</b>&nbsp;
			pour une période de <b>{toTimestamp(item.resesrvationDetails[0].dateDebut)}</b> à <b>{toTimestamp(item.resesrvationDetails[0].dateFin)}</b>
			&nbsp; a un montant de <b>{item.total}DH</b> et est dans l'état &nbsp;&nbsp;

			{item.etat == 0 ?
				<span className="badge badge-pill badge-warning">
					&nbsp; &nbsp; &nbsp; En Attente
					&nbsp; &nbsp; &nbsp;
				</span> : (
					item.etat == 1 ?
						<span className="badge badge-pill badge-success">
							&nbsp; &nbsp; &nbsp; Acceptée
							&nbsp; &nbsp; &nbsp;
						</span>
						: (item.etat == 2 ?
							<span className="badge badge-pill badge-danger">
								&nbsp; &nbsp; &nbsp; Refusée
								&nbsp; &nbsp; &nbsp;
							</span> :
							<span className="badge badge-pill badge-danger">
								&nbsp; &nbsp; &nbsp; Annulée
								&nbsp; &nbsp; &nbsp;
							</span>)

				)
			}

			<button style={{
				float: "right",
				margin: "0"
			}} onClick={()=>{annuler(item.id)}}>
				Annuler
			</button>

		</div>
	})
	return (
		<div>
			<link rel="stylesheet" href="css/bootstrap.min.css" />
			<link rel="stylesheet" href="css/main.css" />
			<link rel="stylesheet" href="css/styles.css" />
			<Header active={'userSpace'}></Header>
			<div className="breadcrumb breadcrumb-1 pos-center">
				<h1> MES RESERVATIONS </h1>

			</div>


			<div className="content">


				<div id="contaner" class="contaner">
					{reservationList}
				</div>

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
	);
}

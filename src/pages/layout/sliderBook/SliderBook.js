import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Button } from 'primereact/button';
import 'react-notifications/lib/notifications.css';
import { Dialog } from 'primereact/dialog';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const urlAddReservation = "http://127.0.0.1:8000/reservation"
export default function SliderBook(props) {
	const [formData, setFormData] = useState({});
	const [showMessage, setShowMessage] = useState(false);
    const [etat , setEtat] = useState(0);
	const types =props.typesLocal;

	var date = new Date();
	var dd = date.getDate();
	var mm = date.getMonth()+1; 
	var yyyy = date.getFullYear();
	var today = yyyy+"-"+mm+"-"+dd;
	
    const defaultValues = {
		type:'',
        dateDebut: '',
        dateFin: '',
        adulte: 0,
        enfant: 0,
    
    }
	const  {formState: { errors }, handleSubmit, register , reset} = useForm({defaultValues});

    /*useEffect(() => {
		const urlgetAllType = "http://127.0.0.1:8000/types"
        const fetchData = async () => {
        const result = await axios(urlgetAllType);
        setTypes(result.data);
		console.log("test");
		fetchData();
		};
	
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

    //const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
	function handleChange(event) {
		console.log(event.target.value);
	  }
    const onSubmit = (data) => {
		 const res = 
                {   
                    membre:{
                        numAdesion:"hay"
                    }, 
					type:{
						id:data.type
					},
                    resesrvationDetails: [
                    {  
                    dateDebut :Math.round(new Date(data.dateDebut).getTime()/1000),
                    dateFin : Math.round(new Date(data.dateFin).getTime()/1000),
                    nbrAdulte : data.adult,
                    nbrEnfant : data.children,
                    local:{
                        id:0
                    }}]
                }
				 
                 setFormData(res);
                 axios.post(urlAddReservation, res)
                .then(response => {
					console.log(response.data.code);
					if(response.data.code == -2){
						setEtat(-2);

					}
					else if(response.data.code == 1){
						setEtat(1);
						
					}

				})
                .catch(err => console.log(err));
				setShowMessage(true);
				reset();
				setEtat(0);

	}
   //NotificationManager.success('Votre réservation est bien enregistré', 'Success',5000)
   const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK"  className="p-button-text" autoFocus onClick={() => setShowMessage(false)}/></div>;


    return (
        <div>
            <div className="book-slider">
			<div className="container">
			{etat != 0 ?  
		(<Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="center" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
				
					{(() => {
						if (etat == 1) {
						return (
						  <><i className="pi pi-check-circle mb-2" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
						  <h5>Reservation Successful!</h5>
						  <p className="text-center" style={{ lineHeight: 1.5, textIndent: '1rem' }}/>
						  <p>Votre réservation est en attente</p></>
						)
						} else if (etat == -2) {
						return (
							<><i className="pi pi-times-circle mb-2" style={{ fontSize: '5rem', color: 'var(--pink-500)' }}></i>
							<h5>Indisponibilité du local</h5>
				   			<p className="text-center" style={{ lineHeight: 1.5, textIndent: '1rem' }}/>
							<p>Le local ne est pas disponible</p></>
						)
						}
					})()}
					
                </div>
            </Dialog>) : ""}
				<div className="row pos-center">
					<div className="reserve-form-area">
						<form  onSubmit={handleSubmit(onSubmit)} id="ajax-reservation-form">
							<ul className="clearfix">
							<li className="li-select">
									<label>CATEGORIE</label>
									<select name="type" {...register("type",{required:'Type is required *'})}  style={{width : '100px'}} className="pretty-select">
										{types.map(type => (
										<option key={type.id} value={type.id} >{type.label}</option>
										))}
									</select>
									{errors.type  && <span className='text-warning' style ={{fontSize : '12px'}}>{errors.type.message}</span>}

								</li>
								<li className="li-input">
									<label>ARRIVAL</label>
									<input type="date" min={today}   id="dpd1" {...register("dateDebut",{required:'Date debut is required *'})}  name="dateDebut" className="date-selector" />
									{errors.dateDebut  && <span className='text-warning' style ={{fontSize : '12px'}}>{errors.dateDebut.message}</span>}
								</li>
								<li className="li-input">
									<label>DEPARTURE</label>
									<input type="date" id="dpd2" min={today} {...register("dateFin",{required:'Date fin is required *'})}  name="dateFin" className="date-selector"/>
									{errors.dateFin  && <span className='text-warning text-left' style ={{fontSize : '12px'}}>{errors.dateDebut.message}</span>}
								</li>
								<li className="li-select">
									<label>ADULT</label>
									<select name="adult" {...register("adult")}   className="pretty-select">
										<option value="1" >1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</select>
								</li>
								<li className="li-select">
									<label>CHILDREN</label>
									<select name="children"  {...register("children")}  className="pretty-select">
									    <option value="0">0</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</select>
								</li>
								<li>
									<div className="button-style-1 margint26">
										<input  type="submit" value="RESERVER"/>
									</div>
								</li>
							</ul>
						</form>
					</div>
				</div>
			</div>
		</div>
        <div className="bottom-book-slider">
			<div className="container">
				<div className="row pos-center">
					<ul>
						<li><i className="fa fa-shopping-cart"></i> WOOCOMMERCE COMPATIBLE</li>
						<li><i className="fa fa-globe"></i> LANGUAGE COMPATIBLE</li>
						<li><i className="fa fa-coffee"></i> COFFEE & BREAKFAST FREE</li>
						<li><i className="fa fa-windows"></i> FREE WI-FI ALL ROOM</li>
					</ul>
				</div>
			</div>
		</div>
        </div>
       
    )


}
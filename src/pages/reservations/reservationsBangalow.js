import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import Calendar from "./calendar"
// components
import "./styles.css";
import PageTitle from "../../components/PageTitle";



const baseURL = "http://127.0.0.1:8000/reservation/etat/";
const baseURL1 = "http://127.0.0.1:8000/reservation/accept/";
const baseURL2 = "http://127.0.0.1:8000/reservation/deny/";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(1),
    
  }
}))



export default function ReservationsBangalow(props) {

 
  const toTimestamp=(timeStamp_value)=>{
    var theDate = new Date(timeStamp_value * 1000);
    let dateString = theDate.toGMTString();
    
    return new Date((
      theDate.getFullYear() + '-' + (theDate.getMonth() + 1) + '-' + theDate.getDate()
    )).toISOString();
  }
  const accept=async ($id)=>{
    await axios.put(baseURL1+$id).then((response)=>{
      console.log(response.data)
      fetchData()
    })
  }
  const deny=async ($id)=>{
    await axios.put(baseURL2+$id).then((response)=>{
      console.log(response.data)
      fetchData()
    })
  }
  
  const classes = useStyles();
  const [calendarEvents, setCalendarEvents] = React.useState([]);
  const [calendarPassedEvents, setCalendarPassedEvents] = React.useState([]);
  const fetchData = async () => {
    await axios.get(baseURL+0+'/type/Bangalow').then((response)=>{
     
    const events=response.data.map((item)=>{
      if(item.resesrvationDetails.length!=0){ 
        //console.log(toTimestamp(item.resesrvationDetails[0].dateDebut))
       return {
          title: "Reservation",
          id:item.id,
          start: new Date(toTimestamp(item.resesrvationDetails[0].dateDebut)),
          end: new Date(toTimestamp(item.resesrvationDetails[0].dateFin))
        }
      } 
      })
      setCalendarEvents(events)
    })
    await axios.get(baseURL+1+'/type/Bangalow').then((response)=>{
     
      const passEvents=response.data.map((item)=>{
        if(item.resesrvationDetails.length!=0){ 
          //console.log(toTimestamp(item.resesrvationDetails[0].dateDebut))
         return {
            title: "Reservation",
            id:item.id,
            start: new Date(toTimestamp(item.resesrvationDetails[0].dateDebut)),
            end: new Date(toTimestamp(item.resesrvationDetails[0].dateFin))
          }
        } 
        })
        setCalendarPassedEvents(passEvents)
      })

}
 
    


React.useEffect(() => {
  const fetchData = async () => {
    await axios.get(baseURL+0).then((response)=>{
     
    const events=response.data.map((item)=>{
      if(item.resesrvationDetails.length!=0){ 
       // console.log(toTimestamp(item.resesrvationDetails[0].dateDebut))
       return {
          title: "Reservation",
          id:item.id,
          start: new Date(toTimestamp(item.resesrvationDetails[0].dateDebut)),
          end: new Date(toTimestamp(item.resesrvationDetails[0].dateFin))
        }
      } 
      })
      setCalendarEvents(events)
    })
    await axios.get(baseURL+1+'/type/Bangalow').then((response)=>{
     
      const passEvents=response.data.map((item)=>{
        if(item.resesrvationDetails.length!=0){ 
          //console.log(toTimestamp(item.resesrvationDetails[0].dateDebut))
         return {
            title: "Reservation",
            id:item.id,
            start: new Date(toTimestamp(item.resesrvationDetails[0].dateDebut)),
            end: new Date(toTimestamp(item.resesrvationDetails[0].dateFin))
          }
        } 
        })
        setCalendarPassedEvents(passEvents)
      })
    

}

fetchData()
 
}, []);

  return (
    <>
    <PageTitle title="Liste des Réservation En Attente" />
    <Calendar localType={'bangalow'} events={calendarEvents} accept={accept} deny={deny} />
    <PageTitle title="Liste des Réservation Accepté" />
     <Calendar localType={'bangalow'} events={calendarPassedEvents} accept={accept} deny={deny} />
    </>
  );
}

import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import Calendar from "./calendar"
// components
import "./styles.css";



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



export default function Reservations(props) {

 
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
  const fetchData = async () => {
    await axios.get(baseURL+0).then((response)=>{
     
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
    

}
 
    


React.useEffect(() => {
  const fetchData = async () => {
    await axios.get(baseURL+0).then((response)=>{
     
    const events=response.data.map((item)=>{
      if(item.resesrvationDetails.length!=0){ 
        console.log(toTimestamp(item.resesrvationDetails[0].dateDebut))
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
    

}

fetchData()
 
}, []);

  return (
    <>
     <Calendar events={calendarEvents} accept={accept} deny={deny} />
    </>
  );
}

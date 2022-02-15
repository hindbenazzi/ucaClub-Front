import React from "react";
import "./styles.css";
import axios from "axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import DialogComponent from "./dialogComponent";
import MuiAlert from '@material-ui/lab/Alert';

const baseURL = "http://127.0.0.1:8000/reservation/id/"
const baseURL1="http://127.0.0.1:8000/api/local/id/"
export default function Calendar(props) {
  const [resData,setResData]=React.useState({
    id:"",
    member:{
      id:"",
      numAdesion:""
    },
    resesrvationDetails:[{
      nbrEnfant: "",
			nbrAdulte: "",
			prixCalcule: "",
      local: {
				id: "",
        nom:"",
				type: {
					label: ""
				}
			}
    }]
  });
  const [open,setOpen]=React.useState(false);
  const fetchData = async (id) => {
    await axios.get(baseURL+id).then((response)=>{
        setResData(response.data)
        setOpen(true)
    })
    }
  return (
    <div className="App">
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        plugins={[dayGridPlugin, timeGridPlugin]}
        events={props.events}
        eventClick={
          function(arg){
            fetchData(arg.event.id)
          }
        }
      />
      <DialogComponent open={open} setOpen={setOpen} resData={resData} deny={props.deny} accept={props.accept} />
    </div>
  );
}

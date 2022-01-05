import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";

// components
import PageTitle from "../../components/PageTitle";

import Button from '@material-ui/core/Button';

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

  const columns = [
    {
      label: "Id",
      name: "id",
      
    },
    {
      
      label: "De",
      name: "resesrvationDetails[0].dateDebut",
      
    },
    {
      
      label: "Jusqu'à",
      name: "resesrvationDetails[0].dateFin",
      
    },
    {
      label: "total",
      name: "total",
      
    },
    {
      label: "membre",
      name: "member.numAdesion",
      
    },
    {
      label:"Accepter",
      name:"accept",
      options:  {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (<Button
            variant="contained"
            
            className={classes.button}
            onClick={()=>{accept(tableMeta.rowData[0])}}>Accepter</Button> )
        }
      }
  },
  {
    label:"Refuser",
    name:"refuse",
    options:  {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (<Button
          variant="contained"
          
          className={classes.button}
          onClick={()=>{deny(tableMeta.rowData[0])}}>Refuser</Button> )
      }
    }
  }
    
  ]

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
  const [reservations, setReservations] = React.useState([]);
 
  const fetchData = async () => {
    await axios.get(baseURL+0).then((response)=>{
      
      console.log(response.data)
      setReservations(response.data)
    })
    

}
React.useEffect(() => {
  const fetchData = async () => {
    await axios.get(baseURL+0).then((response)=>{
      
      console.log(response.data)
      setReservations(response.data)
    })
    

}

fetchData()
 
}, []);
const options = {
  filterType: 'checkbox',
  enableNestedDataAccess: '.',
  
};
  return (
    <>
      <PageTitle title="Liste des locaux" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Liste des locaux"
            data={reservations}
            columns={columns}
            options={options}
            
          />
        </Grid>
        
        
      </Grid>
    </>
  );
}

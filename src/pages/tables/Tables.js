import React from "react";
import { Grid ,Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";

import { Link } from 'react-router-dom';
// components
import PageTitle from "../../components/PageTitle";
import { useAlert } from "react-alert";
import { useUserDispatch, signOut } from "../../context/UserContext";


import { Add } from "@material-ui/icons";


const columns = [
  {
    label: "Id",
    name: "id",
    
  },
  {
    
    label: "Prenom",
    name: "firstName",
    
  },
  {
    label: "Nom",
    name: "lastName",
    
  },
  {
    label: "Email",
    name: "email",
    
  },
  {
    label: "N° Telephone",
    name: "phoneNumber",
    
  },
  {
    label: "N° d'adhésion",
    name: "numAdesion",
    
  }
]
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))
const baseURL = "http://127.0.0.1:8000/api/users/";
const baseURL1 = "http://127.0.0.1:8000/api/user";
export default function Tables(props) {
  var userDispatch = useUserDispatch();
  const classes = useStyles();
  const alert = useAlert();
  const [users, setUsers] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const fetchData = async () => {
    const token=localStorage.getItem('id_token');
    await axios.get(baseURL,{ headers: {"Authorization" :token} }).then((response)=>{
      setUsers(response.data);
      console.log(response.data)
    }).catch( (error)=> {
      if (error.response) {
        if(error.response.status==401){
          alert.error("Votre session a expiré! reconnectez vous s'il vous plais");
          signOut(userDispatch, props.history)
        }
       
      }
    });
  }
React.useEffect(() => {
  const token=localStorage.getItem('id_token');
  console.log(token)
  const fetchData = async () => {
    await axios.get(baseURL,{ headers: {"Authorization" :token} }).then((response)=>{
      setUsers(response.data);
      console.log(response.data)
    }).catch( (error)=> {
      if (error.response) {
        if(error.response.status==401){
          alert.error("Votre session a expiré! reconnectez vous s'il vous plais");
          signOut(userDispatch, props.history)
        }
       
      }
    });
    

}
fetchData()
 
}, []);
  
  const onRowClick = (rowData, rowMeta) => {
    console.log("----RowClick");
    console.log("rowData: ", rowData);
    console.log("rowMeta: ", rowMeta);
     props.history.push({
     pathname: `/app/updateUser/${rowData[0]}`,
     
    })
  }
  const deleteItem=async (uId)=>{
    const token=localStorage.getItem('id_token');
    axios
  .delete(baseURL1+'/'+uId,{ headers: {"Authorization" :token} })
  .then(() => {
    fetchData()
    
  }).catch( (error)=> {
    if (error.response) {
      if(error.response.status==401){
        alert.error("Votre session a expiré! reconnectez vous s'il vous plais");
        signOut(userDispatch, props.history)
      }
     
    }
  });
}
  const onRowSelectionChange = (curRowSelected, allRowsSelected) => {
    console.log("All Selected: ", allRowsSelected);
    let ids=[];
    allRowsSelected.map((item)=>{
      ids.push(users[item.index].id)
    })
    setSelected(ids)
  }
  const onRowsDelete= (rowsDeleted, newData) => {
    console.log('rowsDeleted');
    console.log(selected);
    selected.forEach((item,index)=>{
      deleteItem(item)
    })
    console.log(users[rowsDeleted.data[0].index].id)
  }
  const options = {
		filterType: 'checkbox',
		onRowClick: onRowClick,
		onRowSelectionChange: onRowSelectionChange,
    onRowsDelete:onRowsDelete
    
	};
 
  return (
    <>
      <PageTitle title="Liste des Utilisateur" button={<Link to="/app/addUser"><Button
      variant="contained"
      size="medium"
      color="secondary"
    ><Add></Add></Button></Link>} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Liste des Utilisateur"
            data={users}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}

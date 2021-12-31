import React from "react";
import { Grid ,Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";

import { Link } from 'react-router-dom';
// components
import PageTitle from "../../components/PageTitle";



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
const baseURL = "http://127.0.0.1:8000/users/";
const baseURL1 = "http://127.0.0.1:8000/user";
export default function Tables(props) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const fetchData = async () => {
    await axios.get(baseURL).then((response)=>{
      setUsers(response.data);
      console.log(response.data)
    })
  }
React.useEffect(() => {
  console.log(localStorage.getItem("id_token"))
  const fetchData = async () => {
    await axios.get(baseURL).then((response)=>{
      setUsers(response.data);
      console.log(response.data)
    })
    

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
    axios
  .delete(baseURL1+'/'+uId)
  .then(() => {
    fetchData()
    
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

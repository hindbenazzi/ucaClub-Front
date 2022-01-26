import React from "react";
import { Grid ,Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Link } from 'react-router-dom';
import PageTitle from "../../components/PageTitle";
import { Add } from "@material-ui/icons";
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useAlert } from "react-alert";
import { useUserDispatch, signOut } from "../../context/UserContext";
const columns = [
  {
    label: "Id",
    name: "id",
    
  },
  {
    
    label: "Nom",
    name: "nom",
    
  },
  {
    label: "Description",
    name: "description",
    
  },
  {
    label: "Adresse",
    name: "adresse",
    
  },
  {
    label:"Max Adulte",
    name:"maxAdulte"
  },
  {
    label:"Max Enfant",
    name:"maxEnfant"
  },
  {
    label: "Type",
    name: "type.label",
    
  }
]
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))
const baseURL = "http://127.0.0.1:8000/api/locals/";
const baseURL1 = "http://127.0.0.1:8000/api/local";
export default function Locals(props) {
  var userDispatch = useUserDispatch();
  const classes = useStyles();
  const alert = useAlert();
  const [locals, setLocals] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [rowData, setRowData]= React.useState([]);
  const fetchData = async () => {
    const token=localStorage.getItem('id_token');
    await axios.get(baseURL,{ headers: {"Authorization" :token} }).then((response)=>{
      setLocals(response.data);
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
  
  const fetchData = async () => {
    const token=localStorage.getItem('id_token');
    await axios.get(baseURL,{ headers: {"Authorization" :token} }).then((response)=>{
      setLocals(response.data);
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
  setOpenPopup(true)
  setRowData(rowData);
}
const updateLoc=()=>{
  console.log("----RowClick");
  console.log("rowData: ", rowData[0]);
  props.history.push({
    pathname: `/app/updateLocal/${rowData[0]}`})
}
const addTarif=()=>{
  console.log("----RowClick");
  console.log("rowData: ", rowData);
  props.history.push({
    pathname: `/app/local/${rowData[0]}/tarifs`})
 
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
      ids.push(locals[item.index].id)
    })
    setSelected(ids)
  }
  const onRowsDelete= (rowsDeleted, newData) => {
    console.log('rowsDeleted');
    console.log(selected);
    selected.forEach((item,index)=>{
      deleteItem(item)
    })
    console.log(locals[rowsDeleted.data[0].index].id)
  }
  const options = {
		filterType: 'checkbox',
		onRowClick: onRowClick,
    enableNestedDataAccess: '.',
		onRowSelectionChange: onRowSelectionChange,
    onRowsDelete:onRowsDelete
    
	};
 
  return (
    <>
      <PageTitle title="Liste des locaux" button={<Link to="/app/addLocal"><Button
      variant="contained"
      size="medium"
      color="secondary"
    ><Add></Add></Button></Link>}/>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Liste des locaux"
            data={locals}
            columns={columns}
            options={options}
          />
        </Grid>
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Modification
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
            <Button  variant="contained"
                     size="medium"
                     color="secondary" style={{marginLeft:"10%"}}  onClick={updateLoc}>
               Modifier le local
               </Button><br /><br />
              <Button  variant="contained"
                     size="medium"
                     color="secondary" style={{marginLeft:"10%" }} onClick={addTarif}  >
               Ajouter des tarifs
               </Button>
            </DialogContent>
        </Dialog>
      </Grid>
    </>
  );
}

import React from "react";
import { Grid ,Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LabelIcon from '@material-ui/icons/Label';
import StyleIcon from '@material-ui/icons/Style';
import {
    InputLabel,
    InputAdornment,
    IconButton,
    Card,
    FormControl,
    Divider
  } from '@material-ui/core';
// components
import PageTitle from "../../components/PageTitle";



import { Add } from "@material-ui/icons";


const columns = [
  {
    label: "Id",
    name: "id",
    
  },
  {
    
    label: "Labelle",
    name: "label",
    
  },
  {
    
    label: "Type",
    name: "type",
    
  }
  
]
const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(20)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    tableOverflow: {
        overflow: 'auto'
      }
}))


const baseURL = "http://127.0.0.1:8000/types/";
const baseURL1 = "http://127.0.0.1:8000/type";
export default function Types(props) {
  const classes = useStyles();
  const [types, setTypes] = React.useState([]);
  const [label, setLabel] = React.useState("");
  const [type, setType] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [mod, setMod] = React.useState(false);
  const [id, setId] = React.useState();
  const [openPopup, setOpenPopup] = React.useState(false);
  
  const fetchData = async () => {
    await axios.get(baseURL).then((response)=>{
      setTypes(response.data);
      console.log(response.data)
    })
  }
React.useEffect(() => {
  const fetchData = async () => {
    await axios.get(baseURL).then((response)=>{
      setTypes(response.data);
      console.log(response.data)
    })
}
fetchData()
 
}, []);
const handleChange = prop => event => {
  if(prop=="label"){
    setLabel(event.target.value);
    console.log(label)
  }else{
    setType(event.target.value)
  }
    
  };
  const onRowClick = (rowData, rowMeta) => {
    setMod(true)
    setId(rowData[0])
    console.log("----RowClick");
    console.log("rowData: ", rowData);
    console.log("rowMeta: ", rowMeta);
     setLabel(rowData[1])
     setType(rowData[2])
     setOpenPopup(true)
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
      ids.push(types[item.index].id)
    })
    setSelected(ids)
  }
  const updateType = async (e) => {
    e.preventDefault()
    await axios.put(baseURL1+'/'+id,{label:label,type:type}).then((response) => {
        console.log(response.data)
        setOpenPopup(false)
        fetchData()
        setLabel("")
      });
}
  const onRowsDelete= (rowsDeleted, newData) => {
    console.log('rowsDeleted');
    console.log(selected);
    selected.forEach((item,index)=>{
      deleteItem(item)
    })
    console.log(types[rowsDeleted.data[0].index].id)
  }
  const options = {
		filterType: 'checkbox',
		onRowClick: onRowClick,
		onRowSelectionChange: onRowSelectionChange,
        onRowsDelete:onRowsDelete
    
	};
    const addType = async (e) => {
        e.preventDefault()
        await axios.post(baseURL1,{label:label,type:type}).then((response) => {
            console.log(response.data)
            setOpenPopup(false)
            fetchData()
            setLabel("")
          });
    }
 
  return (
    <>
      <PageTitle title="Liste des Types des locaux" button={<Button
      variant="contained"
      size="medium"
      onClick={()=>{setOpenPopup(true) 
       setLabel("")
       setMod(false)
    }}
      color="secondary"
    ><Add></Add></Button>} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Liste des Types des locaux"
            data={types}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
      <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {mod?"Modifier":"Ajouter"}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
            <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-label">
                  Labelle
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-phone"
                  value={label}
                  onChange={handleChange('label')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <LabelIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={180}
                />
              </FormControl> <br /><br />
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-label">
                  Type
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-phone"
                  value={type}
                  onChange={handleChange('type')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <StyleIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={180}
                />
              </FormControl>  <br /><br />
              <Button  variant="contained"
                     size="medium"
                     color="secondary" style={{marginLeft:"10%"}} onClick={mod? updateType :addType} >
               {mod?"Modifier Type de local":"Ajouter Type de local"}
               </Button>
            </DialogContent>
        </Dialog>
    </>
  );
}

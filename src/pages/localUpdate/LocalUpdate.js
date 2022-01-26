import React, { Fragment } from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/menuitem'
import { useAlert } from "react-alert";
import clsx from 'clsx';
import axios from "axios";
import { useUserDispatch, signOut } from "../../context/UserContext";
import {
  Grid,
  InputLabel,
  InputAdornment,
  IconButton,
  Card,
  Divider,
  Button,
  FormControl
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import PlaceIcon from '@material-ui/icons/Place';
import DescriptionIcon from '@material-ui/icons/Description';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(3)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "90%"
  }
}));
const baseURL = "http://127.0.0.1:8000/api/local";
const baseURL1 = "http://127.0.0.1:8000/api/types/"; 
const LocalUpdate = (props) => {
  var userDispatch = useUserDispatch();
  const alert = useAlert();
  const id = useParams();
  const classes = useStyles();
  const cardStyle = {
    width: "100%",
    borderRadius: "3%",
    marginLeft: "200px"
  }
  const [values, setValues] = React.useState({
    nom: "",
    description: "",
    adresse: "",
    maxAdulte: "",
    maxEnfant: "",
    typeLabel: "",
    type: ""
  });
  const [types, setTypes] = React.useState([]);
  React.useEffect(() => {
    console.log("id")
    console.log(id)
    const fetchData = async () => {
      const token=localStorage.getItem('id_token');
      await axios.get(baseURL + '/id/' + id.id,{ headers: {"Authorization" :token} }).then((response) => {
        setValues({
          nom: response.data[0].nom,
          description: response.data[0].description,
          adresse: response.data[0].adresse,
          maxAdulte: response.data[0].maxAdulte,
          maxEnfant: response.data[0].maxEnfant,
          typeLabel: response.data[0].type.label,
          type: response.data[0].type.type
        })
        
      }).catch( (error)=> {
        if (error.response) {
          if(error.response.status==401){
            alert.error("Votre session a expiré! reconnectez vous s'il vous plais");
            signOut(userDispatch, props.history)
          }
         
        }
      });
      await axios.get(baseURL1,{ headers: {"Authorization" :token} }).then((response)=>{
        setTypes(response.data);
        
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
    console.log(types)
  }, []);
  const updateLocal = async (e) => {
    e.preventDefault()
    const token=localStorage.getItem('id_token');
    await axios.put(baseURL + '/' + id.id, values,{ headers: {"Authorization" :token} }).then((response) => {
      console.log(response.data)
      props.history.push({
        pathname: "/app/locals"
      })
    }).catch( (error)=> {
      if (error.response) {
        if(error.response.status==401){
          alert.error("Votre session a expiré! reconnectez vous s'il vous plais");
          signOut(userDispatch, props.history)
        }
       
      }
    });
  }
  const handleChange = prop => event => {
    if(prop == "typeLabel"){
      console.log("change label")
        types.forEach(item=>{
          if(item.label==event.target.value){
            setValues({ ...values, "type": item.type });
          }
        }
          )
    }
    setValues({ ...values, [prop]: event.target.value });

  };



  return (
    <Fragment>
      <Grid container spacing={4}>

        <Grid item xs={12} lg={6} >
          <Card className="p-4 mb-4" style={cardStyle}>
            <form>
              <Divider className="my-4" />

              <div >
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-fname">
                    Nom du local
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-fname"
                    value={values.nom}
                    onChange={handleChange('nom')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end">
                          <DescriptionIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-lname">
                    Description
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-lname"
                    value={values.description}
                    onChange={handleChange('description')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end">
                          <DescriptionIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-phone">
                    Adresse
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-phone"
                    value={values.adresse}
                    onChange={handleChange('adresse')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end">
                          <PlaceIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={180}
                  />
                </FormControl>
                <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <TextField
                  id="outlined-number"
                  value={values.maxAdulte}
                  type="number"
                  label=" Max Adulte"
                  variant="outlined"
                  onChange={handleChange('maxAdulte')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>  
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                
                <TextField
                  id="outlined-number"
                  value={values.maxEnfant}
                  type="number"
                  label=" Max Enfants"
                  variant="outlined"
                  onChange={handleChange('maxEnfant')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={150}
                />
              </FormControl>
               
                <FormControl 
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.typeLabel}
                    onChange={handleChange('typeLabel')}
                  >
                   {
                   types.map(item=>
                    <MenuItem value={item.label} key={item.type}>{item.label}</MenuItem>
                  )
                   }
                  </Select>

                </FormControl>
                
              </div>
              <Button variant="contained"
                size="medium"
                color="secondary" style={{ marginLeft: "57%" }} onClick={updateLocal}>
                Modifier Local
              </Button>
              <br /><br />
            </ form>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LocalUpdate;

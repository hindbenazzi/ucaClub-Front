import React, { Fragment } from 'react';
import { Redirect } from 'react-router';
import { Delete, Build } from "@material-ui/icons";
import clsx from 'clsx';
import axios from "axios";
import {

  InputLabel,
  InputAdornment,
  IconButton,
  Card,
  Divider,
  Button,
  FormControl
} from '@material-ui/core';
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import TextField from '@material-ui/core/TextField';
import { useAlert } from "react-alert";
import { useUserDispatch, signOut } from "../../context/UserContext";
const styles = {
  Icon: {
    marginLeft: "auto"
  },
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    width: 500
  }
};
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
const baseURL = "http://127.0.0.1:8000/api/local/tarif/";
const baseURL1 = "http://127.0.0.1:8000/api/tarif/local/";
const baseURL2 = "http://127.0.0.1:8000/api/tarif/id/";
const AddTarif = (props) => {
  const id = useParams();
  var userDispatch = useUserDispatch();
  const classes = useStyles();
  const alert = useAlert();
  const gridClass = "fade-out";
  const cardStyle = {
    width: "95%",
    borderRadius: "3%",
    marginLeft: "0px",
    marginTop: "50px"
  }
  const [values, setValues] = React.useState({
    nbrEnfant: "",
    nbrAdulte: "",
    prix: ""
  });
  const [formState, setFormState] = React.useState("add")
  const fetchData = async () => {
    const token=localStorage.getItem('id_token');
    await axios.get(baseURL1 + id.id, values,{ headers: {"Authorization" :token} }).then((response) => {
      setTarifs(response.data);
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
  const [tarifs, setTarifs] = React.useState([]);
  const addTarifs = async (e) => {
    e.preventDefault()
    const token=localStorage.getItem('id_token');
    await axios.put(baseURL + id.id,{ headers: {"Authorization" :token} }).then((response) => {
      console.log(response.data)
      setTarifs([...tarifs, values]);
      console.log(tarifs)
      fetchData()
      setValues({
        nbrEnfant: "",
        nbrAdulte: "",
        prix: ""
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
  const [tarifId,setTarifId]=React.useState()
  const updateTarif = async (item) => {

    console.log(item.prix)
    setFormState("update")
    setTarifId(item.id)
    setValues({
      nbrEnfant: item.nbrEnfant,
      nbrAdulte: item.nbrAdulte,
      prix: item.prix
    })


  }
  const tarifsUpdate=async (e)=>{
    console.log("updating......")
    e.preventDefault()
    const token=localStorage.getItem('id_token');
    await axios.put(baseURL2 + tarifId, values,{ headers: {"Authorization" :token} }).then((response) => {
      console.log(response.data)
      setTarifs([...tarifs, values]);
      console.log(tarifs)
      fetchData()
      setValues({
        nbrEnfant: "",
        nbrAdulte: "",
        prix: ""
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
  React.useEffect(() => {
    const fetchData = async () => {
      const token=localStorage.getItem('id_token');
      await axios.get(baseURL1 + id.id, { headers: {"Authorization" :token} }).then((response) => {
        setTarifs(response.data);
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
  const handleChange = prop => event => {
    
    setValues({ ...values, [prop]: event.target.value});
    console.log(values)
  };
  const deleteTarif = async (id) => {
    setValues({
      nbrEnfant: "",
      nbrAdulte: "",
      prix: ""
    })
    const token=localStorage.getItem('id_token');
    await axios.delete(baseURL2 + tarifId,{ headers: {"Authorization" :token} }).then((response) => {
      console.log(response.data)
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
  const listTarifs = tarifs.map((item) => {
    return (
      <Grid
        xs={12}
        className={`${gridClass}`}
        key={item.id}
        item
        onClick={() => { updateTarif(item) }}>
        <Paper elevation={2} style={styles.Paper}>
          <span style={styles.Todo}> <p style={{ float: "left" }}>Nombre des adultes: {(tarifs.length != 0) ? item.nbrAdulte : ""} Nombre des enfants:  {(tarifs.length != 0) ? item.nbrEnfant : ""}  Prix : {(tarifs.length != 0) ? item.prix : ""}  </p></span>
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={() => deleteTarif(item.id)}
          >
            <Delete fontSize="small" />
          </IconButton >
        </Paper><br />
      </Grid>
    )
  })
  const backToadd = () => {
    setFormState("add")
    setValues({
      nbrEnfant: "",
      nbrAdulte: "",
      prix: ""
    })
  }
  const { action } = useParams();
  return (
    <Fragment>
      {formState != "add" && <Button
        variant="contained"
        size="medium"
        color="secondary"
        onClick={() => { backToadd() }}
      >Retour vers l'ajout</Button>}
      <Grid container>

        <Grid item xs={5} lg={6} >
          <Card className="p-4 mb-4" style={cardStyle}>
            <form>
              <Divider className="my-4" />

              <div >
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <TextField
                  id="outlined-number"
                  value={values.nbrAdulte}
                  type="number"
                  label=" Nombre Adulte"
                  variant="outlined"
                  onChange={handleChange('nbrAdulte')}
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
                  value={values.nbrEnfant}
                  type="number"
                  label=" Nombre Enfants"
                  variant="outlined"
                  onChange={handleChange('nbrEnfant')}
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
                  <InputLabel htmlFor="outlined-adornment-phone">
                    Prix
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-phone"
                    value={values.prix}
                    onChange={handleChange('prix')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end">
                          <AccountCircleOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={180}
                  />
                </FormControl>
              </div>
              <Button variant="contained"
                size="medium"
                color="secondary" style={{ marginLeft: "57%" }} onClick={formState == "add" ? addTarifs : tarifsUpdate}>
                {formState == "add" ? "Ajouter Tarif" : "Modifier Tarif"}
              </Button>
              <br /><br />
            </ form>
          </Card>

        </Grid>
        <Grid xs={5} style={{ gap: "1rem", marginTop: "50px" }}>
          {listTarifs}
        </Grid>

      </Grid>
    </Fragment>
  );
};

export default AddTarif;

import React, { Fragment } from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/menuitem'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import axios from "axios";
import { useAlert } from "react-alert";
import { useUserDispatch, signOut } from "../../context/UserContext";
import {
  Grid,
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
  Card,
  FormControl,
  Divider
} from '@material-ui/core';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import EmailIcon from '@material-ui/icons/Email';
import DialpadIcon from '@material-ui/icons/Dialpad';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
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
const baseURL = "http://127.0.0.1:8000/api/user";
const baseURL1 = "http://127.0.0.1:8000/auth/register";
const UserAdd = (props) => {
  var userDispatch = useUserDispatch();
  const classes = useStyles();
  const alert = useAlert();
  const cardStyle={
    width: "100%",
    borderRadius: "3%",
    marginLeft:"200px"
  }
  const [values, setValues] = React.useState({
    firstName: "",
    lastName:  "",
    email: "",
    phoneNumber: "",
    numAdesion: "",
    role:"",
    password:""
  });
  const [visiblePass, setVisiblePass] = React.useState(false);
  const [visiblePassC, setVisiblePassC] = React.useState(false);
  const [pass, setPass] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
    const addUser = async (e) => {
        e.preventDefault()
        const sendData= async ()=>{
          const token=localStorage.getItem('id_token');
          await axios.post(baseURL1,values,{ headers: {"Authorization" :token} }).then((response) => {
            console.log(response.data)
            props.history.push({
              pathname: "/app/users"
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
        if(values.password!="" && pass==values.password && values.role=="ROLE_ADMIN"){
          sendData()
        }else if(values.role=="ROLE_USER"){
          sendData()
        }else{
          console.log("mismatched password")
        }
       
    }
    

  const handleChange = prop => event => {
    if(prop=="pass"){
      setPass(event.target.value)
    }else{
    setValues({ ...values, [prop]: event.target.value });
  }
  if(prop="role"&& event.target.value=="ROLE_ADMIN"){
     setIsAdmin(true)
  }else if(prop="role"&& event.target.value=="ROLE_USER"){
    setIsAdmin(false)
  }
    console.log(values)
  };


  const { action } = useParams();
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
                  Prenom
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-fname"
                  value={values.firstName}
                  onChange={handleChange('firstName')}
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
                <InputLabel htmlFor="outlined-adornment-lname">
                 Nom
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-lname"
                  value={values.lastName}
                  onChange={handleChange('lastName')}
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
                <InputLabel htmlFor="outlined-adornment-phone">
                  Numéro de Téléphone
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-phone"
                  value={values.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <PhoneEnabledIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={180}
                />
              </FormControl>  
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-mail">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-mail"
                  value={values.email}
                  onChange={handleChange('email')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <EmailIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>  
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-adesion">
                  Numéro d'adhesion
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-adesion"
                  value={values.numAdesion}
                  onChange={handleChange('numAdesion')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end">
                            <DialpadIcon />
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={150}
                />
              </FormControl>
              <FormControl 
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                labelWidth={150}>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.role}
                    onChange={handleChange('role')}
                  >
                   
                    <MenuItem value={"ROLE_USER"} >USER</MenuItem>
                    <MenuItem value={"ROLE_ADMIN"} >ADMIN</MenuItem>
                  </Select>
                  
                </FormControl>
                {isAdmin && <div>
                
                <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-adesion">
                Mot de passe
                </InputLabel>
                <OutlinedInput
                  id="outlined-password-input"
                  value={values.password}
                  type={ visiblePass ?"text" : "password"}
                  variant="outlined"
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={()=>setVisiblePass(!visiblePass)}
                        >
                           {visiblePass ? <VisibilityOffIcon  /> :<VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={150}
                />
              </FormControl>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined">
                <InputLabel htmlFor="outlined-adornment-adesion">
                Confirmé le mot de passe
                </InputLabel>
                <OutlinedInput
                  id="outlined-number"
                  value={pass}
                  type={ visiblePassC ?"text" : "password"}
                  variant="outlined"
                  onChange={handleChange('pass')}
                  endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={()=>setVisiblePassC(!visiblePassC)}
                        >
                            {visiblePassC ? <VisibilityOffIcon  /> :<VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={150}
                />
              </FormControl>

               
                </div>}
            </div>
            <Button  variant="contained"
                     size="medium"
                     color="secondary" style={{marginLeft:"57%"}} onClick={addUser}>
             Ajouter Utilisateur
            </Button>
            <br /><br />
        </ form>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UserAdd;

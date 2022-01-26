import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import axios from "axios";
import classnames from "classnames";
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
const baseURL1 = "http://127.0.0.1:8000/auth/connect";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("admin@flatlogic.com");
  var [passwordValue, setPasswordValue] = useState("password");
  const [values, setValues] = React.useState({
    email: "",
    password:""
  });
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values)
  };
  const connect = async (e) => {
    e.preventDefault()
    const sendData= async ()=>{
      await axios.post(baseURL1,values).then((response) => {
        console.log(response.data)
       
        loginUser(
          response.data.token,
          userDispatch,
          values.email,
          values.password,
          props.history,
          setIsLoading,
          setError,
        )
      });
    }
    sendData()
  }

  const [visiblePass, setVisiblePass] = React.useState(false);
  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer} style={{backgroundColor:"#944422"}}>
        <Typography className={classes.logotypeText}>Club UCA</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
         
          
            <React.Fragment>
              <Typography variant="h3" className={classes.greeting}>
                Bienvenue à la platforme de gestion Backoffice de Club UCA
              </Typography>
             
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                
                <div className={classes.formDivider} />
              </div>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
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
              </FormControl>  <br /><br />
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
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={connect}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                
              </div>
            </React.Fragment>
          
         
        </div>
      
      </div>
    </Grid>
  );
}

export default withRouter(Login);

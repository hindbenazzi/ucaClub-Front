import React from 'react'
import logo from './../../images/logoFST.png'
import { firebase, auth } from './firebase';
import axios from "axios";
import {

  CircularProgress,
 
} from "@material-ui/core";
// styles
import useStyles from "../login/styles";
import { useUserDispatch, loginClient } from "../../context/UserContext";
const BaseURL="http://localhost:8000/auth/connect/cli"

export default function LoginClt(props) {
  var classes = useStyles();
  var userDispatch = useUserDispatch();
  const [adhesion, setAdhesion] = React.useState("");
  const [telenumber, setTelenumber] = React.useState("");
  const [otp, setotp] = React.useState('');
  const [show, setshow] = React.useState(false);
  const [final, setfinal] = React.useState('');
  const [jwt,setJwt]= React.useState('');
  var [isLoading, setIsLoading] = React.useState(false);
  var [error, setError] = React.useState(null);
  React.useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container", {
            size: "invisible",
            callback: function(response) {
                console.log("Captcha Resolved");
            },
            defaultCountry: "IN",
        }
    );
}, []);
  // Sent OTP
  const signin = (numberPH) => {
       console.log(numberPH)
      if (numberPH === "" || numberPH.length < 10) {
        console.log("out")
        return;
      }
      const verify = window.recaptchaVerifier;
      auth.signInWithPhoneNumber("+212"+numberPH.slice(1), verify).then((result) => {
          setfinal(result);
          console.log("code sent")

          setshow(true);
          
      })
          .catch((err) => {
              
              window.location.reload()
          });
  }
  // Validate OTP
  const ValidateOtp = (e) => {
    console.log(telenumber)
    e.preventDefault()
      if (otp === null || final === null)
          return;
      final.confirm(otp).then((result) => {
        console.log("response :"+getJWT())
        setTimeout(function(){
         
       }, 5000);
         // success
      }).catch((err) => {
          //alert("Wrong code");
      })
  }

  const handleChange = prop => event => {
    if(prop == "numAdhesion"){
      console.log(event.target.value)
     setAdhesion(event.target.value)
    }
    if(prop=="verifCode"){
      setotp(event.target.value)
    }

  };
  const getJWT=async ()=>{
    setshow(false)
    await axios.post(BaseURL,{adhesion:adhesion}).then((response)=>{
      loginClient(
        response.data.token,
        userDispatch,
        adhesion,
        props.history,
        setIsLoading,
        setError,
      )
    });
   
  }
  const sendCode=async (e)=>{
    e.preventDefault()
    await axios.get("http://localhost:8000/user/numAdesion/"+adhesion).then((response)=>{
      console.log(response.data.phoneNumber)
      setTelenumber(response.data.phoneNumber)
      signin(response.data.phoneNumber)
    }).catch((error)=>{
      console.log(error)
    });
  }


    return (
        <div>
      <link rel="stylesheet" href="css/bootstrap.min.css" />
			<link rel="stylesheet" href="css/main.css" />
    <div className="miBody">
        <div className="cardLogin">
            <div>
                <a href="/">
                    <img className="login-logo" src={logo}  alt="Logo" />
                </a>
            </div>
            <div className="login-intro">
                <h1 className="text-center h3">Se connecter</h1>
                <p className="small text-center">Pour vous connectez, veuillez saisir votre Numéro d'adhésion </p>
            </div>
            <form action="#" className="signin-form">
                        <div className="form-group mb-3">
                        
                        <label style={{color :'#727272' ,marginLeft: '5px'}}  for="name">N°Adhésion</label>
                        <input type="text" className="form-control inputS" onChange={handleChange("numAdhesion")} placeholder="N°Adhésion" value={adhesion} required/>
                        </div>
                        <div className="form-group">
                        <button type="submit" className="form-control btnS btn btn-primary rounded submit px-3" data-toggle="modal" onClick={sendCode} data-target="#exampleModal" data-whatever="@mdo">Sign In</button>
                    </div>
            </form>
        </div>
    </div>


<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel"></h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Svpl vérifie votre téléphone, vous receverez un code de vérification :)</p>
        <form>
          <div className="form-group">
          <div id="recaptcha-container" hidden></div>
            <label  style={{color :'#727272'}}  for="recipient-name" className="col-form-label">Code de vérification :</label>
            <input type="text" value={otp} onChange={handleChange("verifCode")} className="form-control inputS" />
          </div>
        </form>
      </div>
      <div className="modal-footer">
      {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
        <button type="button" className="btn btn-primary btnS" onClick={ValidateOtp}>Envoyer</button>
                )}
      </div>
    </div>
  </div>
</div>
        </div>
    )
}

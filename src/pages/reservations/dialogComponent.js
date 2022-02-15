import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TodayIcon from '@material-ui/icons/Today';
import PersonIcon from '@material-ui/icons/Person';
import { lightGreen, blue, purple, pink } from "@material-ui/core/colors";
import { Typography } from '@material-ui/core';
import axios from "axios";
import clsx from 'clsx';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/menuitem';
import {
  InputLabel,
  FormControl
} from '@material-ui/core';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: pink
  }
});

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  spacer: {
    marginBottom: theme.spacing(10)
  }
}));
const useStyle=makeStyles(theme => ({
  dashedBorder: {
    border: "1px dashed",
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
  },
  text: {
    marginBottom: theme.spacing(2),
  },
}));
const baseURL="http://127.0.0.1:8000/api/local/id/"
const baseURL1="http://127.0.0.1:8000/api/locals/"
const baseURL2="http://127.0.0.1:8000/reservation/changeLocal/"
export default function DialogComponent(props) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const classes = useStyles();
  const classe = useStyle();
  const [locals, setLocals] = React.useState([]);
  const [chambre,setChambre]=React.useState("")
  const [local,setLocal]=React.useState()
  const [loading, setLoading] = React.useState(false);

  function handleClickOpen() {
    props.setOpen(true);
  }
  const updateReservation=async () =>{
    const result =locals.filter(item => item.nom==chambre)
    console.log(result)
    await axios.put(baseURL2+props.resData.id,result[0]).then((response)=>{
      
    })
  }
  React.useEffect(() => {
    const fetchData = async () => {
      const token=localStorage.getItem('id_token');
      setChambre(props.resData.resesrvationDetails[0].local.nom)
      await axios.get(baseURL1,{ headers: {"Authorization" :token} }).then((response)=>{
        setLocals(response.data);
        //console.log(response.data)
      }).catch( (error)=> {
        if (error.response) {
          if(error.response.status==401){
            //alert.error("Votre session a expiré! reconnectez vous s'il vous plais");
            //signOut(userDispatch, props.history)
          }
         
        }
      });
  }
  fetchData()
  setChambre(props.resData.resesrvationDetails[0].local.nom)
  }, []);
  function handleClose() {
    props.setOpen(false);
  }
  const handleChange = prop => event => {
    console.log(locals)
   setChambre(event.target.value)
  };
const toDate=(date)=>{
  var theDate = new Date(date * 1000);
    let dateString = theDate.toGMTString();
   // console.log( theDate.getFullYear() + '-' + (theDate.getMonth() + 1) + '-' + theDate.getDate())
    return (
      theDate.getFullYear() + '-' + (theDate.getMonth() + 1) + '-' + theDate.getDate()
    );
}
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="form-dialog-title" 
      >
        <DialogTitle id="form-dialog-title" >Informations de la réservation</DialogTitle>
        <DialogContent>
          <section>
            <div className="item">
              <p><ChildFriendlyIcon />Nombre des Enfants:</p>
              <p>{props.resData.resesrvationDetails[0].nbrEnfant}</p>

            </div>
            <div className="divider"></div>
            <div className="item">
            <p><Typography className={classe.text} size="xl"><AccessibilityIcon />Nombre des Adults:</Typography></p>
            <p>{props.resData.resesrvationDetails[0].nbrAdulte}</p>
            </div>
            <div className="divider"></div>
            <div className="item">
              <p><AttachMoneyIcon /> Prix:</p>
              <p>{props.resData.total} DH</p>
            </div>
            <div className="divider"></div>
            <div className="item">
              <p><TodayIcon /> Date de réservation:</p>
              <p>{toDate("1642157510")}</p>
            </div>
            <div className="divider"></div>
            <div className="item">
              <p><PersonIcon /> Membre:</p>
              <p>{props.resData.member.numAdesion}</p>
            </div>
            {props.localType!='chambre' ?
            <div>
             <div className="divider"></div>
            <div className="item">
              <p><PersonIcon /> Local:</p>
             {loading ?  "loading......" : 
             <FormControl 
             className={clsx(classes.margin, classes.textField)}
             variant="outlined"
             labelWidth={150}>
               {props.resData.resesrvationDetails[0].local.nom}
               <Select
                 labelId="demo-simple-select-label"
                 id="demo-simple-select"
                 value={chambre}
                 onChange={handleChange('chambre')}
               >
                {
                  locals.map((item)=><MenuItem value={item.nom} key={item.id} >{item.nom}</MenuItem>)
                }
                
               </Select>
               
             </FormControl>}
             
            </div>
            </div>:""}
          </section>

          
        </DialogContent>
        <DialogActions>
          <ThemeProvider theme={defaultTheme}>
            <div className={classes.margin}>
              <Button color="primary" variant="contained"
                onClick={() => {
                  props.accept(props.resData.id)
                  handleClose()
                }}>
                Accepter
              </Button>
              <Button color="secondary" variant="contained"
                onClick={() => {
                  props.deny(props.resData.id)
                  handleClose()
                }}>
                Refuser
              </Button>
              <Button color="secondary" variant="contained"
                onClick={() => {
                  updateReservation()
                  handleClose()
                }}>
                Changer Local
              </Button>
              
            </div>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}
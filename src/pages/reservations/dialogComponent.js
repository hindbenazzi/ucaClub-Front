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
export default function DialogComponent(props) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const classes = useStyles();
  const classe = useStyle();
  function handleClickOpen() {
    props.setOpen(true);
  }

  function handleClose() {
    props.setOpen(false);
  }
const toDate=(date)=>{
  var theDate = new Date(date * 1000);
    let dateString = theDate.toGMTString();
    console.log( theDate.getFullYear() + '-' + (theDate.getMonth() + 1) + '-' + theDate.getDate())
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
            </div>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Context from "../Context";
import Divider from "@material-ui/core/Divider";
import "../Modal/Modal.css";
import Table from "../ChangesTable/Table";
import AddModal from './AddModal'


const useStyles = makeStyles({
  dropZone: {},
  dialog: {
    direction: "rtl",
    overflow: "hidden",
    // maxWidth: '1500px!important'
    // maxWidth:1500
  },
  card: {
    width: 550,
    height: 650,
    overflow: "hidden",
  },
  shape: {
    backgroundColor: "blue",
    width: 40,
    height: 40,
  },
  paper: {
    height: 700,
    width: 550,
    // marginRight:20,
    marginTop: 150,
    overflow: "auto",
  },
});

const MyChangesModal = () => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(true);
  const { setSendToDB } = useContext(Context);

  const rectangle = <div className={classes.shape} />;
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>

      <Dialog
        className={classes.dialog}
        open={openModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">תוכנית חירום</DialogTitle>
        <DialogContent className={classes.card}>
          <DialogContentText>
            כאן תוכל לראות את כל ההעברות והשינויים שביצעת
          </DialogContentText>
          <Divider />

          {/* <Paper className={classes.paper}> */}
          <Table />
          {/* </Paper> */}
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            חזור
          </Button>
          <Button variant="outlined" onClick={e=>setSendToDB(true) } color="primary">
            העלה
          </Button>
        </DialogActions>
      </Dialog>

      </div>
  );
};
export default MyChangesModal;

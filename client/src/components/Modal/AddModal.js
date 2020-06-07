import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import cogoToast from "cogo-toast";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Context from "../Context";

const useStyles = makeStyles({
  dropZone: {
    width: 350,
    height: 350,
  },
  input: {
    direction: "rtl",
  },
});
const validateName = (fileName, creator) => ({
  isValid: fileName && fileName.length > 0 && creator && creator.length > 0,
  errors: {
    fileName:
      !fileName || fileName.length === 0
        ? cogoToast.error("שם אינו תקין").hide
        : false,
    creator:
      !creator || creator.length === 0
        ? cogoToast.error("שם אינו תקין").hide
        : false,
  },
});
const AddModal = () => {
  const classes = useStyles();
  const { change } = useContext(Context);
  // console.log(change.map((details) => console.log(typeof details.students)));
  const [open, setOpen] = useState(true);
  const [fileName, setFileName] = useState();
  const [creator, setCreator] = useState();
  const [errors, setErrors] = useState({});

  //   const validation = validateName(fileName, creator);
  //   if (validation.isValid) {
  //       handleSend({ fileName,creator});
  //     handleClose()
  //   } else {
  //       setErrors(validation.errors);
  //   }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSend = () => {
    console.log(fileName, creator);

    const validation = validateName(fileName, creator);
    console.log(validation);
    if (validation.isValid) {
      axios
        .post("/add", {
          fileName: fileName,
          creator: creator,
          changes: change.map((details) => ({
            from: details.from,
            to: details.to,
            students:details.students

          })),
        })
        .then((response) => {
          // handle success
          cogoToast.success("תכנית הועלתה בהצלחה")
          console.log(response);
          //   cogoToast.success("success")
        })
        .catch(function (error) {
          cogoToast.error("העלאת תכנית נכשלה")
          // handle error
          //   cogoToast.success(error)

          console.log(error);
        });
      handleClose();
    } else {
      setErrors(validation.errors);
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        העלה
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">העלה קובץ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            אנא מלא את שמך המלא ושם הקובץ הרצוי.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            className={classes.input}
            label="שם הקובץ"
            type="text"
            defaultValue={"תכנית חירום"}
            required
            onChange={(e) => setFileName(e.target.value)}
            fullWidth
            error={errors.fileName}
          />
          <TextField
            margin="dense"
            className={classes.input}
            label="שמך המלא"
            type="text"
            required
            onChange={(e) => setCreator(e.target.value)}
            fullWidth
            error={errors.creator}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            בטל
          </Button>
          <Button variant="outlined" onClick={handleSend} color="primary">
            העלה
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddModal;

import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TabPanel from "./TabPanel";
// import classes from "/.module.css";

const useStyles = makeStyles({
  root: {
    width: 500,
    height: 500,
    marginTop: 15,
    marginLeft: 1350,
    overflow: "auto",
  },
  slider: {
    marginTop: "36px",
    marginLeft: "1250px",
    height: "70px",
    width: "450px",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  display:{
    
  }
});

const SchoolsDisplayBar = () => {
  const classes = useStyles();


  return (
    <div className={classes.display}>
      <TabPanel></TabPanel>

    </div>
  );
};
export default SchoolsDisplayBar;

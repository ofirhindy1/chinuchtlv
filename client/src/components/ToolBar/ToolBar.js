import React, { useState, useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MyChangesModal from "../Modal/MyChangesModal";
import ChangesBar from "../GlobalChanges/ChangesBar";
import AddModal from '../Modal/AddModal'

import Context from "../Context";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    direction: "rtl",
  },
  menu: {
    backgroundColor: "midnightblue",
  },
  loadChanges: {
    display:'flex',
    marginRight: 1200,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontWeight: "bold",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const { alertsPopUp, setAlertsPopUp,sendToDB } = useContext(Context);
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);

  const handleClicked = () => {
    setClicked(true);
    setAlertsPopUp(0);
  };
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.menu}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            חינוך - תל אביב
          </Typography>
          <div className={classes.loadChanges}>
            <ChangesBar />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleClicked}>
              <Badge badgeContent={alertsPopUp} color="secondary">
                <NotificationsIcon />
              </Badge>
              {clicked ? <MyChangesModal /> : ""}
{sendToDB?<AddModal/>:""}
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}

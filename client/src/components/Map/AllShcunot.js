import React, { useState,useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Context from "../Context";
import polygonCenter from "geojson-polygon-center";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
  },
  line: {
    width: "100%",
    height: 40,
    maxWidth: 400,
    marginTop: 10,
    marginLeft: 15,
    boxShadow: "2px 2px 2px 1px rgba(0,0,0,.125)",

    backgroundColor: theme.palette.background.paper,
  },
  title: {
    marginTop: -16,
    fontSize: 24,
    fontWeight: "bold",
  },
  empty: {
    height: 190,
  },
  status: {
    marginRight: 36,
    top: 8,
  },

}));

const AllSchunot = () => {
  const classes = useStyles();
  const { setSchunaCenter, setSchunazoom, setSchools, setIndex, neighborhoods } = useContext(
    Context
  );
  // const [shcunaCenter, setShcunaCenter] = useState("test");

  return (

    <div>
      {neighborhoods.map((location) => {
        return (
            <Card
              variant="outlined"
              className={classes.line}
              onClick={(e) => {setSchunaCenter([
                polygonCenter(location.geometry).coordinates[1],
                polygonCenter(location.geometry).coordinates[0],
              ])
              setSchunazoom(15)
              setIndex(1)
              setSchools(location.properties.schools)}}>
              <CardContent className={classes.root}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom>
                  {location.properties.shemshchun}
                </Typography>
              </CardContent>
            </Card>
        );
      })}
    </div>

  );
};

export default AllSchunot;

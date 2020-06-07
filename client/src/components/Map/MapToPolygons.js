import React, { useEffect, useState,useContext, useMemo  } from "react";
import Leaflet from "leaflet";
import { Map, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as neighborhoodsJSON from "./neighborhoods.json";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Control from "react-leaflet-control";
import Slider from "@material-ui/core/Slider";
import polygonCenter from "geojson-polygon-center";
import SchoolDisplayBar from "./SchoolsDisplayBar";
import Context from "../Context";
import * as geometry from "spherical-geometry-js";
import "./map.css";
import ToolBar from "../ToolBar/ToolBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";
delete Leaflet.Icon.Default.prototype._getIconUrl;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    fontSize: "24px",
    marginLeft: "1380px",
    height: "44px",
    width: "420px",
    marginTop: -56,
    color: theme.palette.text.secondary,
  },
  grid: {
    height: 88,
    width: 1720,
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    margin: "0 35px 35px 35px",
    backgroundColor: "midnightblue",
    boxShadow: "8px 8px 8px 8px rgba(0,0,0,.125)",
    // display:'grid',
  },
  title: {
    fontWeight: "bold",
    marginRight: 1550
  },
  buttons: {
    // marginTop: 32,
    marginRight: "1550px",
    height: "50px",
  },
  displayBar: {
    width: "50px",
  },
  map: {
    height: 720,
    width: 1250,
    marginTop: -620,
    marginLeft: 56,
    boxShadow: "8px 8px 8px 8px rgba(0,0,0,.125)",
  },
  control: {
    height: 104,
    width: 176,
    backgroundColor: "white",
    opacity: 0.8,
  },
}));
const GetChanges = () => {
  const {
    midrag,
    schools,
    shcunaZoom,

    shcunaCenter,
    setIndex,
    setSchunaName,
    setSchunaCenter,
    setSchunazoom,
    setSchools,
    setCurrentSchoolClicked,
    setCurrentSchoolClickedProps,
    neighborhoods

  } = useContext(Context);
    const [hoverProps, setHoverProps] = useState({
        key: undefined,
        color: "red",
      });
    
      // const [shcunaName, setSchunaName] = useState("");
            const sumOverflow = (location) => {
        // console.log(location.properties.schools);
        if (location.properties.schools && midrag === 3) {
          var temp = 0;
          location.properties.schools.map((school) => {
            temp += school.shelter_3_overflow;
          });
        } else if (
          (location.properties.schools && midrag === 4) ||
          (location.properties.schools && midrag === 5)
        ) {
          var temp = 0;
          location.properties.schools.map((school) => {
            temp += school.shelter_4_overflow;
          });
        }
        // console.log(temp)
        return temp;
      };
    
      const classes = useStyles();
    
      const handleClick = async (location, e) => {
        setIndex(1);
        await setSchunaCenter([
          polygonCenter(location.geometry).coordinates[1],
          polygonCenter(location.geometry).coordinates[0],
        ]);
    
        setSchools(location.properties.schools);
        // setPosition(e.latlng);
        setHoverProps({ color: "" });
        setSchunaName(location.properties.shemshchun);
        setSchunazoom(15);
      };
      const handleMouseOver = (e, id) => {
        setHoverProps({ key: id, color: "red" });
      };
    
      const handleSchoolClick = (e, school) => {
        setCurrentSchoolClickedProps(school);
        setCurrentSchoolClicked(e.latlng);
        setIndex(0);
      };
  return (
    <Map center={shcunaCenter} zoom={shcunaZoom} className={classes.map}>
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
    />
    <Control position="topright">
      <Grid className={classes.control} item></Grid>
    </Control>
 
    {neighborhoods.map((location) => {
      var temp = [];
      location.geometry.coordinates[0].map(
        (x) => (temp = [...temp, [x[1], x[0]]])
      );
      return (
        <Polygon
          positions={temp}
          onclick={(e) => handleClick(location, e)}
          onmouseover={(e) =>
            handleMouseOver(e, location.properties.UniqueId)
          }
          color={
            hoverProps.key === location.properties.UniqueId
              ? hoverProps.color
              : "grey"
          }
          fillColor={sumOverflow(location) < 0 ? "red" : "green"}
          key={location.properties.UniqueId}
          onmouseout={(e) => {
            setHoverProps({ key: undefined, color: "red" });
          }}
        ></Polygon>
      );
    })}
    {schools
      ? schools.map((school, e) => {
        return (
          <Marker
            position={[school.latitude, school.longitude]}
            onclick={(e) => handleSchoolClick(e, school)}
          >
            <Popup>{school.name}</Popup>
          </Marker>
        );
      })
      : ""}
  </Map>
  )

};
export default GetChanges;

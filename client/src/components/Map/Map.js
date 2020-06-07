import React, { useState, useMemo, useContext } from "react";
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
import MapToPolygon from './MapToPolygons'
Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";
delete Leaflet.Icon.Default.prototype._getIconUrl;

const neighborhoods = neighborhoodsJSON.features;

const defIcon = Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  // iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconUrl: require("./university.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

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
const MapDisplay = () => {
  const [hoverProps, setHoverProps] = useState({
    key: undefined,
    color: "red",
  });

  const [midrag, setMidrag] = useState(3);
  const [sendToDB, setSendToDB] = useState(false);
  const [clickedIcon, setClickedIcon] = useState(false);
  const [shcunaZoom, setSchunazoom] = useState(13);
  const [shcunaCenter, setSchunaCenter] = useState([32.071956, 34.774068]);
  const [shcunaName, setSchunaName] = useState("");
  const [schools, setSchools] = useState();
  //const [position, setPosition] = useState([32.071956, 34.774068]);
  const [currentSchoolClicked, setCurrentSchoolClicked] = useState();
  const [change, setChange] = useState([]);
  const [alertsPopUp, setAlertsPopUp] = useState(0);
  const [currentSchoolClickedProps, setCurrentSchoolClickedProps] = useState();
  const [index, setIndex] = useState(2);

  const currentSchools = useMemo(() => {
    if (schools && currentSchoolClicked) {
      return schools.map((school) => {
        console.log(school);
        return {
          name: school.name,
          distance: geometry.computeDistanceBetween(
            [currentSchoolClicked.lat, currentSchoolClicked.lng],
            [school.latitude, school.longitude]
          ),
          shelter_3_overflow: school.shelter_3_overflow,
          shelter_4_overflow: school.shelter_4_overflow.shelter_4_overflow,
          capacity3: school.shelter_3_capacity,
          capacity4: school.shelter_4_capacity,
          total: school.total_students,
          id: school.id,
          type: school.type,
        };
      });
    }
  }, [schools, currentSchoolClicked]);
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
     setSchunaCenter([
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
    <Context.Provider
      value={{
        midrag,
        shcunaZoom,
        currentSchools,
        currentSchoolClickedProps,
        schools,
        index,
        change,
        alertsPopUp,
        sendToDB,
        clickedIcon,
        shcunaCenter,
        setIndex,
        setClickedIcon,
        setSchunaCenter,
        setSchunazoom,
        setSchools,
        setCurrentSchoolClicked,
        setCurrentSchoolClickedProps,
        setChange,
        setAlertsPopUp,
        setSendToDB,
        setSchunaName,
        neighborhoods
      }}
    >
      <div >
      
        <ToolBar />
        <Typography
          className={classes.title}>
          {"אנא בחר מדרג"}
        </Typography>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          className={classes.buttons}
          defaultValue={2}
          aria-labelledby="discrete-slider-always"
          value={midrag}
        >

          <Button onClick={(e) => setMidrag(1)} >1</Button>
          <Button onClick={(e) => setMidrag(2)}>2</Button>
          <Button onClick={(e) => setMidrag(3)}>3</Button>
          <Button onClick={(e) => setMidrag(4)}>4</Button>
          <Button onClick={(e) => setMidrag(5)}>5</Button>
        </ButtonGroup>
        {/* <div className={classes.empty}></div> */}
        {/* <Grid className={classes.grid} item xs={12}> */}
        {/* {"אנא בחר מדרג"} */}

        <Paper className={classes.paper}>{`שכונה: ${shcunaName}`}</Paper>

        <SchoolDisplayBar midrag={midrag} schools={schools} />

        <MapToPolygon/>
      </div>
    </Context.Provider>
  );
};
export default MapDisplay;

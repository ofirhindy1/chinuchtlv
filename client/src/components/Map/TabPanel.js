import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MosadDistance from "./MosadDistance";
import SchoolsStatus from "./SchoolStatus";
import Context from "../Context";
import Card from "@material-ui/core/Card";
import FadeIn from "react-fade-in";
import CardContent from "@material-ui/core/CardContent";
import AllSchunot from "./AllShcunot";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    marginTop: 36,
    marginLeft: 1350,
    width: 500,
    // backgroundColor: theme.palette.background.paper,
  },
  card: {
    height: 500,
    boxShadow: "8px 8px 8px 8px rgba(0,0,0,.125)",

    overflow: "auto",
  },
  line: {
    height: 60,
  },
  appbar: {
    backgroundColor: "midnightblue",
    boxShadow: "8px 8px 8px 8px rgba(0,0,0,.125)",
  },
  tab: {
    fontSize: 20,
  },
}));

export default function SimpleTabs() {
  const { midrag, currentSchools, schools, index } = useContext(Context);

  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [indexTabs, setIndexTabs] = React.useState(index);
  // console.log(currentSchoolClickedName)
  const handleChange = (event, newValue) => {
    setIndexTabs(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Tabs
          value={index}
          className={classes.tabs}
          onChange={handleChange}
          aria-label="simple tabs example">
          <Tab className={classes.tab} label="מוסד חינוכי" {...a11yProps(0)} />
          <Tab className={classes.tab} label="שכונה" {...a11yProps(1)} />
          <Tab className={classes.tab} label="כלל העיר" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={index} index={0}>
        <FadeIn>
          <MosadDistance />
        </FadeIn>
      </TabPanel>
      <TabPanel value={index} index={1}>
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <FadeIn>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom>
                {schools
                  ? schools.map((school) => <SchoolsStatus school={school} onClick={e=>console.log(e)} />)
                  : "אין בתי ספר להציג"}
              </Typography>
            </FadeIn>
          </CardContent>
        </Card>
      </TabPanel>
      <TabPanel value={index} index={2}>
        <Card className={classes.card} variant="outlined">
          <FadeIn>
            <AllSchunot />
          </FadeIn>
        </Card>
      </TabPanel>
    </div>
  );
}

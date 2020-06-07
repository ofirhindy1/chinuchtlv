import React, { useState, useContext, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Context from "../Context";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grow from "@material-ui/core/Grow";
import cogoToast from "cogo-toast";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    width: 420,
    marginTop: -15,
    height: 500,
    overflow: "auto",
  },
  card: {
    width: 400,
    // marginRight:80
  },
  title: {
    fontSize: 35,
  },
  details: {
    fontSize: 20,
    marginRight: -240,
  },
  listOfDistances: {
    marginTop: 20,
  },
  overflow: {
    marginRight: 156,
    height: 24,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    width: 40,
    opacity: 0.8,
    backgroundColor: "red",
    color: "white",
  },

  //   pos: {
  //     marginBottom: 12,
  //   },
});

const MosadDistance = () => {
  const classes = useStyles();

  const {
    midrag,
    currentSchools,
    currentSchoolClickedProps,
    setChange,
    change,
    setAlertsPopUp,
    alertsPopUp,
    neighborhoods,
  } = useContext(Context);
  // console.log(currentSchoolClickedProps)
  const handleHidden = (school) => {
    if (school.shelter_3_overflow > 0) {
      return false;
    }
    return true;
  };

  const schoolsById = useMemo(() => {
    const schoolsById = new Map();
    neighborhoods.forEach((neighborhood) => {
      neighborhood.properties.schools.forEach((school) => {
        schoolsById.set(school.id, school);
      });
    });

    return schoolsById;
  }, [neighborhoods]);

  const modifiedSchools = useMemo(() => {
    const modifiedSchools = {};
    /** @todo rename change to changes, c to change */
    console.log(change);
    change.forEach(({ from, to, students }) => {
      //Make sure both schools are in the modifiedSchools record.
      if (!modifiedSchools[from]) {
        modifiedSchools[from] = schoolsById.get(from)[`shelter_${midrag}_overflow`];
      }
      if (!modifiedSchools[to]) {
        modifiedSchools[to] = schoolsById.get(to)[`shelter_${midrag}_overflow`];
      }

      console.log(
        `from is ${typeof modifiedSchools[
        from
        ]}, to is ${typeof modifiedSchools[to]}, students is ${typeof students}`
      );

      //Make the transaction.
      modifiedSchools[from] += students;
      modifiedSchools[to] -= students;
    });

    console.log("modified schools!");
    console.log(modifiedSchools);
    return modifiedSchools;
  }, [change, schoolsById]);

  const [expanded, setExpanded] = useState(false);
  const [tempChange, setTempChange] = useState();
  //const [modifiedChanges, setModifiedChanges] = useState({});
  const [amount, setAmount] = useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleStudentsChange = (e, sendTo) => {
    setTempChange({
      from: currentSchoolClickedProps.id,
      fromType: currentSchoolClickedProps.type,
      to: sendTo.id,
      toType: sendTo.type,
      students: parseInt(e.target.value),
    });

    // console.log(currentSchoolClickedProps)
  };
  const handleStudentsMove = () => {
    setAmount(parseInt(tempChange.students));
    // console.log(change);
    setChange([...change, tempChange]);
    // console.log(alertsPopUp)
    setAlertsPopUp(alertsPopUp + 1);
    cogoToast.success("התלמידים הועברו בהצלחה");
  };
  return (
    <ExpansionPanel className={classes.root} variant="outlined">
      <ExpansionPanelSummary>
        <hr />
        <div style={{ display: "grid" }}>
          {currentSchoolClickedProps ? (
            <Card>
              <Grow in={true}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textPrimary"
                    gutterBottom
                  >
                    {`${currentSchoolClickedProps.name}`}
                  </Typography>
                  <Typography
                    className={classes.details}
                    color="textSecondary"
                    gutterBottom
                  >
                    {`כמות התלמידים:${currentSchoolClickedProps.total_students}`}
                  </Typography>
                  <Typography
                    className={classes.details}
                    color="textPrimary"
                    gutterBottom
                  >
                    {`יכול להכיל: ${currentSchoolClickedProps.shelter_3_capacity}`}
                  </Typography>
                  <Typography
                    className={classes.details}
                    color="textPrimary"
                    gutterBottom
                  >
                    {currentSchoolClickedProps.shelter_3_overflow < 0
                      ?
                      modifiedSchools.hasOwnProperty(currentSchoolClickedProps.id) ?
                        `חסר: ${
                        modifiedSchools[currentSchoolClickedProps.id]
                        }` :
                        `חסר: ${
                        currentSchoolClickedProps.shelter_3_overflow
                        }`
                      : ""}
                  </Typography>
                  <Typography
                    className={classes.details}
                    color="textSecondary"
                    gutterBottom
                  >
                    {`כתובת:${currentSchoolClickedProps.address}`}
                  </Typography>
                </CardContent>
              </Grow>
            </Card>
          ) : (
              ""
            )}
          <Typography
            className={classes.listOfDistances}
            color="textSecondary"
            gutterBottom
          >
            <hr />

            {currentSchools
              ? currentSchools.map((school) => (
                <ExpansionPanel
                  hidden={handleHidden(school)}
                  expanded={expanded === school.id}
                  onChange={handleChange(school.id)}
                  className={classes.card}
                  // onClick={(e) => setExpanded(!expanded)}
                  variant="outlined"
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid
                      className={classes.overflow}
                      style={
                        school.shelter_3_overflow < 0 && midrag === 3
                          ? { backgroundColor: "red" }
                          : { backgroundColor: "green" }
                      }
                    >
                      {midrag === 3
                        ?
                        // modifiedSchools
                        // ?
                        // console.log(modifiedSchools.hasOwnProperty(school.id))
                        modifiedSchools.hasOwnProperty(school.id) ?
                          `${Math.floor(
                            modifiedSchools[school.id]
                          )}`
                          // if (details.from === school.name) {
                          //   return `${Math.floor(
                          //     school.shelter_3_overflow - amount
                          //   )}`;
                          // }
                          : `${Math.floor(school.shelter_3_overflow)}`
                        : midrag === 4 || midrag === 5
                          ? `${Math.floor(school.shelter_4_overflow - amount)}`
                          : ""}
                    </Grid>
                    {`${school.name}:    ${
                      Math.round(school.distance) / 1000
                      } ק"מ`}
                  </ExpansionPanelSummary>

                  <ExpansionPanelDetails>
                    <Typography
                      className={classes.listOfDistances}
                      color="textSecondary"
                      gutterBottom
                    >
                      {midrag === 3 && school.shelter_3_overflow > 0
                        ? `כמות מקסימלית ${school.shelter_3_overflow}`
                        : ""}
                    </Typography>
                    {school.shelter_3_overflow > 0 ||
                      school.shelter_4_overflow ? (
                        <div
                          // className={classes.root}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="outlined-basic"
                            label="כמות תלמידים להעברה"
                            variant="outlined"
                            onChange={(e) => handleStudentsChange(e, school)}
                          />
                          <Button onClick={(e) => handleStudentsMove(school)}>
                            העבר
                          </Button>
                        </div>
                      ) : (
                        "לא ניתן להעביר למוסד זה"
                      )}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))
              : "אנא בחר מוסד לימוד"}
            <br />
          </Typography>
        </div>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails></ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default MosadDistance;

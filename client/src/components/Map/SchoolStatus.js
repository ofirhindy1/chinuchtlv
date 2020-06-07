import React, { useState, useContext ,useMemo} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Context from "../Context";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CardContent from "@material-ui/core/CardContent";
import { Grid } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";

// import TabPanel from '@material-ui/core/TabPanel';

const useStyles = makeStyles({
  root: {
    display: "grid",
  },
  card: {
    width: 460,
    height: 120,
    // marginRight:80
  },
  panel: {
    display: "flex",
  },

  title: {
    marginTop: -16,
    fontSize: 24,
    fontWeight: "bold",
  },
  mosad: {
    // textAlign: "right",
    fontSize: 20,
    fontWeight: "bold",
  },
  line: {
    width: "100%",
    height: 80,
    maxWidth: 400,
    marginTop: 10,
    // marginLeft: 15,
    boxShadow: "2px 2px 2px 1px rgba(0,0,0,.125)",

    backgroundColor: "white",
  },
  empty: {
    height: 190,
  },
  status: {
    marginRight: 36,
    top: 8,
  },
  button: {
    direction: "rtl",
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
});

const SchoolsStatus = ({ school }) => {
  const {
    midrag,
    setCurrentSchoolClicked,
    setIndex,
    setCurrentSchoolClickedProps,
    change,
    neighborhoods,

  } = useContext(Context);
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
      console.log(`from ${from}, to${to}, students ${students}`)
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
  const classes = useStyles();
  const handleClick = () => {
    setIndex(0);
    setCurrentSchoolClicked({ lat: school.latitude, lng: school.longitude });
    setCurrentSchoolClickedProps(school);

    // setCurrentSchoolClicked()
  };
  return (
    // <Card>
    <div>
      <Button onClick={handleClick}>
        <Card variant="outlined" className={classes.line}>
          <Grow in={true}>
            <CardContent className={classes.root} onclick={handleClick}>
              {school.shelter_3_overflow < 0 ? (
                <HighlightOffIcon style={{ color: "red" }} />
              ) : (
                <CheckCircleIcon style={{ color: "green" }} />
              )}
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom>
                {school.name ? ` מוסד: ${school.name}` : ""}

                <Grid className={classes.overflow}>
                  {midrag === 3
                    // ? change
                      ? 
                      modifiedSchools.hasOwnProperty(school.id) ?
                          // if (details.from === school.name) {
                          //   console.log(change);
                          //   return `${Math.round(
                          //     school.shelter_3_overflow +
                          //       parseInt(details.students)
                            // )}`;
                        //   } else if (details.to === school.name) {
                        //     return `${Math.round(
                        //       school.shelter_3_overflow - details.students
                        //     )}`;
                        //   } else {
                        //     return `${Math.round(school.shelter_3_overflow)}`;
                        //   }
                        // })
                        `${Math.floor(
                          modifiedSchools[school.id]
                        )}`:`${Math.floor(school.shelter_3_overflow)}`
                      // : `${Math.floor(school.shelter_3_overflow)}`
                    : midrag === 4 || midrag === 5
                    ? school.shelter_4_overflow > 0
                      ? `${Math.round(school.shelter_4_overflow)}`
                      : `${Math.floor(school.shelter_4_overflow)}`
                    : ""}
                </Grid>
              </Typography>
            </CardContent>
          </Grow>
        </Card>
      </Button>
    </div>
  );
};

export default SchoolsStatus;

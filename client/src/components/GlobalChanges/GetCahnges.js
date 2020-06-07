import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import List from "@material-ui/core/List";
import Context from "../Context";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Loader from "./Loader";
import cogoToast from 'cogo-toast';
const GetChanges = () => {
  const [data, setData] = useState("");
  const { setChange } = useContext(Context);


  useEffect(() => {
    axios
      .get("/files")
      .then((response) => {
        // handle success
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        cogoToast.error("נכשלה טעינת התכנית")
        console.log(error);
      });
  });
  
  return (
    <List>
      {/* //   className={classes.bar}> */}
      {data ? (
        data.map((change, index) => (
          // <div onClick={e=>console.log(change)}>
          <div onClick={e=>
       { cogoToast.success("תכנית נטענה בהצלחה")
        setChange(change.changes)}}>
            <ListItem button key={change.fileName}>
              {/* //    className={classes.item} > */}
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={`${change.fileName}(יוצר:${change.creator})`}
              />
            </ListItem>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </List>
  );
};
export default GetChanges;

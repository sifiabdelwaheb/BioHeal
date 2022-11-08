import React, { useState } from "react";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "#225938",
    fontSize: "20px",
    minWidth: "100%",
    backgroundColor: "wh",
  },
  icon: {
    color: "white",

    position: "relative",
  },
  list: {
    width: "250px",
  },
}));

function DrawerComponent() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
     
      <Button onClick={() => setOpenDrawer(true)}>Open Left</Button>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            marginTop: "100px",
            backgroundColor: "#fff",
            width: "40%",
          },
        }}
      >
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/app/dashboards/identify" className={classes.link}>
                Identify
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/app/dashboards/plants" className={classes.link}>
                Plants
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/app/dashboards/identify" className={classes.link}>
                Healthcare
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/about" className={classes.link}>
                Personalized foods
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/about" className={classes.link}>
                Green tours
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </div>
  );
}
export default DrawerComponent;

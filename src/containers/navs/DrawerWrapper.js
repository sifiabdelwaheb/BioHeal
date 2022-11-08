import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Divider } from "@material-ui/core";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    backgroundColor: "#70ca95",
    marginTop: "100px",
    color: "white",
    width:'90%'
  },
  icon: {
    color: "white",

    position: "relative",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "20px",
    minWidth: "100%",
    backgroundColor: "wh",
  },
});

const DrawerWrapper = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)} className={classes.icon}>
        <MenuIcon />
      </IconButton>
      <Drawer
        classes={{ paper: classes.paper }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div
          tabIndex={0}
          role="button"
          
          classes={{ root: classes.root }}
        >
          <div className={classes.list}>
            <List>
              <ListItem onClick={() => setIsOpen(false)}>
                <ListItemText onClick={() => setIsOpen(false)}>
                  <Link to="/app/dashboards/identify" className={classes.link}>
                    Identify
                  </Link>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem onClick={() => setIsOpen(false)}>
                <ListItemText>
                  <Link to="/app/dashboards/plants" className={classes.link}>
                    Plants
                  </Link>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem onClick={() => setIsOpen(false)}>
                <ListItemText onClick={() => setIsOpen(false)}>
                  <Link to="/app/dashboards/healthcare" className={classes.link}>
                    Healthcare
                  </Link>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem onClick={() => setIsOpen(false)}>
                <ListItemText>
                  <Link to="/app/dashboards/personalized"className={classes.link}>
                    Personalized foods
                  </Link>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem onClick={() => setIsOpen(false)}>
                <ListItemText>
                  <Link to="/about" className={classes.link}>
                    Green tours
                  </Link>
                </ListItemText>
              </ListItem>
              <Divider />
            </List>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerWrapper;

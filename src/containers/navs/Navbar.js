import React from "react";
import {
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import DrawerWrapper from "./DrawerWrapper";
import menuItems from "../../constants/menu";
import { Nav, NavItem, Collapse } from "reactstrap";
import { NavLink } from "react-router-dom";
import Classes from "./style.module.css";
import IntlMessages from "../../helpers/IntlMessages";
import { injectIntl } from "react-intl";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuIcon from "@material-ui/icons/Menu";
const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(4),
    display: "flex",
    paddingTop: "1%",

    paddingRight: "20%",
    width: "70%",
  },

  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
    customHoverFocus: {
      "&:hover, &.Mui-focusVisible": { backgroundColor: "yellow" },
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar
      style={{ height: "100px", backgroundColor: "#70ca95", zIndex: "2" }}
    >
      <Toolbar style={{ backgroundColor: "#70ca95", height: "100px" }}>
        <div
          className="name mr-1 font-weight-bold"
          style={{
            flexGrow: "1",
            cursor: "pointer",
            color: "#fff",
            paddingTop: "1%",
            marginLeft: "3%",
          }}
        >
          <a className={Classes.navbar_title}>Green Hill</a>
        </div>

        {isMobile ? (
          <div>
            <DrawerWrapper />
          </div>
        ) : (
          <div className={classes.navlinks}>
            <Nav style={{ width: "100%" }}>
              {menuItems().map((item) => {
                return (
                  <NavItem key={item.id} style={{ marginLeft: "2%" }}>
                    <NavLink
                      to={item.to}
                      data-flag={item.id}
                      className={Classes.Linktitle}
                      activeStyle={{
                        color: "white",

                        position: "relative",
                        textUnderlineOffset: "5px",
                        fontSize: "20px",
                        textDecoration: " underline #225938 5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                          fontSize: "200%",
                        }}
                      >
                        <i className={item.icon} />{" "}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",

                          fontSize: "19px",
                        }}
                      >
                        <IntlMessages id={item.label} />
                      </div>
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default injectIntl(Navbar);

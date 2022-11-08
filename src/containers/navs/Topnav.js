import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import logoutAction from "../../redux/auth/authUserRedux";
import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
  changeSelectedMenuHasSubItems,
} from "../../redux/actions";
import allUsersActions from "../../redux/users/getAllUsersRedux";
import allLanguageActions from "../../redux/language/updateLanguageRedux";
import logo from "../../assets/images/planteye.png";
import logo2 from "../../assets/images/avatr_logo.png";
import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions,
  isDarkSwitchActive,
} from "../../constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "../../components/svg";

import { getDirection, setDirection } from "../../helpers/Utils";
import Classes from "./style.module.css";

import IntlMessages from "../../helpers/IntlMessages";
import Sidebar from "./Sidebar";
import { Nav, NavItem, Collapse } from "reactstrap";
import menuItems from "../../constants/menu";
import { Row, Col, Input } from "reactstrap";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import DrawerComponent from "./Drawer";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
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
  },
}));

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: "",
      lang:
        (localStorage.getItem("currentLanguage") &&
          localStorage.getItem("currentLanguage").toUpperCase()) ||
        "EN",
    };
  }

  handleChangeLocale = (locale, direction) => {
    console.log("direction", direction);
    this.props.changeLocale(locale);
    this.props.updateLanguage(locale, this.props.id);
    this.setState({ lang: locale.toUpperCase() });

    setDirection(direction);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch = () => {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  };
  removeEventsSearch = () => {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: "",
      });
    }
  };
  handleSearchInputChange = (e) => {
    this.setState({
      searchKeyword: e.target.value,
    });
  };
  handleSearchInputKeyPress = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    this.props.history.push(searchPath + "/" + this.state.searchKeyword);
    this.setState({
      searchKeyword: "",
    });
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen,
    });
  };

  handleLogout = async () => {
    await window.location.reload();
    await this.props.logoutHandler();
    await localStorage.removeItem("persist:root");
    await localStorage.removeItem("__theme_color");
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  openSubMenu = (e, menuItem) => {
    const selectedParent = menuItem.id;
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
    this.props.changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      this.setState({
        viewingParentMenu: selectedParent,
        selectedParentMenu: selectedParent,
      });
      this.toggle();
    } else {
      e.preventDefault();

      const { containerClassnames, menuClickCount } = this.props;
      const currentClasses = containerClassnames
        ? containerClassnames.split(" ").filter((x) => x !== "")
        : "";

      if (!currentClasses.includes("menu-mobile")) {
        if (
          currentClasses.includes("menu-sub-hidden") &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.props.setContainerClassnames(3, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes("menu-hidden") &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(2, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes("menu-default") &&
          !currentClasses.includes("menu-sub-hidden") &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(0, containerClassnames, hasSubMenu);
        }
      } else {
        this.props.addContainerClassname(
          "sub-show-temporary",
          containerClassnames
        );
      }
      this.setState({
        viewingParentMenu: selectedParent,
      });
    }
  };
  setHasSubItemStatus = () => {
    const hasSubmenu = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubmenu);
    this.toggle();
  };
  
  render(
    
  ) {
    console.log("lang", this.state.lang);
    const { containerClassnames, menuClickCount, locale } = this.props;
    const { messages } = this.props.intl;
    return (
      <nav className="navbar fixed-top" style={{ height: "150px" }}>
        <div
          className="d-flex align-items-center"
          style={{ marginLeft: "10%" }}
        >
          {/* <div className="search" data-search-path="/app/pages/search">
						<Input
							name="searchKeyword"
							id="searchKeyword"s
							placeholder={messages['menu.search']}
							value={this.state.searchKeyword}
							onChange={(e) => this.handleSearchInputChange(e)}
							onKeyPress={(e) => this.handleSearchInputKeyPress(e)}
						/>
						<span className="search-icon" onClick={(e) => this.handleSearchIconClick(e)}>
							<i className="simple-icon-magnifier" />
						</span>
					</div> */}

          {/* <div className="position-relative d-none d-none d-lg-inline-block">
            <as
              className="btn btn-outline-primary btn-sm ml-2"
              target="_top"
              href="https://themeforest.net/cart/configure_before_adding/22544383?license=regular&ref=ColoredStrategies&size=source"
            >
              <IntlMessages id="user.buy" />
            </a>
          </div> */}
          <div className="d-flex align-items-center">
            <div className="name mr-1 font-weight-bold h2">Green Hill</div>

            <div
              style={{
                minWidth: "500px",
                marginLeft: "60px",
              }}
            >
              <Nav horizontal className="list-unstyled">
                {menuItems().map((item) => {
                  return (
                    <NavItem key={item.id} style={{ minWidth: "100px" }}>
                      <NavLink
                        to={item.to}
                        data-flag={item.id}
                        className={Classes.Linktitle}
                        activeStyle={{
                          color: "#335e33",
                          fontWeight: "bold",
                          position: "relative",
                          textUnderlineOffset: "4px",
                          textDecoration: " underline #335e33 5px",
                          backgroundColor: "#335e33",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i className={item.icon} />{" "}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "center",

                            fontSize: "15px",
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
          </div>
        </div>

        <div>
          <div className="d-inline-block" style={{ marginLeft: "-180px" }}>
            <UncontrolledDropdown className="mr-2">
              <DropdownToggle
                caret
                color="light"
                size="sm"
                className="language-button"
              >
                <span className="name">{this.state.lang}</span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                {localeOptions.map((l) => {
                  return (
                    <DropdownItem
                      onClick={() => this.handleChangeLocale(l.id, l.direction)}
                      key={l.id}
                    >
                      {l.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          {/*
					<div className="d-inline-block">
						<Button
							style={{
								backgroundColor: '#00B978',
								marginRight: '20px',
								fontSize: '16px',
								fontWeight: '600',
								color: 'white',
								borderRadius: '9px',
								borderColor: '#00B978',
								minWidth: '140px',
								transition: 'all 250ms'
							}}
							className={`btn-shadow btn-multiple-state  ${this.props.loading ? 'show-spinner' : ''}`}
							size="md"
							onClick={this.props.onClickLogin}
						>
							<span className="spinner d-inline-block">
								<span className="bounce1" />
								<span className="bounce2" />
								<span className="bounce3" />
							</span>

							<span className="label">
								{' '}
								<IntlMessages id={'user.login-button'} />
							</span>
						</Button>

						<Button
							style={{
								backgroundColor: '#00B978',
								marginRight: '20px',
								fontSize: '16px',
								fontWeight: '600',
								color: 'white',
								borderRadius: '9px',
								borderColor: '#00B978',
								minWidth: '140px',
								transition: 'all 250ms'
							}}
							className={`btn-shadow btn-multiple-state ${this.props.loading ? 'show-spinner' : ''}`}
							size="md"
							onClick={this.props.onClickRegister}
						>
							<span className="spinner d-inline-block">
								<span className="bounce1" />
								<span className="bounce2" />
								<span className="bounce3" />
							</span>

							<span className="label"> Sign Up</span>
						</Button>
					</div>
					/*
					{/* {isDarkSwitchActive && <TopnavDarkSwitch />} */}

          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                {this.props.auth.response.logo !== "" ? (
                  <div className=" rounded-circle  societylogo  ">
                    <img
                      style={{ maxWidth: "60px", maxHeight: "70px" }}
                      className={"rounded-circle img-fluid logosociety "}
                      src={logo2}
                      alt="logo"
                    />
                  </div>
                ) : (
                  <span className="name mr-1 font-weight-bold h5">
                    {this.props.auth.response.username}
                  </span>
                )}
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem onClick={this.handleLogout}>
                  <IntlMessages id={"topnav.signout"} />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    containerClassnames: state.menu.containerClassnames,
    menuClickCount: state.menu.menuClickCount,
    selectedMenuHasSubItems: state.menu.selectedMenuHasSubItems,
    locale: state.settings.locale,
    auth: state.auth,
    id: state.auth.response.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setContainerClassnames: (parm1, param2, param3) =>
      dispatch(setContainerClassnames(parm1, param2, param3)),
    clickOnMobileMenu: (parm1) => dispatch(clickOnMobileMenu(parm1)),
    changeLocale: (parm1) => dispatch(changeLocale(parm1)),
    logoutHandler: () => dispatch(logoutAction.logout()),
    updateLanguage: (data, id) =>
      dispatch(allLanguageActions.updateLanguageRequest(data, id)),
  };
};
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TopNav));

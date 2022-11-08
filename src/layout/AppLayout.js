import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopNav from "../containers/navs/Topnav";
import TopNabHome from "../containers/navs/TopnavHome";
import Sidebar from "../containers/navs/Sidebar";
import { Navbar, Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import Classes from "./style.module.css";
import img from "../assets/images/big_data_analytics.jpg";
import Navbars from "../containers/navs/Navbar";
class AppLayout extends Component {
  render() {
    const { containerClassnames } = this.props;
    return (
      <div id="app-container">
        <div style={{ marginLeft: "4%", width: "96%" }}>
          <div style={{ width: "100%" }}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);

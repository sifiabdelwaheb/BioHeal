import React, { useState, useEffect, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeLocale } from "../../../redux/actions";

import { Redirect } from "react-router-dom";
import Classes from "./style.module.css";
import IntlMessages from "../../../helpers/IntlMessages";
import { injectIntl } from "react-intl";
import HealthcareCard from "../../../components/cards/HealthcareCard";
import { Row, Col, Input } from "reactstrap";

function Healthcare(props) {
  const dispatch = useDispatch();

  return (
    <div className={Classes.Healthcare_Container}>
      <div className={Classes.activities_component_title}>
        {" "}
        Wide Range of Treatments <br />& Activities to Enhance Your Health and
        Wellbeing
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HealthcareCard
          title="SPA"
          image="https://wayspa.wpengine.com/wp-content/uploads/2021/08/Facial-with-Mask.jpg"
        />
        <HealthcareCard
          title="Sauna"
          image="https://jardinage.lemonde.fr/images/dossiers/2018-01/sauna-111439.jpg"
        />
        <HealthcareCard
          title="SPA"
          image="https://wayspa.wpengine.com/wp-content/uploads/2021/08/Facial-with-Mask.jpg"
        />
        <HealthcareCard
          title="SPA"
          image="https://wayspa.wpengine.com/wp-content/uploads/2021/08/Facial-with-Mask.jpg"
        />{" "}
      </div>
    </div>
  );
}

export default injectIntl(Healthcare);

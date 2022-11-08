import React, { useState, useEffect, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeLocale } from "../../../redux/actions";
import { Button } from "reactstrap";

import { Redirect } from "react-router-dom";
import Classes from "./style.module.css";
import IntlMessages from "../../../helpers/IntlMessages";
import { getParameterByName, randomString } from "../../../helpers/Utils";

import { injectIntl } from "react-intl";

import Card from "../../../components/user/Card";

import InputPattern from "../../../common/inputPattern";
import Hoc from "../../../hoc/wrapperInputs";

import Foods_forms from "../../../common/Foods";
import background from "../../../assets/images/bg-heading-02.jpg";
import generateAction from "../../../redux/Foods/FoodsRedux";
import { Spinner } from "reactstrap";

import SelectStepper from "../../../components/stepper/SelectStepper";
const Wrapper = Hoc(InputPattern);
function Personalized(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [datac, setDatac] = useState([]);

  const redux = useSelector((state) => state);
  const [loginErr, setLoginErr] = useState(false);
  const [clicked, setClick] = useState(false);
  const [isValid, setValidation] = useState(false);

  const [foodsDetails, setfoodDetails] = useState(Foods_forms());
  const [id, setIdPlant] = useState("");

  const [forms, setForm] = useState(Foods_forms());
  const [foodUsform, setfoodForm] = useState(Foods_forms());

  const OnGenerate = (data) => {
    dispatch(generateAction.FoodsRequest(data));
  };
  // convert finalobj to a valid object to send to API
  function dataObj(obj) {
    let finalData = {};
    for (let key in obj) {
      if (key === "status") {
        finalData[key] = obj[key].value.value;
      } else {
        finalData[key] = obj[key].value;
      }
    }

    return finalData;
  }

  const onSendForm = (form) => {
    let data = {};
    for (let key in form) {
      data[key] = form[key].value;
    }
    return data;
  };
  const onSendFormHandler1 = () => {
    setClick(true);
    if (isValid) {
      OnGenerate(dataObj(foodsDetails));
    }
  };

  const onSendFormHandler = () => {
    setClick(true);
    if (isValid) {
      OnGenerate(onSendForm(forms));

      // setTimeout(()=>{
      //
      // },1000)
    } else {
      setClick(false);
    }
  };

  return (
    <div className={Classes.Personalized_Container}>
      <div
        className={Classes.container_card}
        style={{
          marginTop: "19px",
        }}
      >
        <>
          <Card
            xs="12"
            sm="6"
            md="12"
            package={"Generate the personalized nutrition plan "}
            withImgCard={false}
            Card={Classes.Card_foods}
            Col={Classes.Col}
          >
            <div
              style={{
                display: "flex",

                flexWrap: "wrap",
              }}
            >
              <Wrapper
                form={foodsDetails}
                textButton="Connexion"
                clicked={clicked}
                setClick={setClick}
                isValid={isValid}
                setValidation={setValidation}
              ></Wrapper>
            </div>
            <div>
              <Button
                onClick={() => onSendFormHandler1()}
                color="primary"
                className="btn-shadow"
                size="lg"
              >
                Generate
              </Button>
            </div>
            {!redux.foods.loaded && clicked && !redux.foods.error && isValid ? (
              <div className={Classes.containerSpan}>
                <Spinner
                  type="grow"
                  color="success"
                  style={{ width: "2rem", height: "2rem" }}
                />
                <Spinner
                  type="grow"
                  color="success"
                  style={{ width: "2rem", height: "2rem" }}
                />
                <Spinner
                  type="grow"
                  color="success"
                  style={{ width: "2rem", height: "2rem" }}
                />
              </div>
            ) : redux.foods.loaded && clicked && isValid ?  (
              <div className={Classes.containerSpan}>
                <p
                  style={{
                    color: "green",
                    marginTop: "-2px",
                  }}
                >
                  {redux.foods.response[0].message}
                </p>
              </div>
            ) : redux.foods.error && !redux.foods.loaded && clicked ? (
              <p
                style={{
                  color: "red",
                  marginLeft: "100px",
                  marginTop: "15px",
                }}
              >
                failure to predict this image
              </p>
            ) : (
              ""
            )}
          </Card>
        </>
      </div>
    </div>
  );
}

export default injectIntl(Personalized);

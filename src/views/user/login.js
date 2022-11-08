import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../../components/user/NavBar";
import { changeLocale } from "../../redux/actions";
import { Navbar, Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import loginForms from "../../common/authUser";
import contactUsForms from "../../common/contactUs";
import Classes from "./style.module.css";
import IntlMessages from "../../helpers/IntlMessages";
import { getParameterByName, randomString } from "../../helpers/Utils";
import { injectIntl } from "react-intl";
import Card from "../../components/user/Card";
import registerUserAction from "../../redux/users/RegisterUserRedux";
import InputPattern from "../../common/inputPattern";
import Hoc from "../../hoc/wrapperInputs";
import loginAction from "../../redux/auth/authUserRedux";
const Wrapper = Hoc(InputPattern);
function Login(props) {
  const dispatch = useDispatch();
  const [loginErr, setLoginErr] = useState(false);
  const [clicked, setClick] = useState(false);
  const [isValid, setValidation] = useState(false);
  const [forms, setForm] = useState(loginForms());

  const redux = useSelector((state) => state);

  useEffect(() => {
    return () => {
      setLoginErr(false);
      // setContactUsErr(false);
    };
    //
  }, [redux.auth.error]);

  useEffect(() => {
    if (redux.auth.token) {
      dispatch(
        changeLocale(
          redux.auth.response.language ||
            localStorage.getItem("currentLanguage")
        )
      );
    }
    return () => {
      setLoginErr(false);
      // setContactUsErr(false);
    };
    //
  }, [dispatch, redux.auth.response.language, redux.auth.token]);

  const onSendForm = (form) => {
    let data = {};
    for (let key in form) {
      data[key] = form[key].value;
    }
    return data;
  };
  let content = null;

  if (redux.auth.loaded) {
    content = <Redirect to="/app/dashboards/plants" />;
  }

  const onSendFormHandler = () => {
    setClick(true);
    if (isValid) {
      onLogin(onSendForm(forms));

      // setTimeout(()=>{
      //
      // },1000)
    } else {
      setClick(false);
    }
  };

  const onLogin = (data) => {
    dispatch(loginAction.authUserRequest(data));
  };
  setTimeout(() => {
    var event = document.createEvent("HTMLEvents");
    event.initEvent("resize", false, false);
    window.dispatchEvent(event);
  }, 350);

  return (
    <Fragment>
      {content}
      <div className={Classes.RowHome}>
        <Card
          xs="12"
          sm="6"
          md="12"
          package={" "}
          withImgCard={false}
          Card={Classes.Cardsearch}
          Col={Classes.Col}
        >
          <div className={Classes.home_title1}>Login to PlantEYE™</div>
          <div style={{ paddingLeft: "10%", width: "140%" }}>
            <Wrapper
              form={forms}
              textButton="Connexion"
              clicked={clicked}
              setClick={setClick}
              isValid={isValid}
              setValidation={setValidation}
            >
              <Button
                color="primary"
                className={`btn-shadow btn-multiple-state ${
                  redux.auth.fetching ? "show-spinner" : ""
                }`}
                size="lg"
                onClick={() => onSendFormHandler()}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>

                <span className="label">
                  {redux.auth.fetching !== null || !redux.auth.fetching ? (
                    <IntlMessages id={"user.login-button"} />
                  ) : (
                    ""
                  )}
                </span>
              </Button>
            </Wrapper>
          </div>
        </Card>
      </div>
    </Fragment>
  );
}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // pass in custom element to use
};

export default Login;

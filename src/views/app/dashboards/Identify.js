import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeLocale } from "../../../redux/actions";
import { Navbar, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Redirect } from "react-router-dom";
import Classes from "./style.module.css";
import IntlMessages from "../../../helpers/IntlMessages";
import { getParameterByName, randomString } from "../../../helpers/Utils";
import { Polar } from "react-chartjs-2";

import { injectIntl } from "react-intl";
import Card from "../../../components/user/Card";
//import registerUserAction from '../../../redux/package/RegisterUserRedux';
import InputPattern from "../../../common/inputPattern";
import Hoc from "../../../hoc/wrapperInputs";
import { Spinner } from "reactstrap";
import { Button } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import IdentifyForms from "../../../common/identify";
import identifyAction from "../../../redux/plant/identifyRedux";
import PlantCard from "../../../components/cards/PlantCard";
import DetailsAction from "../../../redux/plant/detailsRedux";
import { Row, Col, Input } from "reactstrap";
import ReactMap from "../../../components/cards/React_maps";
import { images } from "../../../data/images";
const Wrapper = Hoc(InputPattern);

const List_adress = [
  { id: 1, lat: 36.77393155, lng: 8.687259, name: "test adr1" },
  {
    id: 2,
    lat: 36.8390439,
    lng: 10.1585743,
    name: "test adr2",
  },
];
function Identify(props) {
  const dispatch = useDispatch();
  const [isValid, setValidation] = useState(false);
  const [clicked, setClick] = useState(false);
  const [identifyForm, setidentifyForm] = useState(IdentifyForms());

  const [detail, setdetail] = useState([]);
  const [SpeciesDetail, setSpeciesDetail] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [deleteVerif, setdeleteVerif] = useState(false);
  const redux = useSelector((state) => state);
  //const [selectedId, setSelectedId] = useState()
  const [activeIdx, setActiveIdx] = React.useState(-1);
  const isClicked = (idx) => {
    setActiveIdx(idx);
  };
  const [list, updateList] = useState(detail);

  const onSendForm = (form) => {
    let data = {};
    for (let key in form) {
      data[key] = form[key].value;
    }
    return data;
  };
  const onSendFormHandler = () => {
    setClick(true);
    if (isValid) {
      onIdentify(onSendForm(identifyForm));

      // setTimeout(()=>{
      //
      // },1000)
    } else {
      setClick(false);
    }
  };

  const onIdentify = (data) => {
    dispatch(identifyAction.IdentifyRequest(data));
  };

  function ShowDetails(details) {
    //setSelectedId(details)
    console.log("detailsùùùùùùùù", details);
  }
  const handleClick = (value) => () => {
    console.log("detailsùùùùùùùù", value);
  };

  async function onCardClick(item) {
    console.log("detailsùùùùùùùù", item);
    setdeleteVerif(true);
    setSelectedId(item);
    dispatch(DetailsAction.DetailsRequest({ item }));
    //setSpeciesDetail(redux.search.response.data.asMutable({ deep: true }))
  }

  useEffect(() => {
    if (redux.details.loaded) {
      setSpeciesDetail(redux.details.response.data.asMutable({ deep: true }));
      console.log("details**************", detail);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux.details.loaded, redux.details.response]);

  const onCloseModal = () => {
    setdeleteVerif(false);
  };
  useEffect(() => {
    if (redux.identify.loaded) {
      setdetail(redux.identify.response.data.asMutable({ deep: true }));
      console.log("details**************", detail);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux.identify.loaded, redux.identify.response]);

  return (
    <div className={Classes.Container_Recherche}>
      <Card
        xs="12"
        sm="12"
        md="12"
        package={"Tunisia flora identification"}
        withImgCard={false}
        Card={Classes.Cardsearch}
        Col={Classes.Col}
      >
        <div
          style={{
            width: "70%",
            height: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",

            marginLeft: "10%",
          }}
        >
          <Wrapper
            // onClick={() => console.log(onSendForm(contactUsform))}
            form={identifyForm}
            textButton="Connexion"
            setValidation={setValidation}
            setClick={setClick}

            // errorMessage={redux.contactUs.response}
          />
        </div>
        <div
          style={{
            width: "80%",
            height: "50%",

            marginLeft: "14%",
          }}
        >
          <div className={Classes.predictions}>
            <Button
              variant="contained"
              onClick={() => onSendFormHandler()}
              style={{
                backgroundColor: "#3e884f",
                fontWeight: "bold",
                height: "40px",
                color: "white",
                borderRadius: "20px",
                width: "118px",
              }}
            >
              Identify
            </Button>
            {!redux.identify.loaded &&
            clicked &&
            isValid &&
            !redux.identify.error ? (
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
            ) : redux.identify.loaded && clicked && isValid ? (
              <div className={Classes.containerSpan}>
                <p
                  style={{
                    color: "green",
                    marginTop: "-2px",
                  }}
                >
                  {redux.identify.response.prediction}
                </p>
              </div>
            ) : redux.identify.error && !redux.identify.loaded && clicked ? (
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
          </div>
        </div>
      </Card>

      {redux.identify.loaded && clicked && isValid ? (
        <div>
          <h1 className={Classes.result_title}>Results :</h1>
          <div
            style={{
              width: "100%",
            }}
          >
            {detail &&
              detail.map((details) => {
                return (
                  <PlantCard
                    name={details.Species}
                    family={details.Family}
                    images={details.images}
                    image={details.image}
                    PlantDetails={() => onCardClick(details._id.$oid)}
                  ></PlantCard>
                );
              })}
          </div>
        </div>
      ) : (
        ""
      )}

      {redux.details.loaded ? (
        <Modal
          isOpen={deleteVerif}
          toggle={() => setdeleteVerif(false)}
          style={{
            minWidth: "90%",
            minHeight: "90%",
            backgroundColor: "white",
          }}
        >
          <ModalHeader
            className="text-success"
            toggle={() => setdeleteVerif(false)}
          >
            Plants details
          </ModalHeader>
          <ModalBody
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "600px",
              minWidth: "100%",
            }}
          >
            <div
              style={{
                height: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ display: "flex", alignItems: "center" }}>
                {SpeciesDetail &&
                  SpeciesDetail.map((details) => {
                    return (
                      <div>
                        <Row>
                          <Col>
                            <div
                              className={Classes.plants_title}
                              style={{
                                minWidth: "220px",
                              }}
                            >
                              {details.Species}
                              {":"}
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ maxHeight: "300px" }}>
                          <Col>
                            <div
                              style={{
                                width: "100%",
                                height: "120%",
                                minWidth: "600px",
                                maxHeight: "340px",

                                marginLeft: "20px",
                                marginTop: "20px",
                                marginBottom: "20px",
                              }}
                            >
                              <img
                                src={details.image}
                                style={{
                                  maxWidth: "250px",
                                  height: "74%",

                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </Col>
                          <Col className={Classes.Card_maps}>
                            {details.adress && (
                              <ReactMap List_adress={details.adress} />
                            )}
                          </Col>
                        </Row>

                        <Row>
                          <Col className={Classes.rearch_title}>Taxonomy :</Col>
                        </Row>

                        <Row>
                          <Col style={{ marginLeft: "20px" }}>
                            Kingdom: Plantae
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{ marginLeft: "24px" }}>
                            Class: {details.Class}
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{ marginLeft: "28px" }}>
                            Family: {details.Family}
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{ marginLeft: "32px" }}>
                            Genus: {details.Genus}
                          </Col>
                        </Row>
                        {details.chemicalName && (
                          <div style={{ marginTop: "3%" }}>
                            <div>
                              <Row className={Classes.rearch_title} xs={3}>
                                Phytochemicals names :
                              </Row>
                              <Row>
                                <p style={{ maxWidth:'90%' }}>
                                  {details.chemicalName.map((item) => {
                                    return (
                                      <a>
                                        {item} {","}
                                      </a>
                                    );
                                  })}
                                </p>
                              </Row>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </h3>
            </div>
          </ModalBody>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default injectIntl(Identify);

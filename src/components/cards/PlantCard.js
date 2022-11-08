import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { injectIntl } from "react-intl";
import { Card, CardBody, CardTitle } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import plantimg from "../../assets/images/medium.jpeg";
import species from "../../data/species";
import Classes from "./style.module.css";

const PlantCard = (props) => (
  <Card style={{ borderRadius: "12px", marginBottom: "2%" }}>
    <CardTitle
      style={{
        backgroundColor: "#CFD8DC",
        height: "70px",
        color: "#43A047",
        padding: "1%",
        cursor: "pointer",
      }}
    >
      <div
        style={{ textDecoration: "underline " }}
        onClick={props.PlantDetails}
      >
        {props.name}
      </div>

      <div className="text-muted text-small" style={{ color: "white" }}>
        {props.family}
      </div>
    </CardTitle>
    <CardBody>
      <div
        style={{
          width: "100%",
          height: "20%",

          flexWrap: "wrap",
        }}
      >
        {props.images ? (
          props.images.map((item) => (
            <img
              className={Classes.card_plants_image}
              src={item.img}
              alt={item.title}
              loading="lazy"
              width={"200px"}
            />
          ))
        ) : (
          <img
            style={{
              marginLeft: "30px",
              minWidth: "200px",
              maxWidth: "200px",
              maxHeight: "200px",
              minHeight: "200px",
            }}
            src={props.image}
            loading="lazy"
            width={"200px"}
          />
        )}
      </div>
    </CardBody>
  </Card>
);

const itemData = [
  {
    img: "https://static.inaturalist.org/photos/15286015/original.jpeg",
    title: "Breakfast",
  },
  {
    img: "https://static.inaturalist.org/photos/15286015/medium.jpeg",
    title: "Burger",
  },
  {
    img: "https://static.inaturalist.org/photos/95779656/medium.jpeg",
    title: "Camera",
  },
  {
    img: "https://static.inaturalist.org/photos/95779625/medium.jpeg",
    title: "Coffee",
  },
];

export default injectIntl(PlantCard);

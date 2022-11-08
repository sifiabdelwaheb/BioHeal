import React, { useState, useEffect, Fragment, useRef } from "react";

import { Label, Input, FormGroup, Dropdown } from "reactstrap";
import IntlMessages from "../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../components/common/CustomSelectInput";
import DropzoneExample from "../containers/forms/DropzoneExample";
import DatePicker from "./datePicker";
import "./style.scss";
import PropTypes from "prop-types";
import { colourOptions } from "../views/app/dashboards/docs/data";
import { Phytochemicals } from "../data/phytochemicals";
import { divide } from "ramda";
const editor = ({
  elementConfig,
  elementType,
  onChange,
  clicked,
  valid,
  value,
  selectedValue,
  defaultInputValue,
  error,
  options,
  type,
  list,
  title,
  edit,
  placeholder,
  onClick,
}) => {
  let inputElement = null;

  switch (elementType) {
    case "Input":
      inputElement = (
        <FormGroup style={{ width: "45%", marginRight: "12px" }}>
          <label
            className="form-group has-float-label mb-4"
            style={{ marginTop: "7%" }}
          >
            <IntlMessages id={elementConfig.label} />
          </label>
          <Input
            style={
              (!valid && clicked) || (clicked && error && error !== null)
                ? { border: "red 1px solid" }
                : { border: null }
            }
            onChange={onChange}
            {...elementConfig}
            value={value}
            type={type}
            name={elementConfig.name}
          />
          {(!valid && clicked) || (clicked && error && error !== null) ? (
            <span style={{ color: "red" }}>{elementConfig.errormsg}</span>
          ) : null}
        </FormGroup>
      );
      break;
    case "Description":
      inputElement = (
        <FormGroup style={{ width: "80%" ,marginTop:'25px'}}>
          <label className="input_label">
            <IntlMessages id={elementConfig.label} />
          </label>
          <Input
            style={
              (!valid && clicked) || (clicked && error && error !== null)
                ? { border: "red 1px solid" }
                : { border: null }
            }
            style={{ minHeight: "150px", }}
            onChange={onChange}
            {...elementConfig}
            value={value}
            type={type}
            name={elementConfig.name}
            type={"textarea"}
            className="input_value"
          />
          {(!valid && clicked) || (clicked && error && error !== null) ? (
            <span style={{ color: "red", fontSize: "12px" }}>
              {" "}
              <IntlMessages id={elementConfig.errormsg} />
            </span>
          ) : null}
        </FormGroup>
      );
      break;
    case "InputNumber":
      inputElement = (
        <FormGroup>
          <label className="form-group has-float-label mb-4">
            <IntlMessages id={elementConfig.label} />
          </label>
          <Input
            style={
              (!valid && clicked) || (clicked && error && error !== null)
                ? { border: "red 1px solid" }
                : { border: null }
            }
            onChange={onChange}
            {...elementConfig}
            value={value}
            type={type}
            name={elementConfig.name}
          />
          {(!valid && clicked) || (clicked && error && error !== null) ? (
            <span style={{ color: "red", fontSize: "12px" }}>
              {" "}
              <IntlMessages id={elementConfig.errormsg} />
            </span>
          ) : null}
        </FormGroup>
      );
      break;
    case "Select":
      inputElement = (
        <FormGroup
          style={{
            width: "45%",
            marginRight: "12px",
            minWidth: "280px",
            borderRadius: "5%",
          }}
        >
          <label
            className="form-group has-float-label mb-1"
            style={{ marginTop: "7%" }}
          >
            <IntlMessages id={elementConfig.label} />
          </label>
          <Select
            components={{ Input: CustomSelectInput }}
            className={
              !valid && clicked ? "react-select__border__red" : "react-select"
            }
            classNamePrefix="react-select"
            name="form-field-name"
            options={options}
            {...elementConfig}
            onChange={(e) => onChange(e, console.log("e********", e))}
            value={value}
            placeholder={elementConfig.placeholder}
            selectedValue={selectedValue}
          />
          {!valid && clicked && <p className="text-danger">Select value</p>}
        </FormGroup>
      );

      break;

    case "SelectMultiple":
      inputElement = (
        <FormGroup style={{ width: "45%", marginRight: "12px" }}>
          <label
            className="form-group has-float-label mb-1"
            style={{ marginTop: "7%" }}
          >
            <IntlMessages id={elementConfig.label} />
          </label>
          <Select
            closeMenuOnSelect={false}
            isMulti
            onChange={(e) => onChange(e, console.log("e********", e))}
            options={options}
            value={value}
          />
          {!valid && clicked && <p className="text-danger">Select value</p>}
        </FormGroup>
      );

      break;

    case "Avatar":
      inputElement = (
        <>
          {edit && value !== "" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "20%",
                marginLeft: "40%",
              }}
            >
              <img
                src={value}
                style={{
                  width: "90%",
                }}
              />
            </div>
          ) : null}
          <DropzoneExample
            dictDefaultMessage="ajouter une image"
            style={{
              backgroundColor: "#000",
              maxHeight: "75px",
              border: "0px solid black",
            }}
            className={
              !valid && clicked
                ? "react-select__border__red"
                : "DropzoneExample"
            }
            eventHandlers={{
              addedfile: (e) => {
                onChange(
                  e,

                  console.log("e********", e)
                );
              },
            }}
          />
          {(!valid && clicked) || (clicked && error && error !== null) ? (
            <span style={{ color: "red" }}>
              {" "}
              <IntlMessages id={"input.invalid"} />
            </span>
          ) : null}
        </>
      );

      break;
    case "Date":
      inputElement = (
        <DatePicker
          id="date"
          name="date"
          selected={value}
          onChange={onChange}
          value={value}
          label={elementConfig.label}
        />
      );
      break;
    case "Theme":
      inputElement = (
        <>
          <label className="text-primary">
            <IntlMessages id={elementConfig.label} />
          </label>
          <div className={`theme-colors theme_user_theme shown`}>
            <div className="p-4">
              <p className="text-muted mb-2">Light Theme</p>
              <div className="d-flex flex-row justify-content-between mb-4">
                {["purple", "blue", "green", "orange", "red"].map((color) => (
                  <span
                    name={color}
                    key={color}
                    href={`#light.${color}`}
                    className={`theme-color theme-color-${color} active `}
                    onClick={() => onChange(`light.${color}`)}
                    style={{
                      background: value === `light.${color}` ? color : "#fff",
                    }}
                  >
                    <span>`light.${color}`</span>
                  </span>
                ))}
              </div>
              <p className="text-muted mb-2">Dark Theme</p>
              <div className="d-flex flex-row justify-content-between">
                {["purple", "blue", "green", "orange", "red"].map((color) => (
                  <span
                    name={color}
                    key={`dark.${color}`}
                    href={`#dark.${color}`}
                    className={`theme-color theme-color-${color} `}
                    style={{
                      background: value === `dark.${color}` ? color : "#fff",
                    }}
                    onClick={(e) => onChange(`dark.${color}`)}
                  >
                    <span>`dark.${color}`</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      );
      break;
    default:
      inputElement = <Input onChange={onChange} />;
  }

  return inputElement;
};
editor.propTypes = {
  isvalid: PropTypes.number,
};
export default editor;

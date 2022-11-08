import React, { useState, useEffect, useContext, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  countryOptions,
  capitalOptions,
  countryToCapital as solutions,
} from "../data";
import { SelectBox } from "../../../elements";
import Stepper_form1 from "../../../../common/Stepper_form1";
import { useDispatch, useSelector } from "react-redux";
import InputPattern from "../../../../common/inputPattern";

import Hoc from "../../../../hoc/wrapperInputs";

import { Navbar, Modal, ModalHeader, ModalBody, Button } from "reactstrap";

const Wrapper = Hoc(InputPattern);

function SelectStep1({ FormContext }) {
  const dispatch = useDispatch();
  const [loginErr, setLoginErr] = useState(false);
  const [clicked, setClick] = useState(false);
  const [forms, setForm] = useState(Stepper_form1());
  const [isValid, setValidation] = useState(false);
  return (
    <>
      <div style={{ backgoundColor: "red" }}>
        <Wrapper
          form={forms}
          textButton="Connexion"
          clicked={clicked}
          setClick={setClick}
          isValid={isValid}
          setValidation={setValidation}
        ></Wrapper>
      </div>
    </>
  );
}

export default SelectStep1;

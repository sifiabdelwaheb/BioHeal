import React, { useState, useEffect, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeLocale } from "../../../redux/actions";
import { Button } from "reactstrap";

import { Redirect } from "react-router-dom";
import Classes from "./style.module.css";
import IntlMessages from "../../../helpers/IntlMessages";
import { getParameterByName, randomString } from "../../../helpers/Utils";

import { injectIntl } from "react-intl";
import profilingAction from "../../../redux/profiling/profilingRedux";
import AddButton from "./Component/AddButton";
import AddNewModal from "../../../containers/pages/AddNewModal";
import ListViewer from "../../../components/dashboards/ListViewer";
import Card from "../../../components/user/Card";
import PlantForms from "../../../common/plants";
import contactUsForms from "../../../common/plants";
import ModalConfirm from "../../../components/dashboards/modalConfirm";
import { NotificationManager } from "../../../components/common/react-notifications";
import { Modal, ModalBody } from "reactstrap";

import { Notifications } from "../../../components/common/react-notifications";

import InputPattern from "../../../common/inputPattern";
import Hoc from "../../../hoc/wrapperInputs";
import { ReactTableAdvancedCard } from "../../../containers/ui/ReactTableCards";
import plantAction from "../../../redux/plant/PlantRedux";
import deletePlantAction from "../../../redux/plant/deletePlantRedux";
import updatePlantAction from "../../../redux/plant/updatePlantRedux";
import { Box } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Tabs from "@material-ui/core/Tabs";

const Wrapper = Hoc(InputPattern);
function Green(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [datac, setDatac] = useState([]);

  const redux = useSelector((state) => state);
  const [loginErr, setLoginErr] = useState(false);
  const [clicked, setClick] = useState(false);
  const [isValid, setValidation] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState("All");
  const [groupColour, setGroupColour] = useState("lightgrey");
  const [isEdit, setIsEdit] = useState(false);
  const [imagePreviewUrl, setimagePreviewUrl] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [plantDetails, setplantDetails] = useState({});
  const [id, setIdPlant] = useState("");

  const [isOpen, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [plantUsform, setPlantForm] = useState(PlantForms().plant);
  const [isOpenModalDelete, setisOpenModalDelete] = useState(false);
  const [deleteVerif, setdeleteVerif] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [packageDetails, setPackageDetails] = useState({});

  let refDelete = useRef(redux.deleteplant.loaded);
  let refAdd = useRef(redux.plant.loaded);
  let refUpdate = useRef(redux.updateplant.loaded);
  const [value, setValue] = React.useState("1");

  console.log("plantUsform plantUsform", plantUsform);

  function onHandlerDeletePlant(id) {
    dispatch(deletePlantAction.deletePlantRequest(id));
    setSelectedId("");
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function openDeleteModal(id) {
    setdeleteVerif(true);
    setSelectedId(id);
  }

  function onHandlerEditPlant(cell) {
    setIsEdit(true);
    setSelectedId(cell.original._id);
    setplantDetails(PlantForms(true, cell.original));

    setOpen(true);
    setClick(false);
    setPreview(false);
  }

  function onHandlerAddPlant() {
    setIsEdit(false);
    setimagePreviewUrl(null);
    setplantDetails(PlantForms(false, ""));
    setOpen(true);
    setClick(false);
    setPreview(false);
  }
  const onSendForm = (form) => {
    let data = {};
    for (let key in form) {
      data[key] = form[key].value;
      if (form[key].value === "") {
        delete data[key];
      } else if (form[key].elementType === "Select") {
        data[key] = form[key].value.value;
      }
    }
    return data;
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
  const onAddPlant = (data) => {
    dispatch(plantAction.PlantRequest(data));
  };
  const onSendFormHandler1 = () => {
    setClick(true);
    if (isValid) {
      if (isEdit) {
        dispatch(
          updatePlantAction.updatePlantRequest(
            dataObj(plantDetails),
            selectedId
          )
        );
      } else {
        onAddPlant(dataObj(plantDetails));
      }
    }
  };

  function onHandlePreview(data) {
    setplantDetails(data);
    setOpen(true);
    setPreview(true);
  }

  const openDeleteConfirm = (cell) => {
    setisOpenModalDelete(true);
    setIdPlant(cell);
  };

  function deleteRequest() {
    // dispatch(deleteUserActions.deleteUserRequest(id));
  }
  const onCloseModal = () => {
    setOpen(false);
    setClick(true);
    setPreview(true);
  };
  function onHandlerAddUser1() {
    setIsEdit(false);

    setPlantForm(PlantForms(true, ""));
    setOpen(true);
  }

  function onHandlerAddUser() {
    setOpen(true);
    setIsEdit(false);
    setClick(false);
    setPreview(false);
    setPlantForm(PlantForms(false, ""));
  }

  const [dataTableColumns] = useState([
    {
      Header: "Class",
      accessor: "Class",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: "Family",
      accessor: "Family",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },

    {
      Header: "Genus",
      accessor: "Genus",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: "Specie",
      accessor: "Species",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
  ]);

  useEffect(() => {
    dispatch(profilingAction.allProfilingRequest());

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (redux.profiling.loaded) {
      setData(redux.profiling.response.data.asMutable({ deep: true }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux.profiling.loaded, redux.profiling.response]);

  useEffect(
    () => {
      if (redux.plant.loaded && redux.plant.loaded !== refAdd.current) {
        dispatch(profilingAction.allProfilingRequest());
        onCloseModal();
        //setPlantForm(plantUsform);
        setplantDetails(PlantForms(false, ""));
        NotificationManager.success(
          " ",
          "Added  Plant Succfully ",
          3000,
          null,
          null
        );
      }
      // if (redux.updatapack.loaded) {
      // 	dispatch(updatepackageActions.updatePackRequest());

      // }
      refAdd.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [redux.plant.loaded]
  );

  useEffect(() => {
    if (
      redux.updateplant.loaded &&
      redux.updateplant.loaded !== refUpdate.current
    ) {
      setOpen(false);
      dispatch(profilingAction.allProfilingRequest());

      NotificationManager.success(
        " ",
        "Update plants Succesfuly",
        3000,
        null,
        null
      );
      setplantDetails(PlantForms(false, ""));
    }
    refUpdate.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux.updateplant.loaded]);
  useEffect(
    () => {
      if (
        redux.deleteplant.loaded &&
        redux.deleteplant.loaded !== refDelete.current
      ) {
        dispatch(profilingAction.allProfilingRequest());
        setdeleteVerif(false);
      }
      refDelete.current = null;
      // if (redux.updatapack.loaded) {
      // 	dispatch(updatepackageActions.updatePackRequest());
      // 	onCloseModalHandler();
      // }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [redux.deleteplant.loaded]
  );
  return (
    <div className={Classes.Home_Container}>
      <div style={{ marginTop: "19px" }}></div>
    </div>
  );
}

export default injectIntl(Green);

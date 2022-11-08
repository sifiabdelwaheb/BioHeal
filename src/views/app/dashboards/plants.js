import React, { useState, useEffect, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeLocale } from "../../../redux/actions";
//import { Button } from 'reactstrap'
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Classes from "./style.module.css";
import IntlMessages from "../../../helpers/IntlMessages";
import { getParameterByName, randomString } from "../../../helpers/Utils";

import { injectIntl } from "react-intl";
import profilingAction from "../../../redux/profiling/profilingRedux";
import AddButton from "./Component/AddButton";
import AddPhytochemicals from "./Component/AddPhytochemicals";
import AddNewModal from "../../../containers/pages/AddNewModal";
import ListViewer from "../../../components/dashboards/ListViewer";
import Card from "../../../components/user/Card";
import PlantForms from "../../../common/plants";
import contactUsForms from "../../../common/plants";
import ModalConfirm from "../../../components/dashboards/modalConfirm";
import { NotificationManager } from "../../../components/common/react-notifications";
import { Modal, ModalBody, Row, Col, Input } from "reactstrap";

import { Notifications } from "../../../components/common/react-notifications";
import InputPattern from "../../../common/inputPattern";
import Hoc from "../../../hoc/wrapperInputs";
import { ReactTableAdvancedCard } from "../../../containers/ui/ReactTableCards";
import plantAction from "../../../redux/plant/PlantRedux";
import deletePlantAction from "../../../redux/plant/deletePlantRedux";
import updatePlantAction from "../../../redux/plant/updatePlantRedux";
//import Dropzone from "../../../containers/ui/Dropzone";
import { PlantSearchForm } from "../../../common/PlantSearch";
import SearchAction from "../../../redux/plant/searchRedux";
import Select from "react-select";
import Options from "../../../data/species";
//import CreatableSelect from 'react-select/creatable';
import { colourOptions } from "./docs/data";

const Wrapper = Hoc(InputPattern);
function Plants(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const redux = useSelector((state) => state);
  const [searchform, setsearchform] = useState(PlantSearchForm);
  const [clicked, setClick] = useState(false);
  const [isValid, setValidation] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [plantDetails, setplantDetails] = useState({});
  const [id, setIdPlant] = useState("");

  const [isOpen, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  const [plantUsform, setPlantForm] = useState(PlantForms());

  const [deleteVerif, setdeleteVerif] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [globalFilter, setGlobalFilter] = useState();
  let refDelete = useRef(redux.deleteplant.loaded);
  let refAdd = useRef(redux.plant.loaded);
  let refUpdate = useRef(redux.updateplant.loaded);
  const [value, setValue] = React.useState();

  const [species, setSpecies] = useState({
    value: "Acacia saligna",
    label: "Acacia saligna",
  });
  console.log("plantUsform plantUsform", plantUsform);

  function onHandlerDeletePlant(id) {
    dispatch(deletePlantAction.deletePlantRequest(id));
    setSelectedId("");
  }

  function OnSearchSpecies(species) {}

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
    //setimagePreviewUrl(null)
    setplantDetails(PlantForms(false, ""));
    console.log("PlantForms*************", PlantForms);
    setOpen(true);
    setClick(false);
    setPreview(false);
  }

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
            selectedId,
            console.log("plantDetails*********************", plantDetails)
          )
        );
      } else {
        onAddPlant(dataObj(plantDetails));
      }
    }
  };

  const onCloseModal = () => {
    setOpen(false);
    setClick(true);
    setPreview(true);
  };

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
      Header: "Species",
      accessor: "Species",

      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },

    {
      Header: "hasSpores",
      accessor: "hasSpores",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: "isVascular",
      accessor: "isVascular",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: "hasFlower",
      accessor: "hasFlower",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },

    {
      Header: "organism",
      accessor: "organism",
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },

    {
      Header: "Edit",
      accesor: "Edit",
      maxWidth: 60,
      Cell: (cell) => (
        <i
          onClick={() => {
            onHandlerEditPlant(cell, cell.original._id);
          }}
          className={"iconsminds-pen-2 tableicons"}
        />
      ),
    },
    {
      Header: "Delete",
      accessor: "Delete",
      maxWidth: 60,
      Cell: (cell) => (
        <i
          onClick={() => openDeleteModal(cell.original._id)}
          className={"simple-icon-trash tableicons"}
        />
      ),
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

  let options = data.map(function (specie) {
    return { value: specie.Species, label: specie.Species };
  });
  console.log("all options***********", options);
  console.log("data *********************", data);
  const onchangeSelect = (item) => {
    //setData(redux.profiling.response.data.asMutable({ deep: true }))
    setSpecies(item);
    console.log(item);
    //setData(redux.search.response.data.asMutable({ deep: true }))
    //dispatch(SearchAction.SearchRequest({ item }));
    //setData(redux.search.response.data.asMutable({ deep: true }))
  };

  function OnSearchSpecies(item) {
    setSpecies(item);
    dispatch(SearchAction.SearchRequest({ item }));
    //setData(redux.search.response.data.asMutable({ deep: true }));
  }
  useEffect(() => {
    if (redux.search.loaded) {
      setData(redux.search.response.data.asMutable({ deep: true }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux.search.loaded, redux.search.response]);

  function OnResetSpecies() {
    setData(redux.profiling.response.data.asMutable({ deep: true }));
  }
  return (
    <div className={Classes.Home_Container}>
      <div style={{ marginTop: "19px" }}>
        <Row>
          <Col>
            <AddButton
              addfunction={() => {
                onHandlerAddPlant();
              }}
            />
          </Col>

          <Col>
            <Select
              value={species}
              onChange={onchangeSelect}
              options={Options}
              getOptionValue={(option) => option.value}
              getOptionLabel={(option) => option.value}
              label={"species"}
            />
          </Col>

          <Col>
            <Button
              variant="contained"
              onClick={() => OnSearchSpecies(species)}
              style={{
                backgroundColor: "#e34b1b",
                fontWeight: "bold",
                height: "40px",
                color: "white",
                borderRadius: "20px",
                width: "118px",
                marginLeft: "12%",
              }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              onClick={() => OnResetSpecies()}
              style={{
                backgroundColor: "#e34b1b",
                fontWeight: "bold",
                height: "40px",
                color: "white",
                borderRadius: "20px",
                width: "118px",
                marginLeft: "12%",
              }}
            >
              Reset
            </Button>
          </Col>
        </Row>

        <AddNewModal
          onSubmitForm={() => onSendFormHandler1()}
          toggleModal={() => onCloseModal()}
          modalOpen={isOpen}
          modalOpen={isOpen}
          preview={preview}
          // fetching={fetchingEdit}
          // error={errorEdit || errorAdd}
          clicked={clicked}
          modaltitle={isEdit ? "Update Plants" : "Add NEW Plants"}
        >
          <div
            style={{
              display: "flex",

              flexWrap: "wrap",
            }}
          >
            <Wrapper
              setClick={setClick}
              setValidation={setValidation}
              clicked={clicked}
              form={plantDetails}
              edit={isEdit}
            />
          </div>
        </AddNewModal>
        <ReactTableAdvancedCard
          data={data}
          dataTableColumns={dataTableColumns}
        ></ReactTableAdvancedCard>
      </div>
      <Modal
        centered
        isOpen={deleteVerif}
        toggle={() => setdeleteVerif(false)}
        className="Modal_Delete_confirm"
        style={{ width: "34%" }}
      >
        <ModalBody
          style={{
            height: 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
              confirm to delete
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                color="white"
                size="m"
                className="top-right-button"
                style={{
                  width: 140,
                  backgroundColor: "#223620",
                  borderColor: "#223620",
                  color: "white",
                  fontWeight: "bold",
                }}
                onClick={() => setdeleteVerif(false)}
              >
                <IntlMessages id="cancel" />
              </Button>
              <Button
                size="m"
                className="top-right-button"
                style={{
                  width: 140,
                  backgroundColor: "#223620",
                  borderColor: "#223620",
                  color: "white",
                  fontWeight: "bold",
                }}
                onClick={() => onHandlerDeletePlant(selectedId)}
              >
                <IntlMessages id="Delete" />
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default injectIntl(Plants);

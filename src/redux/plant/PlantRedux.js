import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  PlantRequest: ["data"],
  PlantSuccess: ["response"],
  PlantFailure: ["error"]
});

export const PlantTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
  data: {}
});
const PlantRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const PlantSuccess = (state, { response }) =>
  state.merge({
    fetching: true,
    error: false,
    loaded: true,
    response
  });

const PlantFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PLANT_REQUEST]: PlantRequest,
  [Types.PLANT_SUCCESS]: PlantSuccess,
  [Types.PLANT_FAILURE]: PlantFailure
});

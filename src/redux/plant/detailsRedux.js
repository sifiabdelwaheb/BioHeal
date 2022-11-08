import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  DetailsRequest: ["data"],
  DetailsSuccess: ["response"],
  DetailsFailure: ["error"]
});

export const DetailsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
  data: {}
});
const DetailsRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const DetailsSuccess = (state, { response }) =>
  state.merge({
    fetching: true,
    error: false,
    loaded: true,
    response
  });

const DetailsFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DETAILS_REQUEST]: DetailsRequest,
  [Types.DETAILS_SUCCESS]: DetailsSuccess,
  [Types.DETAILS_FAILURE]: DetailsFailure
});

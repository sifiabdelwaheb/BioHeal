import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  deletePlantRequest: ['id'],
  deletePlantSuccess: ['response'],
  deletePlantFailure: ['error'],
});

export const deletePlantTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
});
const deletePlantRequest = (state, { id }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null,
  });

const deletePlantSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response,
  });

const deletePlantFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false,
    response: error.response,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_PLANT_REQUEST]: deletePlantRequest,
  [Types.DELETE_PLANT_SUCCESS]: deletePlantSuccess,
  [Types.DELETE_PLANT_FAILURE]: deletePlantFailure,
});

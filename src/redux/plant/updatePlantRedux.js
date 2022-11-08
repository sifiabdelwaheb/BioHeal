import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  updatePlantRequest: ['data', 'id'],
  updatePlantSuccess: ['response'],
  updatePlantFailure: ['error'],
});

export const updateplantTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
});

const updatePlantRequest = (state, { data }) => {
  return state.merge({
    fetching: true,
    error: null,
    loaded: null,
  });
};

const updatePlantSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response,
  });

const updatePlantFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    response: error,
    loaded: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_PLANT_REQUEST]: updatePlantRequest,
  [Types.UPDATE_PLANT_SUCCESS]: updatePlantSuccess,
  [Types.UPDATE_PLANT_FAILURE]: updatePlantFailure,
});

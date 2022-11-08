import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  IdentifyRequest: ['data'],
  IdentifySuccess: ['response'],
  IdentifyFailure: ['error'],
});

export const IdentifyTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
  data: {},
});
const IdentifyRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null,
  });

const IdentifySuccess = (state, { response }) =>
  state.merge({
    fetching: true,
    error: false,
    loaded: true,
    response,
  });

const IdentifyFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.IDENTIFY_REQUEST]: IdentifyRequest,
  [Types.IDENTIFY_SUCCESS]: IdentifySuccess,
  [Types.IDENTIFY_FAILURE]: IdentifyFailure,
});

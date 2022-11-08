import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  SearchRequest: ["data"],
  SearchSuccess: ["response"],
  SearchFailure: ["error"]
});

export const SearchTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
  data: {}
});
const SearchRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const SearchSuccess = (state, { response }) =>
  state.merge({
    fetching: true,
    error: false,
    loaded: true,
    response
  });

const SearchFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_REQUEST]: SearchRequest,
  [Types.SEARCH_SUCCESS]: SearchSuccess,
  [Types.SEARCH_FAILURE]: SearchFailure
});

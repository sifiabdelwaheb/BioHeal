import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  FoodsRequest: ['data'],
  FoodsSuccess: ['response'],
  FoodsFailure: ['error'],
});

export const FoodsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
  data: {},
});
const FoodsRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null,
  });

const FoodsSuccess = (state, { response }) =>
  state.merge({
    fetching: true,
    error: false,
    loaded: true,
    response,
  });

const FoodsFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FOODS_REQUEST]: FoodsRequest,
  [Types.FOODS_SUCCESS]: FoodsSuccess,
  [Types.FOODS_FAILURE]: FoodsFailure,
});

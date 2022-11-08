import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import FOODSActions, { FoodsTypes } from '../../redux/Foods/FoodsRedux';

function* FoodsRequest({ data }) {
  try {
    let response = yield call(axiosRequest, 'post', BaseURL, '/foods', data);
    console.log('response data', response.data);
    yield put(FOODSActions.FoodsSuccess(response.data));
  } catch (e) {
    yield put(FOODSActions.FoodsFailure(e));
  }
}
export default function* registerRequest() {
  yield takeLatest(FoodsTypes.FOODS_REQUEST, FoodsRequest);
}

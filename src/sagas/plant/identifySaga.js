import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import IdentifyActions, { IdentifyTypes } from '../../redux/plant/identifyRedux';

function* IdentifyRequest({ data }) {
  try {
    let response = yield call(axiosRequest, 'post', BaseURL, '/identify', data);
    console.log('response data', response.data);
    yield put(IdentifyActions.IdentifySuccess(response.data));
  } catch (e) {
    yield put(IdentifyActions.IdentifyFailure(e));
  }
}
export default function* registerRequest() {
  yield takeLatest(IdentifyTypes.IDENTIFY_REQUEST, IdentifyRequest);
}

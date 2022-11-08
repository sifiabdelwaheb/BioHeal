import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import PlantActions, { PlantTypes } from '../../redux/plant/PlantRedux';

function* PlantRequest({ data }) {
  try {
    let response = yield call(axiosRequest, 'post', BaseURL, '/plant', data);
    console.log('response data', response.data);
    yield put(PlantActions.PlantSuccess(response.data));
  } catch (e) {
    yield put(PlantActions.PlantFailure(e));
  }
}
export default function* registerRequest() {
  yield takeLatest(PlantTypes.PLANT_REQUEST, PlantRequest);
}

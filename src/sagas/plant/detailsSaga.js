import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import DetallsActions, { DetailsTypes } from '../../redux/plant/detailsRedux';

function* DetailsRequest({ data }) {
  try {
    let response = yield call(axiosRequest, 'post', BaseURL, '/speciesdetails', data);
    console.log('response data', response.data);
    yield put(DetallsActions.DetailsSuccess(response.data));
  } catch (e) {
    yield put(DetallsActions.DetailsFailure(e));
  }
}
export default function* SearchPlant() {
  yield takeLatest(DetailsTypes.DETAILS_REQUEST, DetailsRequest);
}
import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest from '../../utils/requests';

import deletePlantActions, {
  deletePlantTypes,
} from '../../redux/plant/deletePlantRedux';

function* deleteRequest({ id }) {
  try {
    let response = yield call(axiosRequest, 'delete', BaseURL, '/plant/' + id);
    console.log('id°°°°°°°°°°°°°°°°°°°°°', id);

    yield put(deletePlantActions.deletePlantSuccess(response.data));
  } catch (e) {
    yield put(deletePlantActions.deletePlantFailure(e));
  }
}

export default function* deletePlant() {
  yield takeLatest(deletePlantTypes.DELETE_PLANT_REQUEST, deleteRequest);
}

import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import updateplantActions, {
  updateplantTypes,
} from '../../redux/plant/updatePlantRedux';

function* updateplantRequest({ data, id }) {
  try {
    let response = yield call(
      axiosRequest,
      'put',
      BaseURL,
      '/plants/' + id,
      data,
    );
    yield put(updateplantActions.updatePlantSuccess(response.data));
  } catch (e) {
    yield put(updateplantActions.updatePlantFailure(e));
  }
}

export default function* updatePlant() {
  yield takeLatest(updateplantTypes.UPDATE_PLANT_REQUEST, updateplantRequest);
}

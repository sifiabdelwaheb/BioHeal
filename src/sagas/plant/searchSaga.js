import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import SearchActions, { SearchTypes } from '../../redux/plant/searchRedux';

function* SearchRequest({ data }) {
  try {
    let response = yield call(axiosRequest, 'post', BaseURL, '/search', data);
    console.log('response data', response.data);
    yield put(SearchActions.SearchSuccess(response.data));
  } catch (e) {
    yield put(SearchActions.SearchFailure(e));
  }
}
export default function* SearchPlant() {
  yield takeLatest(SearchTypes.SEARCH_REQUEST, SearchRequest);
}
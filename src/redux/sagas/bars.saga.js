import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserBars() {
    try{
        const response = yield axios.get('/api/bar/user-bar');
        yield put({ type: 'SET_BARS', payload: response.data})
    } catch (error) {
        console.log('Bar Request Failed', error);
    }
}

function* fetchAllBars() {
    try{
        const response = yield axios.get('/api/bar/all-bars');
        yield put({ type: 'SET_BARS', payload: response.data});
    } catch (error) {
        console.log('All Bar Request Failed', error);
    }
}

function* registerBar(action) {
    try {
      yield axios.post('/api/bar/register', action.payload);
    } catch (error) {
      console.log('Error with Bar Registration', error);
    }
  }

function* fetchLocationBartenders() {
    try {
        const response = yield axios.get(`/api/bar/bartenders/`)
        yield put({ type: 'SET_BARTENDERS', payload: response.data})
    } catch (error) {
        console.log('Error getting location bartenders from server', error)
    }
}

function* barsSaga() {
    yield takeLatest('SAGA/FETCH_USER_BARS', fetchUserBars);
    yield takeLatest('SAGA/FETCH_ALL_BARS', fetchAllBars);
    yield takeLatest('SAGA/REGISTER_BAR', registerBar);
    yield takeLatest('SAGA/FETCH_BAR_BARTENDERS', fetchLocationBartenders)
}

export default barsSaga;
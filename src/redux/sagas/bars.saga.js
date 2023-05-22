import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBars() {
    try{
        const response = yield axios.get('/api/bar');
        console.log(response);
        yield put({ type: 'SET_BARS', payload: response.data})
    } catch (error) {
        console.log('Bar Request Failed', error);
    }
}

function* barsSaga() {
    yield takeLatest('SAGA/FETCH_BARS', fetchBars)
}

export default barsSaga;
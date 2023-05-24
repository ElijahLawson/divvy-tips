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

function* barsSaga() {
    yield takeLatest('SAGA/FETCH_USER_BARS', fetchUserBars)
    yield takeLatest('SAGA/FETCH_ALL_BARS', fetchAllBars);
}

export default barsSaga;
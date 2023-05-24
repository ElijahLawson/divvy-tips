import {put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHours(action) {
    try{
        const response = yield axios.get(`/api/hours/shift-hours/${action.payload}`);
        yield put({ type: 'SET_SHIFT_HOURS', payload: response.data})
    } catch (error) {
        console.log('Error with Shift Hours Get request to Server', error);
    }
}

function* hoursSaga() {
    yield takeLatest('SAGA/FETCH_SHIFT_HOURS', fetchHours);
}

export default hoursSaga;
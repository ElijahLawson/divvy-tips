import {put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHours(action) {
    console.log(action.payload)
    try{
        const response = yield axios.get(`/api/hours/shift-hours/${action.payload}`);
        console.log(response.data)
        yield put({ type: 'SET_SHIFT_HOURS', payload: response.data})
    } catch (error) {
        console.log('Error with Shift Hours Get request to Server', error);
    }
}

function* updateShiftHours(action) {
    try{
         yield axios.put(`/api/hours/shift-hours/update/${action.payload.id}`, action.payload)
    } catch (error) {
        console.log('Error with Shift Hours Put equest to server', error);
    }

}

function* hoursSaga() {
    yield takeLatest('SAGA/FETCH_SHIFT_HOURS', fetchHours);
    yield takeLatest('SAGA/UPDATE_SHIFT_HOURS', updateShiftHours);
}

export default hoursSaga;
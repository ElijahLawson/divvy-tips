import {put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchOrCreateShift() {
    try{
        const response = yield axios.get('/api/shift/')
        console.log('THE DATA: ', response.data)
        yield put({ type: 'SET_SHIFTS', payload: response.data})
    } catch {
        console.log('Error posting shifts to server', error)
    }
}

function* shiftsSaga() {
    yield takeLatest('SAGA/GET_OR_CREATE_SHIFT', fetchOrCreateShift);
}

export default shiftsSaga;
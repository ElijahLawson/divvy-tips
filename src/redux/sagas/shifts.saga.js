import {put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchOrCreateShift() {
    try{
        const response = yield axios.get('/api/shift/')
        yield put({ type: 'SET_SHIFTS', payload: response.data})
    } catch {
        console.log('Error posting shifts to server', error)
    }
}

function* updateShiftNoCalculations(action) {
    try{
        yield axios.put(`/api/shift/update-1/${action.payload.id}`, action.payload)
    } catch (error) {
        console.log('ERROR UPDATING CURRENT SHIFT', error);
    }
}

function* updateTotalHours(action) {
    try{
        yield axios.put(`/api/shift/update-2/${action.payload.shift_id}`, action.payload)
    } catch (error) {
        console.log('ERROR UPDATING TOTAL HOURS ON CURRENT SHIFT', error);
    }
}

function* updateTotalTips(action) {
    try{
        yield axios.put(`/api/shift/update-3/${action.payload.shift_id}`, action.payload)
    } catch (error) {
        console.log('ERROR UPDATING TOTAL TIPS ON CURRENT SHIFT', error)
    }
}

function* shiftsSaga() {
    yield takeLatest('SAGA/GET_OR_CREATE_SHIFT', fetchOrCreateShift);
    yield takeLatest('SAGA/UPDATE_SHIFT_BBC_CASH', updateShiftNoCalculations);
    yield takeLatest('SAGA/UPDATE_SHIFT_HOURS', updateTotalHours);
}

export default shiftsSaga; 
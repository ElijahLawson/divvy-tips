import {put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getOrCreateShift() {
    try{
        const response = yield axios.get('/api/shift/')
        yield put({ type: 'SET_SHIFTS', payload: response.data});
        yield put({ type: 'SAGA/FETCH_SHIFT_HOURS', payload: response.data.id});
        yield put({ type: 'SAGA/FETCH_SHIFT_TIPS', payload: response.data.id});
    } catch {
        console.log('Error posting shifts to server', error)
    }
}

function* fetchUserShiftHistory() {
    try{
        const response = yield axios.get('/api/shift/user-history')
        console.log(response.data)
        yield put({type: 'SET_SHIFT_HISTORY', payload: response.data})
    } catch (error) {
        console.log('ERROR FETCHING USER SHIFT HISTORY TO SERVER', error)
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

function* updateShiftHourly(action) {
    console.log(action.payload)
    try{
        yield axios.put(`/api/shift/update-3/${action.payload.shift_id}`, action.payload)
    } catch (error) {
        console.log('ERROR UPDATING HOURLY ON CURRENT SHIFT', error);
    }
}

function* shiftsSaga() {
    yield takeLatest('SAGA/GET_OR_CREATE_SHIFT', getOrCreateShift);
    yield takeLatest('SAGA/UPDATE_SHIFT_BBC_CASH', updateShiftNoCalculations);
    yield takeLatest('SAGA/UPDATE_SHIFT_HOURS', updateTotalHours);
    yield takeLatest('SAGA/UPDATE_SHIFT_HOURLY', updateShiftHourly);
    yield takeLatest('SAGA/FETCH_USER_SHIFT_HISTORY', fetchUserShiftHistory)
}

export default shiftsSaga; 
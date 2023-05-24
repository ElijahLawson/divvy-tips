import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserTips(action) {
    try{
        const response = yield axios.get(`/api/tips/user-tips/${action.payload}`);
        
        yield put({ type: 'SET_USER_TIPS', payload: response.data })
    } catch (error) {
        console.log('Error with User Tip Get request to Server', error);
    }
}

function* fetchShiftTips(action) {
    try{
        const response = yield axios.get(`/api/tips/shift-tips/${action.payload}`)

        yield put({ type : 'SET_SHIFT_TIPS', payload: response.data })
    } catch (error) {
        console.log('Error with Shift Tips Get Request to Server');
    }
}

function* addUserTips(action) {
    try{
        yield axios.post(`/api/tips/add-tip`, action.payload);
    } catch (error) {
        console.log('Error with Shift Tip Post to Server', error);
    }
}

function* tipsSaga() {
    yield takeLatest('SAGA/FETCH_USER_TIPS', fetchUserTips);
    yield takeLatest('SAGA/FETCH_SHIFT_TIPS', fetchShiftTips);
    yield takeLatest('SAGA/ADD_USER_TIPS', addUserTips);
}

export default tipsSaga;
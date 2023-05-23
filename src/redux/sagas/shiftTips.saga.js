import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTips(action) {
    try{
        const response = yield axios.get(`/api/shift-tips/${action.payload}`);
        
        yield put({ type: 'SET_SHIFT_TIPS', payload: response.data })
    } catch (error) {
        console.log('Error with Shift Tip Get request to Server', error);
    }
}

function* addTips(action) {
    console.log(action.payload)
    try{
        yield axios.post(`/api/shift-tips/add-tip`, action.payload);
    } catch (error) {
        console.log('Error with Shift Tip Post to Server', error);
    }
}

function* shiftTipsSaga() {
    yield takeLatest('SAGA/FETCH_TIPS', fetchTips);
    yield takeLatest('SAGA/ADD_TIPS', addTips);
}

export default shiftTipsSaga;
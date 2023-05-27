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

function* fetchMinimizedShiftTips(action) {
    try{
        const response = yield axios.get(`/api/tips/shift-tips/${action.payload}`)
        yield put({ type : 'SET_SHIFT_TIPS_MINIMIZED', payload: response.data })
        
    } catch (error) {
        console.log('Error with Shift Tips Get Request to Server');
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
        console.log('Error with User Shift-Tip Post to Server', error);
    }
}

function* addShiftTips(action) {
    try{
        yield axios.post(`/api/tips/shift-tips/add-shift-tips/${action.payload.shift_id}`, action.payload)
    } catch (error) {
        console.log('Error with Shift shift-tip Post to Server', error);
    }
}

function* editShiftTips(action) {
    try{
        yield axios.put(`/api/tips/shift-tip/edit-shift-tips/`, action.payload);
    } catch (error) {
        console.log('Error with Shift Tips Edit Put', error);
    }
}

function* deleteShiftTips(action) {
    console.log(action.payload);
    try{
        yield axios.delete(`/api/tips/shift_tip/delete-shift-tips`, { data: action.payload });
    } catch (error) {
        console.log('Error with Shift Tips Delete', error);
    }
}



function* tipsSaga() {
    yield takeLatest('SAGA/FETCH_USER_TIPS', fetchUserTips);
    yield takeLatest('SAGA/FETCH_SHIFT_TIPS_MIN', fetchMinimizedShiftTips);
    yield takeLatest('SAGA/FETCH_SHIFT_TIPS', fetchShiftTips);
    yield takeLatest('SAGA/ADD_USER_TIPS', addUserTips);
    yield takeLatest('SAGA/ADD_SHIFT_TIPS', addShiftTips);
    yield takeLatest('SAGA/EDIT_SHIFT_TIPS', editShiftTips);
    yield takeLatest('SAGA/DELETE_SHIFT_TIPS', deleteShiftTips);
}

export default tipsSaga;
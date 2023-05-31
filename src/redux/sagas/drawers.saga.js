import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchDrawers() {
    try{
        const response = yield axios.get('/api/drawers')
        yield put({ type: 'SET_DRAWERS', payload: response.data })
    } catch (error) {
        console.log('Error with Drawers GET request to Server', error);
    }
}

function* addDrawers(action) {
    try{
        console.log(action.payload)
        yield axios.post('/api/drawers/add-drawers', action.payload);
    } catch (error) {
        console.log('Error with Drawer Post to Server', error);
    }
}

function* fetchShiftDrawers(action) {
    try{
        console.log(action.payload)
        const response = yield axios.get(`/api/drawers/shift-drawers/${action.payload}`)
        yield put({ type: 'SET_SHIFT_DRAWERS', payload: response.data })
        
    } catch (error) {
        console.log('Error with Shift Drawers GET request to Server', error);
    }
}

function* drawersSaga() {
    yield takeLatest('SAGA/FETCH_DRAWERS', fetchDrawers);
    yield takeLatest('SAGA/FETCH_SHIFT_DRAWERS', fetchShiftDrawers);
    yield takeLatest('SAGA/ADD_DRAWERS', addDrawers);
}

export default drawersSaga;
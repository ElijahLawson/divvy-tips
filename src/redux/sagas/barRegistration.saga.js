import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* registerBar(action) {
  try {
    yield axios.post('/api/bar/register', action.payload);
  } catch (error) {
    console.log('Error with Bar Registration', error);
  }
}

function* barRegistrationSaga() {
  yield takeLatest('SAGA/REGISTER_BAR', registerBar);
}

export default barRegistrationSaga;

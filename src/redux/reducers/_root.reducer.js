import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import bars from './bar.reducer';
import shifts from './shifts.reducer';
import shiftTips from './shiftTips.reducer';
import userTips from './userTips.reducer';
import drawers from './drawers.reducer';
import hours from './hours.reducer';
import shiftHistory from './shiftHistory.reducer';
import bartenders from './bartenders.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user,
  bars,
  bartenders,
  shifts,
  shiftTips,
  userTips,
  hours,
  drawers,
  shiftHistory
});

export default rootReducer;

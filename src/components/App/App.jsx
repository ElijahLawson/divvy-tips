import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import BarRegister from '../BarRegister/BarRegister';
import UserRegister from '../UserRegister/UserRegister';
import UserPage from '../UserPage/UserPage';
import LoginPage from '../LoginPage/LoginPage';
import AddTips from '../AddTips/AddTips';
import TipConfirmation from '../TipConfirmation/TipConfirmation';
import ShiftSetup from '../ShiftSetup/ShiftSetup';
import HoursConfirmation from '../HoursConfirmation/HoursConfirmation';
import TipsConfirmation from '../TipsConfirmation/TipsConfirmation';
import TipOutPage from '../TipOutPage/TipOutPage';
import ShiftHistory from '../ShiftHistory/ShiftHistory';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'SAGA/FETCH_ALL_BARS'});
  }, []);

  return (
      <div>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />

            <ProtectedRoute exact path="/user">
              <UserPage />
            </ProtectedRoute>

            <Route exact path="/register-bar">
              {user.id && !user.is_admin ? <Redirect to="/user" /> : <BarRegister />}
            </Route>

            <Route exact path="/register-user">
              {user.id ? <Redirect to="/user" /> : <UserRegister />}
            </Route>

            <Route exact path="/login">
              {user.id ? <Redirect to="/user" /> : <LoginPage />}
            </Route>

            <Route exact path="/home">
            {user.id ? <Redirect to="/user" /> : <LandingPage />}
            </Route>

            <ProtectedRoute exact path="/add-tips">
              <AddTips />
            </ProtectedRoute>

            <ProtectedRoute exact path='/confirm-tips'>
              <TipConfirmation />
            </ProtectedRoute>

            <ProtectedRoute exact path='/shift-setup'>
              <ShiftSetup />
            </ProtectedRoute>

            <ProtectedRoute exact path='/hours-edit/'>
              <HoursConfirmation />
            </ProtectedRoute>

            <ProtectedRoute exact path='/tips-edit'>
              <TipsConfirmation />
            </ProtectedRoute>

            <ProtectedRoute exact path='/tip-out'>
              <TipOutPage />
            </ProtectedRoute>

            <ProtectedRoute exact path='/shift-history'>
              <ShiftHistory />
            </ProtectedRoute>

          </Switch>
        </Router>
      </div>
      )
}

export default App;

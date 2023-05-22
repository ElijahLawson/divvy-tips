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

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
      <div>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />

            <ProtectedRoute exact path="/user">
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/register-bar">
              <BarRegister />
            </ProtectedRoute>

            <Route exact path="/register-user">
              {user.id && user.is_admin ? <Redirect to="/user" /> : <UserRegister />}
            </Route>

            <Route exact path="/home">
            {user.id ? <Redirect to="/user" /> : <LandingPage />}
            </Route>


          </Switch>
        </Router>
      </div>
      )
}

export default App;

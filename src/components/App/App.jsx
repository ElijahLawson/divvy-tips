import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import "./App.css";
import Layout from "../../Pages/Layout/Layout";
import LandingPage from "../../Pages/LandingPage/LandingPage";
import BarRegister from "../../Pages/BarRegister/BarRegister";
import UserRegister from "../../Pages/UserRegister/UserRegister";
import UserPage from "../../Pages/UserPage/UserPage";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import AddTips from "../../Pages/AddTips/AddTips";
import AddTipsConfirmation from "../../Pages/AddTipsConfirmation/AddTipsConfirmation";
import ShiftSetup from "../../Pages/ShiftSetup/ShiftSetup";
import HoursConfirmation from "../../Pages/HoursConfirmation/HoursConfirmation";
import TipsConfirmation from "../../Pages/TipsConfirmation/TipsConfirmation";
import TipOutPage from "../../Pages/TipOutPage/TipOutPage";
import ShiftHistory from "../../Pages/ShiftHistory/ShiftHistory";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  console.log(user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
    dispatch({ type: "SAGA/FETCH_ALL_BARS" });
  }, [dispatch]);

  return (
    <main>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={user.id ? <Navigate to="/user" /> : <LandingPage />}
          />
          <Route
            path="/register-user"
            element={user.id ? <Navigate to="/user" /> : <UserRegister />}
          />
          <Route
            path="/login"
            element={user.id ? <Navigate to="/user" /> : <LoginPage />}
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute user={user}>
                <UserPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register-bar"
            element={
              <ProtectedRoute user={user}>
                <BarRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-tips"
            element={
              <ProtectedRoute user={user}>
                <AddTips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirm-tips"
            element={
              <ProtectedRoute user={user}>
                <AddTipsConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shift-setup"
            element={
              <ProtectedRoute user={user}>
                <ShiftSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hours-edit"
            element={
              <ProtectedRoute user={user}>
                <HoursConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tips-edit"
            element={
              <ProtectedRoute user={user}>
                <TipsConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tip-out"
            element={
              <ProtectedRoute user={user}>
                <TipOutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shift-history"
            element={
              <ProtectedRoute user={user}>
                <ShiftHistory />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </main>
  );
}

export default App;

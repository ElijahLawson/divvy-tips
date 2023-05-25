import React, { useEffect } from "react";
import { Routes, Route, redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import "./App.css";
import Layout from "../Layout/Layout";
import LandingPage from "../LandingPage/LandingPage";
import BarRegister from "../BarRegister/BarRegister";
import UserRegister from "../UserRegister/UserRegister";
import UserPage from "../UserPage/UserPage";
import LoginPage from "../LoginPage/LoginPage";
import AddTips from "../AddTips/AddTips";
import AddTipsConfirmation from "../AddTipsConfirmation/AddTipsConfirmation";
import ShiftSetup from "../ShiftSetup/ShiftSetup";
import HoursConfirmation from "../HoursConfirmation/HoursConfirmation";
import TipsConfirmation from "../TipsConfirmation/TipsConfirmation";
import TipOutPage from "../TipOutPage/TipOutPage";
import ShiftHistory from "../ShiftHistory/ShiftHistory";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
    dispatch({ type: "SAGA/FETCH_ALL_BARS" });
  }, []);

  return (
    <main>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute user={user}>
                {" "}
                <UserPage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-bar"
            element={
              <ProtectedRoute user={user}>
                {" "}
                <BarRegister />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-user"
            element={
              <ProtectedRoute user={user}>
                {" "}
                <UserRegister />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-tips"
            element={
              <ProtectedRoute user={user}>
                {" "}
                <AddTips />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirm-tips"
            element={
              <ProtectedRoute user={user}>
                {" "}
                <AddTipsConfirmation />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/shift-setup"
            element={
              <ProtectedRoute user={user}>
                {" "}
                <ShiftSetup />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/hours-edit"
            element={
              <ProtectedRoute user={user}>
                {" "}
                <HoursConfirmation />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/tips-edit"
            element={
              <ProtectedRoute user={user}>
                {" "}
                <TipsConfirmation />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/tip-out"
            element={
              <ProtectedRoute user={user}>
                {" "}
                <TipOutPage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/shift-history"
            element={
              <ProtectedRoute user={user}>
                {" "}
                <UserPage />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="login"
            element={user.id ? <LoginPage /> : redirect("/user")}
          />
        </Route>
      </Routes>
    </main>
  );
}

export default App;

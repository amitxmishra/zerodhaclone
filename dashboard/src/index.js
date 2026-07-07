import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

// Catch the token passed from the frontend app after signup/login
// (needed because frontend and dashboard are separate origins once deployed,
// so localStorage isn't shared between them automatically)
const urlParams = new URLSearchParams(window.location.search);
const incomingToken = urlParams.get("token");
const incomingUser = urlParams.get("user");

if (incomingToken) {
  localStorage.setItem("token", incomingToken);
  if (incomingUser) {
    localStorage.setItem("user", incomingUser);
  }
  // clean the token out of the visible URL/history
  window.history.replaceState({}, document.title, window.location.pathname);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
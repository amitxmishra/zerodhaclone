import React from "react";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = `${FRONTEND_URL}/login`;
    return null;
  }

  return children;
};

export default ProtectedRoute;
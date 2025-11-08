import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // If not logged in, redirect to login
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Automatically redirect "/" to respective dashboard
  if (location.pathname === "/") {
    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "doctor") return <Navigate to="/doctor" replace />;
    if (role === "patient") return <Navigate to="/patient" replace />;
  }

  return children;
};

export default ProtectedRoute;

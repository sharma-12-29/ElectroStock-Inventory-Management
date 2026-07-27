import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, role }) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoutes;
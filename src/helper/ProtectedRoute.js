import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("admToken"); // Retrieve token from localStorage

  console.log("ProtectedRoute executed. Token:", token);
  
  // Redirect to login if the token is missing
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;

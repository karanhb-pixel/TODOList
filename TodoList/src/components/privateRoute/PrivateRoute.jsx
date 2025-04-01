import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PrivateRoute = ({ children }) => {
  const { authToken } = useAuth();

  // If the user is not logged in, redirect to the login page
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the children components
  return children;
};
export default PrivateRoute;

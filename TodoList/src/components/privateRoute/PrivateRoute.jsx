import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the children components
  return children;
};
export default PrivateRoute;

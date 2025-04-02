import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

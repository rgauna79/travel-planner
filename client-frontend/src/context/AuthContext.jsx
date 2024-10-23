import React, { createContext, useContext, useState, useEffect } from "react";
import {
  loginUserRequest,
  verifyTokenRequest,
  logoutUserRequest,
  registerUserRequest,
} from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await verifyTokenRequest();
        if (response.data.authenticated) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const registerUser = async (user) => {
    try {
      const response = await registerUserRequest(user);
      console.log(response);
      setUser(response.data);
    } catch (error) {
      setError(error);
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError(error.response.data);
      }
    }
  };

  const loginUser = async (user) => {
    try {
      const response = await loginUserRequest(user);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError(error.response.data);
      }
    }
  };

  const logoutUser = async () => {
    await logoutUserRequest();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logoutUser,
        registerUser,
        isAuthenticated,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

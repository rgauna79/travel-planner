import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";

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
        const response = await axiosInstance.get("api/users/check");
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

  const login = async (user) => {
    try {
      const response = await axiosInstance.post("api/users/login", user);
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

  const logout = async () => {
    await axiosInstance.get("api/users/logout");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

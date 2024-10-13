import { loginRequest, logoutRequest, verifyTokenRequest } from "@/api/auth";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

import { toast } from "sonner";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUserSession(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        toast.error(error.response.data.message, {
          position: "top-right",
          duration: 2000,
        });
      } else {
        toast.error("Problemas con el servidor", {
          position: "top-right",
          duration: 2000,
        });
      }
      // if (Array.isArray(error.response.data)) {
      //   return setErrors(error.response.data);
      // }
      // setErrors([error.response.data.message]);
    }
  };

  const logout = async () => {
    try {
      const res = await logoutRequest();
      setIsAuthenticated(false);
      setUserSession(null);
    } catch (error) {}
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies) {
        setIsAuthenticated(false);
        setLoading(false);
        setUserSession(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);

        setIsAuthenticated(true);
        setUserSession(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        logout,
        userSession,
        isAuthenticated,
        loading,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

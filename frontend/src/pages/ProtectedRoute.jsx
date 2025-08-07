import React from "react";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { token, verifyToken } = useAuth();
  const [authStatus, setAuthStatus] = useState("checking"); // 'checking', 'authenticated', 'unauthenticated'

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const isValid = await verifyToken();
          setAuthStatus(isValid ? "authenticated" : "unauthenticated");
        } catch (error) {
          setAuthStatus("unauthenticated");
        }
      } else {
        setAuthStatus("unauthenticated");
      }
    };

    checkAuth();
  }, [token, verifyToken]);

  if (authStatus === "checking") {
    console.log("Auth status:", authStatus, "Token:", token);
    return <div>Loading...</div>;
  }

  return authStatus === "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default ProtectedRoute;

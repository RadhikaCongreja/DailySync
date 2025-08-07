import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Configure axios instance
  const api = axios.create({
    baseURL: "http://localhost:8001", // Your FastAPI backend URL
  });

  // Add request interceptor to include token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add to your axios instance creation
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
        navigate("/sign-in");
      }
      return Promise.reject(error);
    }
  );

  const login = async (email, password) => {
    try {
      const params = new URLSearchParams();
      params.append("username", email);
      params.append("password", password);

      const response = await api.post("/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        setToken(response.data.access_token); // This triggers ProtectedRoute
        return { success: true };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.detail || "Login failed",
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.post("/sign-up", {
        email: userData.email,
        password: userData.password,
        full_name: userData.full_name || "",
      });
      if (response.status === 200) {
        // Return success and let the component handle login
        return {
          success: true,
          message: "Account created successfully!",
          email: userData.email,
          password: userData.password,
        };
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("This email is already in use. Please use a different email.");
      // Handle specific error cases
      if (error.response?.status === 409) {
        return {
          success: false,
          error: "Email already registered",
          message:
            "This email is already in use. Please use a different email.",
        };
      }
      return {
        success: false,
        error: error.response?.data?.detail || "Registration failed",
        message:
          error.response?.data?.detail ||
          "Registration failed. Please try again.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/sign-in");
  };

  const verifyToken = async () => {
    if (!token) return false;

    try {
      const response = await api.get("/verify-token");
      console.log("Token verification response:", response.data); // Debug log
      return true;
    } catch (error) {
      console.error("Token verification failed:", error.response?.data); // Detailed error
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        signup,
        logout,
        verifyToken,
        api, // Expose axios instance with auth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

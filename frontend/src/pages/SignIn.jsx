import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //   if (result.success) {
  //     navigate("/todos");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate("/todos");
      // Let ProtectedRoute handle the navigation
      // Don't navigate here to avoid race conditions
    } else {
      alert(result.error || "Login failed");
    }
  };

  return (
    <AuthForm title="Welcome Back" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <div className="auth-footer">
          <a href="/forgot-password" className="auth-link">
            Forgot password?
          </a>
        </div>
      </div>

      <button type="submit" className="auth-button" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <div className="auth-footer">
        Don't have an account?{" "}
        <a href="/sign-up" className="auth-link">
          Sign Up
        </a>
      </div>
      <div className="auth-footer">
        Back to home {"  "}
        <a href="/" className="auth-link">
          &#127968;
        </a>
      </div>
    </AuthForm>
  );
};

export default SignIn;

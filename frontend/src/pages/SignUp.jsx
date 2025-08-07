import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signup(formData);
    setLoading(false);

    if (result.success) {
      navigate("/todos");
    }
  };

  return (
    <AuthForm title="Create Account" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </div>

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
          placeholder="Create a password"
          required
          minLength="6"
        />
        <div className="password-hint">Must be at least 6 characters</div>
      </div>

      <button type="submit" className="auth-button" disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <div className="auth-footer">
        Already have an account?{" "}
        <a href="/sign-in" className="auth-link">
          Sign In
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

export default SignUp;

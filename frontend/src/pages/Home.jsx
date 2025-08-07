import { Link } from "react-router-dom";
import "../styles/main.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-hero">
          <h1>Your Productivity Companion</h1>
          <p className="home-subtitle">
            Organize, prioritize, and conquer your tasks with our intuitive todo
            app
          </p>
        </div>

        <div className="home-cta">
          <Link to="/sign-up" className="cta-button primary">
            Get Started
          </Link>
          <Link to="/sign-in" className="cta-button secondary">
            I Already Have an Account
          </Link>
        </div>

        <div className="home-features">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Easy Task Management</h3>
            <p>Create and organize your tasks effortlessly</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Access</h3>
            <p>Your data is always protected</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Cross-Platform</h3>
            <p>Access from any device, anywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
}

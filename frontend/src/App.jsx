import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import TodoApp from "./pages/TodoApp";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import "./styles/auth.css";
import "./styles/main.css";

function App() {
  console.log("App component rendering");
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />

          {/*Protected Route*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/todos" element={<TodoApp />} />
          </Route>
          {/* Fallback route */}
          <Route
            path="*"
            element={
              <>
                <h1>404 Not Found</h1>
                <p> Email at ronline890@gmail.com</p>
              </>
            }
          />
          {/* <Route path="*" element={<Navigate to="/sign-in" replace />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

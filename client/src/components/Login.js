import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api";
import "./Auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { username, password });
      localStorage.setItem("userId", res.data._id);
      navigate("/tasks");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="app-title">📝 TASK MATE</h1>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="switch-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;

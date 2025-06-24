import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api";
import "./Auth.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { username, password });
      alert("Registered! Please login.");
      navigate("/");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Choose a Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Choose a Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <div className="switch-link">
        Already have an account? <Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default Register;

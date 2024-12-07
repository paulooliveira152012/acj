import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import Header from "../components/Header";
import axios from "axios";

const AdmLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Send login credentials to the backend
      const response = await axios.post("http://localhost:5001/api/admin/login", {
        username,
        password,
      });

      // Handle success (e.g., store the token)
      const { token } = response.data;
      console.log("Login successful, token:", token);
      setSuccess(true);
      navigate('/calendar')

      // Optionally, save the token to localStorage
      localStorage.setItem("admToken", token);

         // Redirect to the calendar page
      navigate('/calendar');
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <>
      <Header />
      <div className="contentContainer">
        <div className="session">
          <h2>Page designated to staff members</h2>
          <form className="loginForm" onSubmit={handleLogin}>
            <input
              id="username"
              placeholder="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />

            <input
              id="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button className="loginSubmitBtn" type="submit">
              Login
            </button>
            <a className="forgotPassword">Forgot Password?</a>
          </form>
          {error && <p className="errorMessage">{error}</p>}
          {success && <p className="successMessage">Login successful!</p>}
        </div>
      </div>
    </>
  );
};

export default AdmLogin;

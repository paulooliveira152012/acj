import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import axios from "axios";
import Logo from "../assets/images/logo_white.svg"

const AdmLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showSupportMessage, setShowSupportMessage] = useState(false); // State for the support message
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    // Set the API URL based on the environment
    const apiUrl = 
      process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_API_URL}/api/admin/login`
    : "http://localhost:5001/api/admin/login"; // Use local API in development

    try {
      const response = await axios.post(
        apiUrl,
        {
          username,
          password,
        }
      );
      
      const { token } = response.data;
      console.log("Login successful, token:", token);

      localStorage.setItem("admToken", token);

      // Verify the token with the backend before navigating
    const verifyUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_API_URL}/api/admin/verify-token`
      : "http://localhost:5001/api/admin/verify-token";

      const verifyResponse = await axios.get(verifyUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (verifyResponse.status === 200) {
        console.log("Token verified successfully. Redirecting to calendar...");
        setSuccess(true);
        navigate("/calendar"); // Navigate to the calendar page
      } else {
        navigate("/")
        throw new Error("Token verification failed.");
      }

    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
    }
  };

  const handleForgotPassword = () => {
    setShowSupportMessage(true); // Show the support message when clicked
  };

  return (
    <>
      <div className="admLoginPage">
        <div className="session">
          <div className="shaddow">
            <div>
              <p>Page designated to staff members</p>
              <form className="loginForm" onSubmit={handleLogin}>
                <img src={Logo}></img>
                <input
                  id="username"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
                <input
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                {error && (
                  <p
                    className="errorMessage"
                    style={{ color: "red", marginTop: 0 }}
                  >
                    {error}
                  </p>
                )}
                <button className="loginSubmitBtn" type="submit">
                  Login
                </button>
                <p
                  type="button"
                  className="forgotPassword"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </p>
              </form>
                {showSupportMessage && (
                  <p className="supportMessage">
                    Contact support at <strong>908-630-8458</strong>.
                  </p>
                )}
            </div>
          </div>
          <div className="imageBehind"></div>
          {success && <p className="successMessage">Login successful!</p>}
        </div>
      </div>
    </>
  );
};

export default AdmLogin;

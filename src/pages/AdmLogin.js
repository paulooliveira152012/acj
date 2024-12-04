import React, { useState } from "react";
import "../styles/style.css";
import Header from "../components/Header";

const AdmLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassord] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("login call");
    console.log("Username:", username);
    console.log("Password", password);
  };

  return (
    <div className="mainContainer">
      <Header style={{position:"relative"}} />
      <div className="admLoginPage">
        <h2>Page designated to staff members</h2>
        <form className="loginForm" onSubmit={handleLogin}>
          <input
            id="username"
            placeholder="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            id="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(event) => setPassord(event.target.value)}
          />

          <button className="loginSubmitBtn" type="submit">
            Login
          </button>
          <a className="forgotPassword">Forgot Password?</a>
        </form>
      </div>
    </div>
  );
};

export default AdmLogin;

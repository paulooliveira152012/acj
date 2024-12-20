import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/style.css";

const NavBar = ({ className, handleTabClick }) => {
  const location = useLocation();
  const [currentScreen, setCurrentScreen] = useState("");

  console.log(location.pathname);

  // Update currentScreen based on location.pathname
  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentScreen("home");
    } else if (location.pathname === "/about") {
      setCurrentScreen("about");
    } else if (location.pathname === "/our-services") {
      setCurrentScreen("our-services");
    } else if (location.pathname === "/blogs") {
      setCurrentScreen("blogs");
    } else if (location.pathname === "/contact-us") {
      setCurrentScreen("contact");
    }
  }, [location]);

  console.log("Current path:", location.pathname);
  console.log("Current screen is:", currentScreen);

  return (
    <nav className={className}>
      <nav className={className}>
        <Link
          to="/"
          onClick={handleTabClick}
          className={currentScreen === "home" ? "currentScreen" : ""}
        >
          Home
        </Link>
        <Link 
            to="/about" 
            onClick={handleTabClick}
            className={currentScreen === "about" ? "currentScreenBlack" : ""}
        >
          About Us
        </Link>
        <Link 
            to="/our-services" 
            onClick={handleTabClick}
            className={currentScreen === "our-services" ? "currentScreenBlack" : ""}
        >
          Our Services
        </Link>
        <Link 
            to="/contact-us" 
            onClick={handleTabClick}
            className={currentScreen === "contact" ? "currentScreenBlack" : ""}
            >
          Contact
        </Link>
        <Link 
            to="/blogs" 
            onClick={handleTabClick}
            className={currentScreen === "blogs" ? "currentScreenBlack" : ""}
        >
          Blogs
        </Link>
      
        {/* <Link to="/accessibility-statement" onClick={handleTabClick}>Accessibility Statement</Link>  */}
        {/* <Link to="/privacy-policy" onClick={handleTabClick}>Privacy Policy</Link> */}
      </nav>
    </nav>
  );
};

export default NavBar;

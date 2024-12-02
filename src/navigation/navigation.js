import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./nav.js";
import Home from "../pages/HomePage";
import About from "../pages/About.js";
import OurServices from "../pages/OurServices.js";
import TipsAndAdvice from "../pages/TipsAndAdvice";
import ContactUs from "../pages/ContactUs.js";
import AccessibilityStatement from "../pages/AccessibilityStatement.js";
import PrivacyPolicy from "../pages/PrivacyPolicy.js";
import Header from "../components/Header.js";

const Navigator = () => {
    return (
        <Router>
        
        {/* <Header /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/our-services" element={<OurServices />} />
                <Route path="/tips-and-advice" element={<TipsAndAdvice />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
        </Router>
    );
};

export default Navigator;

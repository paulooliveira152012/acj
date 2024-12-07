import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/HomePage";
import About from "../pages/About.js";
import OurServices from "../pages/OurServices.js";
import TipsAndAdvice from "../pages/TipsAndAdvice";
import ContactUs from "../pages/ContactUs.js";
import AccessibilityStatement from "../pages/AccessibilityStatement.js";
import PrivacyPolicy from "../pages/PrivacyPolicy.js";
import AdmLogin from "../pages/AdmLogin.js";
import Calendar from "../pages/Calendar.js";
import Footer from "../components/Footer.js";
import '../styles/style.css'

const Navigator = () => {
    return (
        <div className="appContainer">
        <Router>
            <div className="content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/our-services" element={<OurServices />} />
                <Route path="/tips-and-advice" element={<TipsAndAdvice />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/admLogin" element={<AdmLogin />} />
                <Route path="/calendar" element={<Calendar />} />
            </Routes>
            </div>
            <Footer />
        </Router>
        </div>
    );
};

export default Navigator;

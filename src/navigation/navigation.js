import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import "../styles/style.css";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const ContentWithFooter = () => {
    const location = useLocation();
    const excludedFooterPaths = ["/calendar", "/admLogin"];
    const showFooter = !excludedFooterPaths.includes(location.pathname);

    return (
        <>
            <ScrollToTop />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/our-services" element={<OurServices />} />
                    <Route path="/blogs" element={<TipsAndAdvice />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/admLogin" element={<AdmLogin />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="*" element={<Home />} /> {/* Fallback Route */}
                </Routes>
            </div>
            {showFooter && <Footer />}
        </>
    );
};

const Navigator = () => {
    return (
        <Router>
            <ContentWithFooter />
        </Router>
    );
};

export default Navigator;

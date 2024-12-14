import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../navigation/nav";
import BurgerMenu from "./BurgerMenu";
import "../styles/style.css";
import whiteLogo from '../assets/images/logo_white.svg';
import blackLogo from '../assets/images/logo_black.svg';

const Header = ({ className }) => {
    const [isOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Determine which logo to use based on the current pathname
    const getLogo = () => {
        return location.pathname === "/" ? whiteLogo : blackLogo;
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    // Close the menu on screen resize above 850px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 850 && isOpen) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen]);

    return (
        <>
            <div className={`header ${className || ""}`}>
                <div className="branding">
                    <img src={getLogo()} alt="Logo" />
                </div>
                <div className="rightSection">
                    <div className="languageToggle"></div>
                    <div className="menu">
                        <NavBar className="navBarDefault" />
                    </div>
                </div>
                <div className="menuIcon" onClick={toggleMenu}>
                    <BurgerMenu toggle={isOpen} />
                </div>
            </div>
            {/* side menu */}
            <div className={`openMenu ${isOpen ? "active" : ""}`}>
                <NavBar className="navBarInMenu" handleTabClick={closeMenu} />
            </div>
        </>
    );
};

export default Header;

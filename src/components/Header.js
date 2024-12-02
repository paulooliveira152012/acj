import React, { useState, useEffect } from "react";
import NavBar from "../navigation/nav";
import "../styles/style.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false)
    }

       // Close the menu on screen resize above 850px
       useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 850 && menuOpen) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [menuOpen]);

    return (
        <>
            <div className="header">
                <div className="branding">
                    <div className="logo"></div>
                    <div className="title">ACJ</div>
                </div>
                <div className="rightSection">
                    <div className="languageToggle"></div>
                    <div className="menu">
                        <NavBar className="navBarDefault" />
                    </div>
                </div>
                <div className="menuIcon" onClick={toggleMenu}></div>
            </div>
            <div className={`openMenu ${menuOpen ? "active" : ""}`}>
                <div  className="menuIcon openedCloseButton" onClick={toggleMenu}></div>
                <NavBar className="navBarInMenu" handleTabClick={closeMenu}/>
            </div>
        </>
    );
};

export default Header;

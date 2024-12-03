import React from "react"
import { Link } from "react-router-dom"

const NavBar = ({ className, handleTabClick }) => {
    return (
        <nav className={className}>
        <nav className={className}>
            <Link to="/" onClick={handleTabClick}>Home</Link> 
            <Link to="/about" onClick={handleTabClick}>About Us</Link> 
            <Link to="/our-services" onClick={handleTabClick}>Our Services</Link>
            <Link to="/tips-and-advice" onClick={handleTabClick}>Tips & Advice</Link> 
            <Link to="/contact-us" onClick={handleTabClick}>Contact</Link> 
            {/* <Link to="/accessibility-statement" onClick={handleTabClick}>Accessibility Statement</Link>  */}
            {/* <Link to="/privacy-policy" onClick={handleTabClick}>Privacy Policy</Link> */}
        </nav>
    </nav>
    )
}

export default NavBar
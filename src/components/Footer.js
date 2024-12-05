import "../styles/style.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      {/* flex side by side */}
      {/* section1 */}
      <div className="section flex">
        <div className="logoContainer">Logo</div>
        <div className="addressContainer">
          <span>Address:</span> 570 Maple Ave, Elizabeth, NJ 07202 <br />
          <span>Telephone:</span> +1 908-527-9734
        </div>
      </div>

      {/* section 2 */}
      <div className="section links">
        <Link to="/about-us">About Us</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* section 3 */}
      <div className="section links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/accessibility-statement">Accessibility Statement</Link>
        <Link to="/admLogin">login (Adm)</Link>
      </div>

      {/* section 4 */}
      <div className="section links">
        <p>
          &copy; {currentYear} ACJ Auto Repair. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

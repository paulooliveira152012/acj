import "../styles/style.css";
import { Link } from "react-router-dom";
import PhoneIcon from "../assets/icons/footer/phone";
import EnvelopIcon from "../assets/icons/footer/envelop";
import LocationIcon from "../assets/icons/footer/location";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      {/* flex side by side */}
      {/* section1 */}
      <div className="logoContainer">Logo</div>

      <div className="footerContent">
        <div>
          <h3>Reach us</h3>
          <ul>
            <li>
              <PhoneIcon className="icon" /> +1 908-527-9734
            </li>
            <li><EnvelopIcon className="icon"/>demo@gmail.com</li>
            <li>
              {" "}
              <LocationIcon className="icon"/> 570 Maple Ave, Elizabeth, NJ 07202{" "}
            </li>
          </ul>
        </div>

        {/* section 2 */}
        <div>
          <h3>Company</h3>
          <ul>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
          </ul>
        </div>

        {/* section 3 */}
        <div>
          <h3>Legal</h3>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/termsandservices">Terms & Services</Link>
            </li>
            <li>
              <Link to="/accessibility-statement">Accessibility Statement</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Adm</h3>
          <ul>
            <li>
              <Link to="/admLogin">login (Adm)</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
      </div>
        <div className="divLine"></div>
        <p>&copy; {currentYear} ACJ Auto Repair. All rights reserved.</p>
    </div>
  );
};

export default Footer;

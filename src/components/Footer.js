import "../styles/style.css";
import { Link } from "react-router-dom";
import PhoneIcon from "../assets/icons/footer/phone";
import EnvelopIcon from "../assets/icons/footer/envelop";
import LocationIcon from "../assets/icons/footer/location";
import whiteLogo from "../assets/images/logo_white.svg";
import FacebookIcon from "../assets/images/icons/facebook";
import InstagramIcon from "../assets/images/icons/instagram";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      {/* flex side by side */}
      {/* section1 */}
      <div className="logoContainer">
        <img src={whiteLogo} alt="White Logo" />
      </div>

      <div className="socialMediaIconContainer">
        <a
          href="https://www.instagram.com/autorepairacj?igsh=NTBkNzlrYWxvcmto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon className="socialIconFooter instagramFooterIcon" />
        </a>
        <a
          href="https://www.facebook.com/p/ACJ-Auto-Repair-61570440825296/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon className="socialIconFooter" />
        </a>
      </div>

      {/* display flex para 4 divs */}
      <div className="footerContent">
        {/* div 1 */}
        <div>
          <h3>Reach us</h3>
          <ul>
            <li>
              <a href="tel: +1 908-527-9734 ">
                <PhoneIcon className="icon" /> +1 908-527-9734
              </a>
            </li>
            <li>
              <a href="mailto: acjautorepair@gmail.com">
                <EnvelopIcon className="icon" />
                acjautorepair@gmail.com
              </a>
            </li>
            <li>
              {" "}
              <LocationIcon className="icon" /> 570 Maple Ave, Elizabeth, NJ
              07202{" "}
            </li>
          </ul>
        </div>

        {/* div 2 */}
        <div>
          <h3>Company</h3>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/contact-us">Contact</Link>
            </li>
            <li>
              <Link to="/tips-and-advice">Blogs</Link>
            </li>
          </ul>
        </div>

        {/* div 3 */}
        <div>
          <h3>Legal</h3>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/accessibility-statement">Accessibility Statement</Link>
            </li>
          </ul>
        </div>

        {/* div 4 */}
        <div>
          <h3>Adm</h3>

          <li style={{ listStyle: "none", marginTop: "12px" }}>
            <Link to="/admLogin">login (Adm)</Link>
          </li>
        </div>
      </div>
      <div></div>
      <div className="divLine"></div>
      <p>&copy; {currentYear} ACJ Auto Repair. All rights reserved.</p>
    </div>
  );
};

export default Footer;

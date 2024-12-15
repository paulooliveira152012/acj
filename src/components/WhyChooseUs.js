import "../styles/style.css";
import ChaveIcon from "../assets/icons/chave";
import CommitmentIcon from "../assets/icons/Commitment";
import GearIcon from "../assets/icons/GearIcon";
import MesageIcon from "../assets/icons/MessageIcon";
import { useNavigate } from "react-router-dom";

const WhyChooseUs = () => {
  const navigate = useNavigate()

  return (
    <div className="WhyChooseUsContainer session">
      <div>
        <h2>Why Choose Us?</h2>
        <div className="h2Underline"></div>
        <div className="whyListComponent">
          <div className="why">
            {/* 1 */}
            <div>
              <ChaveIcon />
              <p>
              Experience and Quality{" "}
              </p>
            </div>
            {/* 2 */}
            <div>
                <CommitmentIcon />
                <p>
                Commitment to Satisfaction
                </p>
            </div>
            {/* 4 */}
            <div>
            <MesageIcon />
            <p>Personalized Service</p>
            </div>   
            {/* 3 */}
            <div>
                <GearIcon />
                <p>
                Expert Team
                </p>
            </div>
          </div>
            <button onClick={() => navigate('contact-us')}>Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

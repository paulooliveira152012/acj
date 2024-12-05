import "../styles/style.css";
import ChaveIcon from "../assets/icons/chave";
import CommitmentIcon from "../assets/icons/Commitment";
import GearIcon from "../assets/icons/GearIcon";
import MesageIcon from "../assets/icons/MessageIcon";

const WhyChooseUs = () => {
  return (
    <div className="WhyChooseUsContainer">
      <div>
        <h2>Why Choose Us?</h2>
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
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

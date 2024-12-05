import Header from "../components/Header";
import BusinessInfo from "../components/BusinessInfo";
import WhyChooseUs from "../components/WhyChooseUs";
import Testemonials from "../components/Testemonials";
import CarTypesServices from "../components/CarTypeServices";
import '../styles/style.css'

const Home = () => {
  return (
    
    <div style={{ textAlign: "center" }}>
      {/* hero */}
        <Header className={"absoluteHeader"}/>
      <div className="hero">
        <div className="darkHeroOverlay"></div>
        <div className="heroContent">
          <h1>TRUST FOR YOUR CAR!</h1>
          <p>Your car is in the hands of experts who truly care, ensuring top performance and your safety on every drive.</p>
          <button onClick={() => alert("Hello!")}>Get started</button>
        </div>
      </div>
      {/* BusinessInfo component */}
      <BusinessInfo />
      <WhyChooseUs />
      <CarTypesServices />
      <Testemonials />
      <div className="phrase">
        <h2>Driven to Keep You Moving!</h2>
      </div>

    </div>
    
  );
};

export default Home;

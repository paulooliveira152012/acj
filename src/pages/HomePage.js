import Header from "../components/Header";
import Hero from "../components/Hero";
import BusinessInfo from "../components/BusinessInfo";
import WhyChooseUs from "../components/WhyChooseUs";
import Testemonials from "../components/Testemonials";
import CarTypesServices from "../components/CarTypeServices";
import "../styles/style.css";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      {/* hero */}
      <Header className={"absoluteHeader"} />
      <Hero />
      {/* BusinessInfo component */}
      <p>At <strong>ACJ Auto Repair Shop</strong> we are equiped and prepared to service your vehicle's needs in the most comprehensive ways. Located at <strong>570 Maple Ave, Elizabeth, NJ 
      </strong> we welcome you to 
      </p> 
      <BusinessInfo />
      <WhyChooseUs />
      <CarTypesServices />
      <Testemonials />
      <div className="phrase session">
        <h2>Driven to Keep You Moving!</h2>
      </div>
    </div>
  );
};

export default Home;

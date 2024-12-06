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

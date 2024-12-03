import Header from "../components/Header";
import BusinessInfo from "../components/BusinessInfo";
import WhyChooseUs from "../components/WhyChooseUs";
import Testemonials from "../components/Testemonials";

const Home = () => {
  return (
    
    <div style={{ textAlign: "center" }}>
      {/* hero */}
      <div className="hero">
        <Header />
        <div className="heroContent">
          <h1>Trust for your car!</h1>
          <p>Your car is in the hands of experts who truly care, ensuring top performance and your safety on every drive.</p>
          <button onClick={() => alert("Hello!")}>Get started</button>
        </div>
      </div>
      {/* BusinessInfo component */}
      <BusinessInfo />
      <WhyChooseUs />
      <div className="phrase">
        <h2>Catchy phrase</h2>
      </div>
      <Testemonials />

    </div>
    
  );
};

export default Home;

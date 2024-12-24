import Header from "../components/Header";
import Hero from "../components/Hero";
import BusinessInfo from "../components/BusinessInfo";
import WhyChooseUs from "../components/WhyChooseUs";
import CarTypesServices from "../components/CarTypeServices";
import TestimonialsCarousel from "../components/Carrossel";
import "../styles/style.css";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      {/* hero */}
      <Header className={"absoluteHeader"} />
      <Hero />
      {/* BusinessInfo component */}
      <div className="intro">
        <h3>Welcome to ACJ Auto Repair!</h3>
        <p>
          We offer comprehensive maintenance and repair services to keep your
          vehicle in top condition, with quality and reliability. Our team is
          ready to serve you with efficiency and dedication. Visit us at <strong> 570
          Maple Ave, Elizabeth, NJ 07202.</strong>
        </p>
      </div>
      <BusinessInfo />
      <WhyChooseUs />
      <CarTypesServices />
      <TestimonialsCarousel />
      <div className="phrase session">
        <h2>Driven to Keep You Moving!</h2>
      </div>
      
    </div>
  );
};

export default Home;

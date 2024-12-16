import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/style.css";
import balancingMachine from "../assets/images/balancing_machine.jpeg";
import wheelAlignment from "../assets/images/wheelalignment.webp";
import lyft from "../assets/images/machine.png";

const OurServices = () => {
  // Define the machinery array
  const machines = [
    { name: "Balancing Machine", src: balancingMachine },
    { name: "Wheel Alignment Machine", src: wheelAlignment },
    { name: "Lyft Machine", src: lyft },
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  // Open image lightbox
  const openImage = (index) => {
    setCurrentIndex(index);
    document.addEventListener("keydown", handleKeyNavigation);
  };

  // Close lightbox
  const closeImage = () => {
    setCurrentIndex(null);
    document.removeEventListener("keydown", handleKeyNavigation);
  };

  // Handle keyboard navigation
  const handleKeyNavigation = (event) => {
    if (event.key === "ArrowRight") {
      navigateNext();
    } else if (event.key === "ArrowLeft") {
      navigatePrevious();
    } else if (event.key === "Escape") {
      closeImage();
    }
  };

  // Navigate to next image
  const navigateNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % machines.length);
  };

  // Navigate to previous image
  const navigatePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + machines.length) % machines.length);
  };

  return (
    <>
      <Header className="blackHeader" />
      <div className="contentContainer">
        <article className="session" style={{ marginBottom: 0 }}>
          <h2 className="pageTitle">/Our Services</h2>
          <h1>Our Services</h1>
          <p>
            We specialize in delivering tailored solutions designed to meet your unique needs. 
            Our range of services combines expertise, innovation, and a customer-focused 
            approach to ensure the highest quality and satisfaction.
          </p>
          <ul>
            <li>
              Engine Repair: Comprehensive diagnostics and expert repairs to get your vehicle running smoothly.
            </li>
            <li>
              Brake Services: Precision brake repairs and maintenance to ensure your safety.
            </li>
            <li>
              Wheel Alignment: Advanced alignment solutions for improved driving stability.
            </li>
          </ul>
          <br />
          <h1>Our Machinery</h1>
          <p>
            We are equipped with advanced, state-of-the-art machinery that ensures precision, 
            efficiency, and exceptional quality in every project. From innovative tools to 
            cutting-edge technology, our equipment allows us to meet diverse demands with reliability 
            and excellence, reinforcing our commitment to delivering outstanding results.
          </p>
          <div className="machines">
            {machines.map((machine, index) => (
              <div
                key={index}
                className="machine"
                onClick={() => openImage(index)}
                style={{ cursor: "pointer" }}
              >
                <img src={machine.src} alt={machine.name} />
                <h3>{machine.name}</h3>
              </div>
            ))}
          </div>
        </article>

        {/* Lightbox */}
        {currentIndex !== null && (
          <div className="lightbox" onClick={closeImage}>
            <div className="lightboxContent" onClick={(e) => e.stopPropagation()}>
              <button className="closeButton" onClick={closeImage}>
                X
              </button>
              <img
                src={machines[currentIndex].src}
                alt={machines[currentIndex].name}
                className="lightboxImage"
              />
              <button className="prevButton" onClick={navigatePrevious}>
                ←
              </button>
              <button className="nextButton" onClick={navigateNext}>
                →
              </button>
            </div>
          </div>
        )}
        <button style={{ marginBottom: "80px" }}>Contact Us</button>
      </div>
    </>
  );
};

export default OurServices;

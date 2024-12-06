import React, { useState } from "react";
import Header from "../components/Header";
import balancingMachine from "../assets/images/balancing_machine.jpeg";
import wheelAlignment from "../assets/images/wheelalignment.webp";
import lyft from "../assets/images/machine.png";

const OurServices = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const machines = [
    { name: "Balancing Machine", image: balancingMachine },
    { name: "Wheel Alignment Machine", image: wheelAlignment },
    { name: "Lyft Machine", image: lyft },
    { name: "Lyft Machine", image: lyft },
  ];

  const openModal = (index) => setCurrentImageIndex(index);
  const closeModal = () => setCurrentImageIndex(null);
  const goToNext = () =>
    setCurrentImageIndex((prev) => (prev + 1) % machines.length);
  const goToPrevious = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + machines.length) % machines.length
    );

  return (
    <>
      <Header />
    <div className="contentContainer">
      <article>
        <h1>Our Services</h1>
        <p>
          We specialize in delivering tailored solutions designed to meet your
          unique needs. Our range of services combines expertise, innovation,
          and a customer-focused approach to ensure the highest quality and
          satisfaction.
        </p>
        <ul>
          <li>
            Engine Repair: Comprehensive diagnostics and expert repairs to get
            your vehicle running smoothly.
          </li>
          <li>
            Brake Services: Precision brake repairs and maintenance to ensure
            your safety.
          </li>
          <li>
            Wheel Alignment: Advanced alignment solutions for improved driving
            stability.
          </li>
        </ul>

        <h2>Our Machinery</h2>
        <p>
          We are equipped with advanced, state-of-the-art machinery that ensures
          precision, efficiency, and exceptional quality in every project. From
          innovative tools to cutting-edge technology, our equipment allows us
          to meet diverse demands with reliability and excellence, reinforcing
          our commitment to delivering outstanding results.
        </p>
        <div className="machines">
          {machines.map((machine, index) => (
            <div
              key={index}
              className="machine"
              onClick={() => openModal(index)}
              style={{ cursor: "pointer" }}
            >
              <img src={machine.image} alt={machine.name} />
              <h3>{machine.name}</h3>
            </div>
          ))}
        </div>
      </article>

      {currentImageIndex !== null && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={closeModal}>
              &times;
            </button>
            <button className="prev" onClick={goToPrevious}>
              &#8249;
            </button>
            <img
              src={machines[currentImageIndex].image}
              alt={machines[currentImageIndex].name}
            />
            <button className="next" onClick={goToNext}>
              &#8250;
            </button>
          </div>
        </div>
      )}
      <button>Contact Us</button>
    </div>
    </>
  );
};

export default OurServices;

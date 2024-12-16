import React, { useState } from "react";
import "../styles/style.css";

const CarTypesServices = () => {
  // Dynamically require all images from the folder
  const images = require.context("../assets/carsTypeServices", false, /\.(png|jpe?g|svg)$/);

  // Create an array of image paths
  const cars = images.keys().map((key) => ({
    name: key.replace('./', '').replace(/\.(png|jpe?g|svg)$/, ''), // Optional: Clean the filename for display
    src: images(key), // Get the image source
  }));

  const [currentIndex, setCurrentIndex] = useState(null);

  const openImage = (index) => {
    setCurrentIndex(index);
    document.addEventListener("keydown", handleKeyNavigation);
  };

  const closeImage = () => {
    setCurrentIndex(null);
    document.removeEventListener("keydown", handleKeyNavigation);
  };

  const handleKeyNavigation = (event) => {
    if (event.key === "ArrowRight") {
      navigateNext();
    } else if (event.key === "ArrowLeft") {
      navigatePrevious();
    } else if (event.key === "Escape") {
      closeImage();
    }
  };

  const navigateNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
  };

  const navigatePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length);
  };

  return (
    <div className="carTypeServices session">
      <h2 style={{textAlign: "left"}}>We service all types of cars</h2>
      <div className="h2Underline"></div>
      <div className="carsSlider">
        {cars.map((car, index) => (
          <div key={index} className="carItem" onClick={() => openImage(index)}>
            <img src={car.src} alt={car.name} />
            {/* <p>{car.name}</p> */}
          </div>
        ))}
      </div>

      {currentIndex !== null && (
          <div className="lightbox">
          <div className="lightboxContent">
            <button className="closeButton" onClick={closeImage}>X</button>
            <img src={cars[currentIndex].src} alt={cars[currentIndex].name} className="lightboxImage" />
            <button className="prevButton" onClick={navigatePrevious}>←</button>
            <button className="nextButton" onClick={navigateNext}>→</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarTypesServices;

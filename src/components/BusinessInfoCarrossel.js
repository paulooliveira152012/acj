import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../styles/style.css";

class BusinessCards extends Component {
  render() {
    const businessInfoList = [
      {
        title: "Costumization",
        description:
          "Trust us for all your repair needs, from minor fixes to major overhauls. Our skilled technicians deliver quality repairs you can rely on.",
      },

      {
        title: "Diagnosis",
        description:
          "Looking to personalize your car? Our customization services help you create a unique vehicle that reflects your style and preferences.",
      },

      {
        title: "Repairs",
        description:
          "Count on us for accurate diagnosis of your vehicle's issues. We use advanced tools to pinpoint problems and offer effective solutions.",
      },
    ];


    const allServices = [
        "Diagnostics & Computerized Testing",
        "Oil Changes & Fluid Maintenance",
        "Brakes & ABS Systems",
        "Engine & Transmission Repair",
        "Heating & Air Conditioning",
        "Alignment & Suspension",
        "Battery, Starter & Alternator",
        "Tires & Tire Pressure Services",
        "Exhaust & Emissions Systems",
        "General Preventive Maintenance",
      ];

    return (
      <>
        <h2>Our comprehensive services</h2>
        <div className="h2Underline"></div>
        <Carousel>
          {businessInfoList.map((item, index) => (
            <div key={index} className="BusinessCardContainer hide">
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </Carousel>

        <div className="BusinessCardsWideScreen">
        {businessInfoList.map((item, index) => (
            <div key={index} className="BusinessCardContainer wideContainer">
              <div className="cardContainer">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="servicesContainer2 ">
          {/* services list */}
          <div className="titleParentContainer">
            <div className="titleContainer">
              {/* <div className="ifen"></div> */}
              <h2>Our Auto Service Offerings</h2>
            </div>
            <div className="h2Underline"></div>
          </div>

          <div className="allServicesList">
            {allServices.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default BusinessCards;

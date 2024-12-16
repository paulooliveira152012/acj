import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import tpmSensorMachine from "../assets/images/equipment/tpm sensor machine.png";
import batteryTestingMachine from "../assets/images/equipment/battery test.png";
import videoInspectionScopeDevice from "../assets/images/equipment/video inspection scope.png";
import coolingSystemKit from "../assets/images/equipment/coolingSystemKit.png";
import fuelPumpTestingKit from "../assets/images/equipment/Fuel pump test.png";
import oilPressureGauge from "../assets/images/equipment/Oil pressure gauge Set.png";
import vaccumPumpTest from "../assets/images/equipment/Vacuum pump test kit.png";
import brakeServiceMachine from "../assets/images/equipment/Brake services machine.png";
import acChargeMachineR1234yf from "../assets/images/equipment/AC charge machine R1234yf.png";
import acChargeMachineR134 from "../assets/images/equipment/AC Charge machine R-134.png";
import nitrogenleaktest from "../assets/images/equipment/nitrogenleaktest.png";
import lyft from "../assets/images/machine.png";


const OurServices = () => {
  const navigate = useNavigate()

  const services = [
    {
      name: "Engine Repair",
      description:
        "Comprehensive diagnostics and expert repairs to restore your engine's performance. Whether it's a minor issue or a major overhaul, we've got you covered.",
      equipment: ["Video Inspection Scope", "Fuel Pump Testing Kit", "Oil Pressure Gauge"],
    },
    {
      name: "Brake Services",
      description:
        "Ensure your safety with precision brake repairs and maintenance, including brake pad replacement, rotor resurfacing, and more.",
      equipment: ["Brake Service Machine", "Vacuum Pump Testing Kit"],
    },
    {
      name: "Wheel Alignment",
      description:
        "Advanced alignment solutions to improve driving stability, extend tire life, and enhance fuel efficiency.",
      equipment: ["Hunter Wheel Alignment and Balancing"],
    },
    {
      name: "Battery Testing",
      description:
        "Diagnose and test your car's battery to ensure optimal performance. Prevent unexpected breakdowns with our advanced testing kits.",
      equipment: ["Battery Testing Kit"],
    },
    {
      name: "Air Conditioning",
      description:
        "Stay cool and comfortable with our AC services, including recharging, leak detection, and maintenance.",
      equipment: ["AC Charge Machine R134", "AC Charge Machine R1234yf", "AC Nitrogen Leak Test"],
    },
  ];

  const machines = [
    { name: "TPM Sensor Machine", src: tpmSensorMachine },
    { name: "Battery Testing Kit", src: batteryTestingMachine },
    { name: "Video Inspection Scope", src: videoInspectionScopeDevice },
    { name: "Radiator Leak Testing Kit", src: coolingSystemKit },
    { name: "Fuel Pump Testing Kit", src: fuelPumpTestingKit },
    { name: "Oil Pressure Gauge", src: oilPressureGauge },
    { name: "Vacuum Pump Testing Kit", src: vaccumPumpTest },
    { name: "Brake Service Machine", src: brakeServiceMachine },
    { name: "AC Charge Machine R134", src: acChargeMachineR134 },
    { name: "AC Charge Machine R1234yf", src: acChargeMachineR1234yf },
    { name: "AC Nitrogen Leak Test", src: nitrogenleaktest },
    { name: "Hunter Wheel Alignment and Balancing", src: lyft },
  ];

  return (
    <>
      <Header className="blackHeader" />
      <div className="contentContainer">
        <article className="session">
          <h2 className="pageTitle">/Our Services</h2>
          <h1>Our Services</h1>
          <p>
            We specialize in delivering tailored solutions designed to meet your
            unique needs. Our range of services combines expertise, innovation,
            and a customer-focused approach to ensure the highest quality and
            satisfaction.
          </p>

          {/* Services Section */}
          <div className="services">
            {services.map((service, index) => (
              <div key={index} className="serviceCard">
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <h3>Equipment Used:</h3>
                <ul>
                  {service.equipment.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Equipment Section */}
          <h1>Our Equipment</h1>
          <p>
            We are equipped with advanced, state-of-the-art machinery that ensures precision, efficiency, and exceptional quality in every project.
          </p>
          <div className="machines">
            {machines.map((machine, index) => (
              <div key={index} className="machine">
                <img src={machine.src} alt={machine.name} />
                <h3>{machine.name}</h3>
              </div>
            ))}
          </div>
        </article>

        <button onClick={() => navigate('/contact-us')} style={{ marginBottom: "80px" }}>Contact Us</button>
        
      </div>
    </>
  );
};

export default OurServices;

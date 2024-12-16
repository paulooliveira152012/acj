import React from "react";
import Header from "../components/Header";
import "../styles/style.css";
import tpmSensorMachine from "../assets/images/equipment/tpm sensor machine.png";
import batteryTestingMachine from "../assets/images/equipment/battery test.png";
import videoInspectionScopeDevice from "../assets/images/equipment/video inspection scope.png";
import coolingSystemKit from "../assets/images/equipment/coolingSystemKit.png";
import fuelPumpTestingKit from "../assets/images/equipment/Fuel pump test.png";
import oilPressureGauge from "../assets/images/equipment/Oil pressure gauge Set.png";
import vaccumPumpTest from "../assets/images/equipment/Vacuum pump test kit.png";
import brakeServiceMachine from "../assets/images/equipment/Brake services machine.png";
import snapOnElectronicTorque from "../assets/images/equipment/Snap on Electronic Torque-Angle wrench.png";
import acChargeMachineR1234yf from "../assets/images/equipment/AC charge machine R1234yf.png";
import acChargeMachineR134 from "../assets/images/equipment/AC Charge machine R-134.png";
import nitrogenleaktest from "../assets/images/equipment/nitrogenleaktest.png";
import lyft from "../assets/images/machine.png";

const OurServices = () => {
  // Machinery data
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
        <article className="session" style={{ marginBottom: 0 }}>
          <h2 className="pageTitle">/Our Services</h2>
          <h1>Our Services</h1>
          <p>
            We specialize in delivering tailored solutions designed to meet your
            unique needs. Our range of services combines expertise, innovation,
            and a customer-focused approach to ensure the highest quality and
            satisfaction.
          </p>
          <ul>
            <li>Engine Repair: Comprehensive diagnostics and expert repairs to get your vehicle running smoothly.</li>
            <li>Brake Services: Precision brake repairs and maintenance to ensure your safety.</li>
            <li>Wheel Alignment: Advanced alignment solutions for improved driving stability.</li>
          </ul>
          <h1>Our Machinery</h1>
          <p>
            We are equipped with advanced, state-of-the-art machinery that ensures precision, efficiency, and exceptional quality in every project. From innovative tools to cutting-edge technology, our equipment allows us to meet diverse demands with reliability and excellence.
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
        <button style={{ marginBottom: "80px" }}>Contact Us</button>
      </div>
    </>
  );
};

export default OurServices;

import "../styles/style.css";

const BusinessInfo = () => {
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
    "Alignment",
    "Steering & Suspension",
    "Computerized Diagnostic",
    "Tune Up",
    "Filters",
    "Belts And Hoses",
    "ABS",
    "Alternator & Starter",
    "Radiator",
    "Engine & Transmission",
    "Air Conditioner",
    "Heating And Cooling",
    "Brake",
    "Tire Pressure Light",
    "Battery Test",
    "Exhaust System",
    "Traction Control-Air Bag",
    "4x4",
    "Oil Change & Fluids",
    "Lights",
    "Clutch",
    "General Preventive Maintenance",
  ];

  return (
    <div className="businessInfoContainer session">
      <div>
        <div className="titleParentContainer">
          <div className="titleContainer">
            {/* <div className="ifen"></div> */}
            <h2>Our comprehensive services</h2>
          </div>
          <div className="h2Underline"></div>
        </div>
        {/* services highlighted */}
        <div className="servicesContainer">
          {businessInfoList.map((item, index) => (
            <div key={index} className="container">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
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
      </div>
    </div>
  );
};

export default BusinessInfo;

import "../styles/style.css";

const BusinessInfo = () => {

    const businessInfoList = [
        {
            title: "Costumization",
            description: "Trust us for all your repair needs, from minor fixes to major overhauls. Our skilled technicians deliver quality repairs you can rely on."
        },

        {
            title: "Diagnosis",
            description: "Looking to personalize your car? Our customization services help you create a unique vehicle that reflects your style and preferences."
        },

        {
            title: "Repairs",
            description: "Count on us for accurate diagnosis of your vehicle's issues. We use advanced tools to pinpoint problems and offer effective solutions."
        },
    ]

  return (
    <div className="businessInfoContainer">
        <div>
      <div className="titleContainer">
        <div className="ifen"></div>
        <h2>Our comprehensive services for you</h2>
      </div>
      <div className="servicesContainer">
        {businessInfoList.map((item, index) =>(
            <div key={index} className="container">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
            </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default BusinessInfo;

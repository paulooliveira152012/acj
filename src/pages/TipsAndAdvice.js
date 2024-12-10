import React from "react";
import Header from "../components/Header";
import "../styles/style.css";

const TipsAndAdvice = () => {
  const tips = [
    {
      title: "Regular Oil Changes",
      content: "Changing your oil regularly keeps your engine running smoothly and extends its lifespan. Aim to replace the oil every 3,000 to 5,000 miles, depending on your vehicle's make and model."
    },
    {
      title: "Check Your Tires",
      content: "Ensure your tires are properly inflated and have sufficient tread. Low tire pressure can lead to reduced fuel efficiency and uneven wear."
    },
    {
      title: "Inspect Brakes Frequently",
      content: "Don't ignore squeaking or grinding noises when you brake. These could be signs of worn brake pads or other issues that need immediate attention."
    },
    {
      title: "Replace Air Filters",
      content: "A clean air filter improves engine performance and fuel efficiency. Check and replace your air filter every 12,000 to 15,000 miles."
    },
    {
      title: "Pay Attention to Warning Lights",
      content: "Your car's dashboard warning lights indicate potential problems. Address them promptly to avoid costly repairs later."
    },
    {
      title: "Keep Your Battery in Check",
      content: "Ensure your car battery terminals are clean and free of corrosion. Replace the battery every 3 to 5 years or when you notice issues starting your vehicle."
    },
    {
      title: "Maintain Your Cooling System",
      content: "Coolant prevents your engine from overheating. Check coolant levels and flush the system every 30,000 miles or as recommended by your vehicle's manual."
    },
    {
      title: "Test Your Lights",
      content: "Inspect all your vehicle's lights regularly to ensure they’re functioning correctly. Replace any burned-out bulbs promptly."
    },
    {
      title: "Keep Your Car Clean",
      content: "Regularly washing and waxing your car protects the paint from rust and corrosion. A clean car is also more pleasant to drive."
    },
    {
      title: "Have Regular Checkups",
      content: "Schedule regular maintenance checkups with a trusted mechanic to catch small issues before they become big problems."
    },
  ];

  return (
    <>
      <Header className="blackHeader" />
      <div className="contentContainer">
        <div className="session">
          <h1>Tips & Advice</h1>
          <p>Here are some essential tips and advice to keep your vehicle running smoothly and safely:</p>
          <ul className="tipsList">
            {tips.map((tip, index) => (
              <li key={index} className="tipItem">
                <h3>{tip.title}</h3>
                <p>{tip.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TipsAndAdvice;

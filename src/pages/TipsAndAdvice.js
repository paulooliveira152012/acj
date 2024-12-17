import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import topShape from "../assets/images/blogImages/topShape.jpg";
import engine from "../assets/images/blogImages/engine.png";
import suspension from "../assets/images/blogImages/suspensions.jpg";
import carTrip from "../assets/images/blogImages/carTrip.jpg";
import carManual from "../assets/images/blogImages/carmanual.jpg";
import carDtcImage from "../assets/images/blogImages/dashlights.jpg"
import "../styles/style.css";
import "../styles/blog.css";

const blogs = [
  {
    title: "5 Essential Tips to Keep Your Car in Top Shape",
    tip: "Keeping your car in good condition goes beyond avoiding unexpected expenses—it’s also a matter of safety and efficiency.",
    blogImage: topShape,
    content: [
      "Keeping your car in good condition goes beyond avoiding unexpected expenses—it’s also a matter of safety and efficiency. With a few simple steps and a preventive maintenance routine, you can extend your vehicle's lifespan and drive with greater peace of mind. Check out five essential practices to keep your car in top shape.",
      "**1. Oil Change on Time**",
      "Motor oil is essential for lubricating the engine's components and preventing overheating. Always change it within the timeframe recommended by the manufacturer, based on mileage or usage time. Neglecting this maintenance can lead to engine wear, increased fuel consumption, and costly repairs.",
      "**2. Check Your Tires Regularly**",
      "Well-maintained tires ensure stability, safety, and cost-efficiency. Inflate them weekly and inspect their condition for cuts or excessive wear. Additionally, periodic alignment and balancing help prevent handling issues and prolong tire life.",
      "**3. Keep an Eye on the Battery**",
      "The battery is the heart of your car's electrical system. Clean the terminals to prevent corrosion and test its charge during regular check-ups. This is especially important if the car has been idle for a long time or if you live in areas with extreme weather conditions.",
      "**4. Brake System**",
      "Efficient brakes are crucial for your safety. If you notice noises, vibrations, or a 'soft' brake pedal, take your car to a mechanic immediately. Worn-out brake pads or discs can compromise stopping power, increasing the risk of accidents.",
      "**5. Regular Maintenance**",
      "Preventive maintenance acts like a full check-up for your car. During these inspections, mechanics evaluate critical components such as the engine, suspension, brakes, and electrical system. Following the manufacturer’s recommendations is the best way to prevent major issues and keep your car running like new.",
      "Taking care of your car is an investment worth making: it prevents small issues from turning into significant expenses and ensures safety and performance on the road. Incorporating these practices into your routine will help keep your vehicle in top condition, save fuel, and avoid future headaches. After all, a well-maintained car means peace of mind and confidence behind the wheel!",
    ],
  },
  {
    title: "5 Crucial Tips to Extend Your Car's Engine Life",
    tip: "The engine is the heart of your car, and keeping this component in good condition is key to maintaining performance and avoiding costly repairs.",
    blogImage: engine,
    content: [
      "**1. Use Quality Fuel**",
      "Low-quality fuel can cause dirt and deposits to build up in the engine, harming its efficiency and performance. Always choose trustworthy gas stations and high-quality fuel.",
      "**2. Change the Air Filter Regularly**",
      "The air filter prevents dirt and debris from entering the engine and ensures it breathes properly. Replacing the filter as per the manufacturer’s recommendation helps improve fuel efficiency and prevents engine damage.",
      "**3. Check the Cooling System**",
      "The engine's cooling system prevents overheating. Check the coolant level regularly and replace it as needed. An overheated engine can cause severe damage and expensive repairs.",
      "**4. Pay Attention to the Exhaust System**",
      "A leak in the exhaust system or a damaged catalytic converter can affect the engine's performance and even reduce fuel efficiency. Make periodic checks of the system to ensure everything is working properly.",
      "**5. Keep the Engine Lubricated**",
      "Engine oil is essential for lubricating moving parts. Not only should you change the oil regularly, but also check the oil level frequently to avoid damage from insufficient lubrication.",
      "Taking good care of the engine is an intelligent way to ensure your car lasts longer without compromising performance. By following these tips, you can prevent serious issues and reduce repair costs.",
    ],
  },
  {
    title: "How to Choose the Ideal Suspension for Your Car",
    tip: "Choosing and maintaining the ideal suspension improves drivability and ensures greater safety and comfort.",
    blogImage: suspension,
    content: [
      "The suspension is responsible for your car's stability and comfort, and it directly impacts safety and performance. Choosing the right suspension system can make a significant difference in your driving experience. Here’s how to make the right choice!",
      "**Understand the Suspension Type**",
      "There are different types of suspension systems, such as independent (where each wheel has its own suspension) and beam suspensions (where the wheels are connected). Sports cars typically have independent suspension, while heavier vehicles like trucks may use beam systems.",
      "**Consider the Vehicle's Use**",
      "If your car is primarily driven on paved roads for short trips, a stiffer suspension might offer better performance and comfort. If you drive long distances or often on rough terrain, a softer suspension can help absorb impacts better.",
      "**OEM vs. Custom Suspension**",
      "Original equipment manufacturer (OEM) suspensions are designed to offer a balance between performance, comfort, and durability. However, for those seeking a personalized experience, options like sports or lowered suspensions may be appealing. Keep in mind that modifications should be done carefully, as they could affect the vehicle’s safety and warranty.",
      "**Pay Attention to the Shock Absorber**",
      "Shock absorbers are key to the suspension's performance. If you notice the car 'bouncing' excessively or instability in handling, it may be time to replace the shock absorbers. Always choose quality parts to ensure proper function.",
      "**Regular Maintenance**",
      "Even with a quality suspension, regular maintenance is essential. Have the suspension inspected periodically, and if you notice strange noises or changes in the vehicle's behavior, have it checked by a professional.",
      "Investing in your car’s suspension is investing in a better driving experience!",
    ],
  },
  {
    title: "How to Avoid Premature Wear on Your Clutch",
    tip: "Proper clutch use extends its life and prevents unnecessary repairs.",
    blogImage: carManual,

    content: [
      "1. Avoid Resting Your Foot on the Clutch Pedal: Resting your foot on the clutch pedal while driving can cause premature wear. This keeps the clutch in partial contact, even when you're not engaging it, which speeds up wear.",
      "2. Avoid Abrupt Starts: Making abrupt starts can put excess strain on both the clutch and the engine. Always shift gears smoothly, especially when getting the car moving. This helps preserve both the clutch and transmission.",
      "3. Avoid Riding the Clutch on Hills: When driving uphill or downhill, avoid keeping the clutch partially engaged. This causes unnecessary wear and can overheat the system, leading to faster damage.",
      "4. Change Transmission Fluid on Time: While transmission fluid isn't directly related to the clutch, it helps maintain the overall performance of the gear system. Replacing the fluid as recommended improves transmission function and helps preserve the clutch.",
      "5. Regular Maintenance Checks: Regular maintenance, including timely adjustments and replacing worn-out parts, can extend the life of your clutch. Be alert to any difficulties when shifting gears, as this can indicate problems with the clutch system.",
    ],
  },
  {
    title: "How to Prepare Your Car for a Long Road Trip",
    tip: "Preparation minimizes surprises on the road and ensures a safer journey.",
    blogImage: carTrip,
    content: [
      "**Check Oil and Fluid Levels:**",
      "Ensure that the engine oil, brake fluid, transmission fluid, and coolant are all at the correct levels. These fluids are essential for your car's performance during the trip.",
      "**Inspect Your Tires:**",
      "Check the tire pressure and visually inspect the tires for uneven wear, cuts, or bulges. Tires in good condition are vital for safety on the road. Don’t forget to check the spare tire and make sure you have all the tools for changing a flat.",
      "**Test the Brakes:**",
      "Inspect the brakes, especially if you notice any strange noises or vibrations when braking. A full brake inspection is critical for ensuring your braking system is in top shape for the journey.",
      "**Check Your Lighting System:**",
      "Make sure all your headlights, brake lights, turn signals, and taillights are working properly. Driving at night with faulty lights is dangerous, and proper lighting is a legal requirement in many countries.",
      "**Do a Complete Clean-Up:**",
      "In addition to being pleasant, keeping your car clean both inside and out helps prevent dirt from accumulating on moving parts like the engine and brakes. It also improves visibility in case you need to use the windshield wipers.",
    ],
  },
  {
    title: "Understanding Car Diagnostic Trouble Codes (DTC): What They Mean",
    tip: "Learn what common car trouble codes mean when scanned and how to address them.",
    blogImage: carDtcImage, // Replace with your image path
    content: [
      "Modern cars are equipped with **On-Board Diagnostics (OBD-II)** systems that detect issues within your vehicle. When a car is scanned, it produces diagnostic trouble codes (DTCs) that identify problems in key systems like the engine, transmission, and more.",
      "**What Are DTC Codes?**",
      "DTCs are five-character codes that help pinpoint issues. Their structure is as follows:",
      "- **P**: Powertrain (engine, transmission)",
      "- **B**: Body (airbags, seat belts)",
      "- **C**: Chassis (suspension, steering)",
      "- **U**: Undefined (network communication)",
      "The first digit indicates the code type: **0** for generic OBD-II and **1** for manufacturer-specific codes.",
      "**Common DTC Codes and Their Meanings:**",
      "**1. P0300 – Random/Multiple Cylinder Misfire Detected**",
      "Your engine is misfiring in one or more cylinders. Causes include faulty spark plugs, bad ignition coils, or fuel delivery issues. Fix: Check spark plugs, ignition coils, and fuel injectors.",
      "**2. P0171 – System Too Lean (Bank 1)**",
      "The air-fuel mixture is too lean. Causes include vacuum leaks or a dirty mass airflow sensor (MAF). Fix: Inspect for vacuum leaks or clean the MAF sensor.",
      "**3. P0420 – Catalyst System Efficiency Below Threshold (Bank 1)**",
      "Indicates a worn-out catalytic converter or faulty oxygen sensor. Fix: Replace the catalytic converter or O2 sensor.",
      "**4. P0442 – EVAP System Leak Detected (Small Leak)**",
      "A small leak in the evaporative emission control system. Causes: Loose gas cap or cracked EVAP hoses. Fix: Tighten or replace the gas cap.",
      "**5. P0507 – Idle Control System RPM Higher Than Expected**",
      "The engine idle speed is higher than normal. Causes: Dirty throttle body or faulty idle air control valve. Fix: Clean the throttle body or replace the valve.",
      "**6. U0101 – Lost Communication with Transmission Control Module (TCM)**",
      "There’s no communication with the TCM. Causes: Loose wiring connections or a faulty TCM. Fix: Inspect wiring and replace the TCM if necessary.",
      "**7. P0113 – Intake Air Temperature Sensor Circuit High Input**",
      "The intake air temperature sensor reads abnormally high. Causes: Damaged sensor or wiring. Fix: Replace the sensor or repair the wiring.",
      "**8. B0028 – Right Side Airbag Deployment Circuit**",
      "Fault detected in the airbag system. Causes: Faulty sensor or loose wiring. Fix: Inspect wiring and replace faulty sensors.",
      "**9. C1234 – Wheel Speed Sensor Fault**",
      "A wheel speed sensor is malfunctioning. Causes: Damaged sensor or corroded connections. Fix: Replace the faulty wheel speed sensor.",
      "**10. P0700 – Transmission Control System Malfunction**",
      "A general transmission control fault. Causes: Low transmission fluid or faulty TCM. Fix: Check fluid levels and replace the TCM.",
      "**How to Read and Clear DTC Codes**",
      "1. Use an OBD-II scanner to read the codes by connecting to the port (under the dashboard).",
      "2. Address the problem causing the code.",
      "3. Use the scanner to clear the codes after repairs.",
      "Understanding these codes allows you to identify and fix car issues efficiently, saving time and money while keeping your vehicle in top condition. For persistent issues, consult a professional mechanic for accurate diagnosis."
    ],
  },

  
];

const TipsAndAdvice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

    // Scroll to top whenever selectedBlog changes
    useEffect(() => {
      if (selectedBlog) {
        window.scrollTo({
          top: 100,
          // behavior: "smooth",
        });
      }
    }, [selectedBlog]);

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.some((paragraph) =>
        paragraph.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const viewBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const goBack = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      <Header className="blackHeader" />
      <div className="contentContainer blogScreen">
        {selectedBlog ? (
          <div className="blogDetail">
            <button onClick={goBack} className="backButton">
              &larr; Back to Blogs
            </button>
            <h1>{selectedBlog.title}</h1>
            <p className="blogTip">{selectedBlog.tip}</p>

            {/* Display blog image */}
            {selectedBlog.blogImage ? (
              <div className="blogImageContainer">
              <img
                src={selectedBlog.blogImage}
                alt={selectedBlog.title}
                className="blogDetailImage"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  margin: "20px 0",
                  borderRadius: "8px",
                }}
              />
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  margin: "20px 0",
                }}
              >
                <p>No Image Available</p>
              </div>
            )}

            {/* Render blog content */}
            {selectedBlog.content.map((paragraph, index) => {
              const formattedParagraph = paragraph
                .split("**")
                .map((part, i) =>
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                );
              return <p key={index}>{formattedParagraph}</p>;
            })}
          </div>
        ) : (
          <div className="session" style={{ marginTop: "50px" }}>
            <div className="blogHeader">
              <h1>Recent Blogs</h1>
              <input
                type="text"
                placeholder="Search blogs..."
                className="blogSearchBar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="blogContainer">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, index) => (
                  <div
                    key={index}
                    className={`blogBlock ${
                      index % 4 === 0 || index % 4 === 3
                        ? "flexLarge"
                        : "flexSmall"
                    }`}
                    onClick={() => viewBlog(blog)}
                  >
                    <div className="blogImage">
                      {blog.blogImage ? (
                        <div
                          style={{
                            backgroundImage: `url(${blog.blogImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                          }}
                        ></div>
                      ) : (
                        <div
                          style={{
                            backgroundColor: "#eee",
                            width: "100%",
                            height: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px",
                          }}
                        >
                          <p>No Image</p>
                        </div>
                      )}
                    </div>

                    <div className="blogContent">
                      <h3>{blog.title}</h3>
                      <p>{blog.tip}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No blogs found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TipsAndAdvice;

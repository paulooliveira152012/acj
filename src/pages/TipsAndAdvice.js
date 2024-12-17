import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/style.css";
import "../styles/blog.css";

const blogs = [
  {
    title: "5 Essential Tips to Keep Your Car in Top Shape",
    tip: "Keeping your car in good condition goes beyond avoiding unexpected expenses—it’s also a matter of safety and efficiency.",
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
      "Taking care of your car is an investment worth making: it prevents small issues from turning into significant expenses and ensures safety and performance on the road. Incorporating these practices into your routine will help keep your vehicle in top condition, save fuel, and avoid future headaches. After all, a well-maintained car means peace of mind and confidence behind the wheel!"
    ]
  },
  {
    title: "5 Crucial Tips to Extend Your Car's Engine Life",
    tip: "The engine is the heart of your car, and keeping this component in good condition is key to maintaining performance and avoiding costly repairs.",
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
      "Taking good care of the engine is an intelligent way to ensure your car lasts longer without compromising performance. By following these tips, you can prevent serious issues and reduce repair costs."
    ]
  },
  {
    title: "How to Choose the Ideal Suspension for Your Car",
    tip: "Choosing and maintaining the ideal suspension improves drivability and ensures greater safety and comfort.",
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
      "Investing in your car’s suspension is investing in a better driving experience!"
    ]
  },
  {
    title: "How to Avoid Premature Wear on Your Clutch",
    tip: "Proper clutch use extends its life and prevents unnecessary repairs.",
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
    content: [
      "**Check Oil and Fluid Levels:**",
      "Ensure that the engine oil, brake fluid, transmission fluid, and coolant are all at the correct levels. These fluids are essential for your car's performance during the trip.",
      "**Inspect Your Tires:**" ,
      "Check the tire pressure and visually inspect the tires for uneven wear, cuts, or bulges. Tires in good condition are vital for safety on the road. Don’t forget to check the spare tire and make sure you have all the tools for changing a flat.",
      "**Test the Brakes:**", 
      "Inspect the brakes, especially if you notice any strange noises or vibrations when braking. A full brake inspection is critical for ensuring your braking system is in top shape for the journey.",
      "**Check Your Lighting System:**",
      "Make sure all your headlights, brake lights, turn signals, and taillights are working properly. Driving at night with faulty lights is dangerous, and proper lighting is a legal requirement in many countries.",
      "**Do a Complete Clean-Up:**",
      "In addition to being pleasant, keeping your car clean both inside and out helps prevent dirt from accumulating on moving parts like the engine and brakes. It also improves visibility in case you need to use the windshield wipers.",
    ],
  },
];

const TipsAndAdvice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null); // State to track selected blog

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.some((paragraph) =>
        paragraph.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Handler to view a blog
  const viewBlog = (blog) => {
    setSelectedBlog(blog);
  };

  // Handler to go back to the blog list
  const goBack = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      <Header className="blackHeader" />
      <div className="contentContainer blogScreen">
        <div>
          {selectedBlog ? (
            <div className="blogDetail">
              <button onClick={goBack} className="backButton">
                &larr; Back to Blogs
              </button>
              <h1>{selectedBlog.title}</h1>
              <p className="blogTip">{selectedBlog.tip}</p>
              {selectedBlog.content.map((paragraph, index) => {
                // Check for paragraphs that include "**" for bold text
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
                      onClick={() => viewBlog(blog)} // Navigate to blog detail
                    >
                      <div className="blogImage">
                        <p>Image Placeholder</p>
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
      </div>
    </>
  );
};

export default TipsAndAdvice;

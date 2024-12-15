import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/style.css";
import "../styles/blog.css";

const blogs = [
  {
    title: "How to Change Your Oil",
    tip: "Regular oil changes ensure smooth engine performance.",
    content: [
      "Changing your oil is one of the most critical tasks to keep your car in good condition. Fresh oil reduces engine wear by minimizing friction between moving parts.",
      "To change your oil, start by warming up the engine slightly. Then, drain the old oil into a container and replace the oil filter. Finally, add new oil as per your vehicle manufacturer's recommendations.",
      "Most cars require an oil change every 3,000 to 5,000 miles, but always consult your owner's manual for specific guidelines."
    ],
  },
  {
    title: "The Importance of Tire Maintenance",
    tip: "Well-maintained tires improve fuel efficiency and safety.",
    content: [
      "Your tires are the only point of contact between your car and the road, making their condition critical for safety.",
      "Check tire pressure regularly and ensure it meets the recommended levels in your owner's manual. Proper inflation enhances fuel efficiency and prevents uneven wear.",
      "Rotate your tires every 5,000 to 7,000 miles to ensure even tread wear and prolong their lifespan."
    ],
  },
  {
    title: "Brake Maintenance Tips",
    tip: "Inspect brakes frequently to ensure your safety.",
    content: [
      "Brakes are one of the most vital components of your car. Worn brake pads or low brake fluid can compromise your ability to stop quickly.",
      "Listen for squeaking or grinding noises when braking, as these are signs of worn-out pads. Inspect brake pads every six months and replace them if the thickness is less than a quarter inch.",
      "Check your brake fluid level periodically and replace it according to the manufacturer's guidelines to maintain effective braking performance."
    ],
  },
  {
    title: "How to Clean Your Car's Interior",
    tip: "A clean car interior makes your driving experience more enjoyable.",
    content: [
      "Keeping your car's interior clean not only improves aesthetics but also prevents wear and tear.",
      "Start by removing all trash and vacuuming the seats and floor mats. Use a microfiber cloth and an appropriate cleaner to wipe down the dashboard, console, and door panels.",
      "Finish by cleaning the windows with a streak-free glass cleaner and applying a protective product to prevent UV damage."
    ],
  },
  {
    title: "Preparing Your Car for Winter",
    tip: "Winterize your car to avoid breakdowns during cold weather.",
    content: [
      "Winter conditions can be tough on your vehicle, but proper preparation can help you avoid breakdowns.",
      "Check your battery's health, as cold temperatures can reduce its efficiency. Top off your antifreeze and replace wiper blades with winter-specific ones.",
      "Consider switching to winter tires for better traction on snow and ice. Always keep an emergency kit in your car, including a flashlight, blankets, and jumper cables."
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
            {selectedBlog.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
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
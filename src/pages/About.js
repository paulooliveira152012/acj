import React from "react";
import Header from "../components/Header";
import "../styles/style.css";

const About = () => {
  const workingHours = [
    { day: "Mon", hours: "8:00 AM - 5:00 PM" },
    { day: "Tue", hours: "8:00 AM - 5:00 PM" },
    { day: "Wed", hours: "8:00 AM - 5:00 PM" },
    { day: "Thu", hours: "8:00 AM - 5:00 PM" },
    { day: "Fri", hours: "8:30 AM - 5:00 PM" },
    { day: "Sat", hours: "8:00 AM - 2:00 PM" },
    { day: "Sun", hours: "Closed" },
  ];

  const isClosedNow = (day, hours) => {
    const now = new Date();
    const currentDay = now.toLocaleDateString("en-US", { weekday: "short" });
    if (currentDay !== day) return false; // Only check for the current weekday

    if (hours === "Closed") return true;

    const [openTime, closeTime] = hours.split(" - ");
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Time in minutes

    const parseTime = (time) => {
      const [hour, minute, meridian] = time
        .match(/(\d+):(\d+) (AM|PM)/)
        .slice(1);
      let parsedHour = parseInt(hour, 10);
      const parsedMinute = parseInt(minute, 10);
      if (meridian === "PM" && parsedHour !== 12) parsedHour += 12;
      if (meridian === "AM" && parsedHour === 12) parsedHour = 0;
      return parsedHour * 60 + parsedMinute; // Convert to minutes
    };

    const openMinutes = parseTime(openTime);
    const closeMinutes = parseTime(closeTime);

    return currentTime < openMinutes || currentTime > closeMinutes;
  };

  return (
    <>
      <Header />
      <div className="contentContainer">
        <div className="session" style={{marginBottom: 0}}>
          <h1>Serving Our Community for Over [X] Years</h1>
          <div className="teamPicture">
            
          </div>
          <article>
            <p>
              Founded on the principles of passion and innovation, our journey
              began as a dream shared by a small group of friends who envisioned
              creating something extraordinary. Inspired by a commitment to
              quality and driven by a deep sense of purpose, we transformed that
              dream into a reality.
            </p>
            <p>
              In the early days, we operated out of a modest garage, where long
              hours and a dedication to craftsmanship laid the foundation for
              what we are today. Over time, our unwavering belief in creating
              meaningful experiences allowed us to grow into a team of talented
              individuals united by a shared mission: to inspire and make a
              difference.
            </p>
            <p>
              We are more than a business—we are a community of dreamers, doers,
              and innovators. Together, we’re building a legacy that reflects
              who we are and who we strive to become.
            </p>
          </article>
        </div>

        <button>Contact Us</button>

        <div className="session">
          
          <div className="working-hours">
            <h2>Hours of Operation</h2>
            <br></br>
            <ul>
              {workingHours.map(({ day, hours }) => (
                <li
                  key={day}
                  style={{
                    fontWeight: isClosedNow(day, hours) ? "bold" : "normal",
                    color: isClosedNow(day, hours) ? "red" : "inherit",
                  }}
                >
                  {day}: {hours}
                  {isClosedNow(day, hours) && <span> (Closed now)</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="session" style={{marginTop: 0, paddingTop:0}}>
          <h2>Location</h2>

          <p>570 Maple Ave, Elizabeth, NJ 07202, Estados Unidos</p>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.0638410507795!2d-74.2140532!3d40.650523099999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24d4a42597c55%3A0xecff621093733150!2s570%20Maple%20Ave%2C%20Elizabeth%2C%20NJ%2007202!5e0!3m2!1sen!2sus!4v1733440849063!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default About;

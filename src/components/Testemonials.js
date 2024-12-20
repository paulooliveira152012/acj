import React, { useEffect, useRef } from "react";
import StarIcon from "../assets/icons/star";
import "../styles/style.css";

const testimonials = [
  {
    name: "Alejo Hernández",
    message:
      "Great service, they are very professional and take good care of your car.",
    rating: 5,
  },
  {
    name: "Abner Paulino",
    message:
      "Very honest, professional and affordable mechanic shop in the area. They take their time to give a clear diagnosis and an affordable estimate. Friendly and respectful customer service! Highly recommend this place to anyone who would valued an honest and transparent mechanic.!",
    rating: 5,
  },
  {
    name: "Jose Abad",
    message: "Always a great job and service👌🙏",
    rating: 5,
  },
  {
    name: "Guillermo E. Ayala",
    message:
      "Honest and legit service. A place to trust your car to. They will do anything to help you or at least to advice you on your best choices. I highly suggest this place. I've been coming here for years and I'm very satisfied and content with the quality of their service.!",
    rating: 5,
  },
  {
    name: "Elizabeth Thompson",
    message:
      "My truck took some time to get the way should be, but it was worth the waiting. I'm so happy. Thank you for taking the time and putting your knowledge into this. The best of the best",
    rating: 5,
  },
  {
    name: "Jose Cerda",
    message:
      "I looked a lot but finally I found where there is responsibility and efficiency. I made an alignment and it is the best of many that I looked for and above all punctual at the time of delivery!",
    rating: 5,
  },
];

const Testemonials = () => {
  const containerRef = useRef(null);
  const animationFrame = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Smooth scrolling logic
    const smoothScroll = () => {
      if (container) {
        container.scrollLeft += 1; // Adjust scrolling speed here
        if (container.scrollLeft >= container.scrollWidth / 2) {
          // Reset scroll to the start of the duplicated content
          container.scrollLeft = 0;
        }
      }
      animationFrame.current = requestAnimationFrame(smoothScroll);
    };

    animationFrame.current = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  return (
    <div className="testemonialsContainer session">
      <h2>What our clients say</h2>

      <div className="testemonials" ref={containerRef}>
        {/* Duplicate testimonials to create the loop effect */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div key={index} className="container">
            <p>{testimonial.name}</p>
            {/* div com o tanto de estrelas do valor de rating */}
            <div className="starsContainer">
              {Array.from({ length: testimonial.rating }).map(
                (_, starIndex) => (
                  <StarIcon
                    key={starIndex}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "2px",
                    }}
                  />
                )
              )}
            </div>
            <p className="testemonialMessage">{testimonial.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testemonials;

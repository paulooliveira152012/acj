import React, { useEffect, useState, useRef } from 'react';
import '../styles/style.css';

const testimonials = [
  { name: "Paulo", message: "Job nicely done" },
  { name: "Gabi", message: "Awesome!" },
  { name: "Paulo", message: "Job nicely done" },
  { name: "Gabi", message: "Awesome!" },
  { name: "Paulo", message: "Job nicely done" },
  { name: "Gabi", message: "Awesome!" },
];

const Testemonials = () => {
  const containerRef = useRef(null);
  const animationFrame = useRef(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  useEffect(() => {
    const container = containerRef.current;

    const smoothScroll = () => {
      if (container && !isUserInteracting) {
        container.scrollLeft += 2; // Adjust this value for smoother scrolling speed
        if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
          container.scrollTo({ left: 0 }); // Reset scroll to the start
        }
      }
      animationFrame.current = requestAnimationFrame(smoothScroll);
    };

    animationFrame.current = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrame.current);
  }, [isUserInteracting]);

  
  return (
    <div className="testemonialsContainer session">
      <h2>What our clients say</h2>
      <div className="testemonials" ref={containerRef}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="container">
            <p>{testimonial.name}</p>
            <p>{testimonial.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testemonials;

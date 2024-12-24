import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import StarIcon from '../assets/icons/star';

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
        "Very honest, professional and affordable mechanic shop in the area. They take their time to give a clear diagnosis and an affordable estimate. Friendly and respectful customer service! Highly recommend this place to anyone who would value an honest and transparent mechanic!",
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
        "Honest and legit service. A place to trust your car to. They will do anything to help you or at least to advise you on your best choices. I highly suggest this place. I've been coming here for years and I'm very satisfied and content with the quality of their service!",
      rating: 5,
    },
    {
      name: "Elizabeth Thompson",
      message:
        "My truck took some time to get the way it should be, but it was worth the waiting. I'm so happy. Thank you for taking the time and putting your knowledge into this. The best of the best!",
      rating: 5,
    },
    {
      name: "Jose Cerda",
      message:
        "I looked a lot but finally I found where there is responsibility and efficiency. I made an alignment and it is the best of many that I looked for and above all punctual at the time of delivery!",
      rating: 5,
    },
  ];
  

  const TestimonialsCarousel = () => {
    return (
      <div className="testimonialsCarouselContainer">
        <h2>What Our Clients Say</h2>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          emulateTouch={true}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonialSlide">
              <p className="testimonialName">{testimonial.name}</p>
              <div className="starsContainer">
                {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                  <StarIcon
                    key={starIndex}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "2px",
                    }}
                  />
                ))}
              </div>
              <p className="testimonialMessage">{testimonial.message}</p>
            </div>
          ))}
        </Carousel>
      </div>
    );
  };

export default TestimonialsCarousel;

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/style.css";
import blackLogo from '../assets/images/logo_black.svg'

const ContactUs = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [caseContent, setCaseContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, email, phone, caseContent });
    window.alert("Inquiry submitted!");

    // Clear all fields
    setFullName("");
    setPhone("");
    setEmail("");
    setCaseContent("");
  };

  return (
    <>
      <Header className="blackHeader" />
      <div className="contentContainer">
      <div className="session">
        <div className="contactFormSection">
          <h1>Contact Us</h1>
          <form onSubmit={handleSubmit} className="contactForm">
            <input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Full Name"
              required
            />

            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />

            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Phone Number"
              required
            />

            <textarea
              id="caseDescription"
              value={caseContent}
              onChange={(e) => setCaseContent(e.target.value)}
              placeholder="Provide a brief description of your case"
              className="caseDescriptionInput"
              rows="4"
              required
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="contactMapSection">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.0638410507795!2d-74.2140532!3d40.650523099999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24d4a42597c55%3A0xecff621093733150!2s570%20Maple%20Ave%2C%20Elizabeth%2C%20NJ%2007202!5e0!3m2!1sen!2sus!4v1733440849063!5m2!1sen!2sus"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      </div>
    </>
  );
};

export default ContactUs;




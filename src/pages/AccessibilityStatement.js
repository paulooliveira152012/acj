import React from "react";
import "../styles/style.css";
import Header from "../components/Header";

const AccessibilityStatement = () => {
  return (
    <div className="contentContainer" style={{ paddingTop: "0" }}> 
        <Header className={'blackHeader'}/>
        <div className="session">
      <h1>Accessibility Statement</h1>
      <p>
        At ACJ Auto Repair, we are committed to ensuring that our website is accessible to everyone, including individuals with disabilities. We strive to provide a seamless and user-friendly experience for all visitors.
      </p>
      <h2>Our Efforts</h2>
      <p>
        We are actively working to increase the accessibility and usability of our website, adhering to available standards and guidelines. Our accessibility efforts include, but are not limited to:
      </p>
      <ul>
        <li>Providing text alternatives for non-text content.</li>
        <li>Ensuring that our website is navigable using assistive technologies.</li>
        <li>Maintaining a consistent and clear layout.</li>
        <li>Testing our website regularly to identify and fix accessibility issues.</li>
      </ul>
      <br></br>
      <h2>Need Assistance?</h2>
      <p>
        If you experience any difficulty accessing any part of our website or have feedback on how we can improve our accessibility, please contact us:
      </p>
      <ul>
        <li><strong>Email:</strong> acjautoshop@gmail.com</li>
        <li><strong>Phone:</strong> (908) 527-9734</li>
        <li><strong>Address:</strong> 570 Maple Ave, Elizabeth, NJ 07202</li>
      </ul>
      <br></br>
      <h2>Continuous Improvement</h2>
      <p>
        We understand that accessibility is an ongoing process and are committed to improving it. Your feedback is invaluable to us as we strive to create an inclusive experience for all.
      </p>
      </div>
    </div>
  );
};

export default AccessibilityStatement;

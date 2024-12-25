import React from "react";
import "../styles/style.css";
import Header from "../components/Header";

const PrivacyPolicy = () => {
    return (
        <div className="contentContainer" style={{ paddingTop: "0" }}> 
            <Header className={"blackHeader"}/>
            <div className="session">
            <h1>Privacy Policy</h1>
            <p>
                At <strong>ACJ Auto Repair</strong>, we are committed to protecting the privacy of our customers and website visitors. This Privacy Policy outlines how we collect, use, and safeguard your information when you interact with our services, whether online or in-person.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect the following types of information from you:</p>
            <ul>
                <li>
                    <strong>Personal Information:</strong> Name, email address, phone number, and vehicle details, provided when scheduling an appointment, contacting us, or signing up for services.
                </li>
                <li>
                    <strong>Usage Information:</strong> Information about your interaction with our website, including pages visited, time spent on the site, and browser details.
                </li>
                <li>
                    <strong>Payment Information:</strong> If applicable, payment details are securely collected and processed through trusted third-party services.
                </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>Your information is used to:</p>
            <ul>
                <li>Provide and improve our services, including scheduling and reminders.</li>
                <li>Respond to your inquiries and communicate effectively.</li>
                <li>Send updates, promotions, or service reminders, if you have opted in.</li>
                <li>Analyze website usage to enhance user experience.</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
                We do not sell or rent your personal information to third parties. However, we may share your information with:
            </p>
            <ul>
                <li>Service providers assisting with operations, such as payment processing or email communication.</li>
                <li>
                    Legal authorities, if required to comply with legal obligations or to protect our rights and property.
                </li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
                We implement appropriate technical and organizational measures to safeguard your information against unauthorized access, disclosure, or misuse. Despite these measures, no data transmission over the internet or storage system can be guaranteed 100% secure.
            </p>

            <h2>5. Your Rights</h2>
            <p>As a user of our services, you have the right to:</p>
            <ul>
                <li>Access, update, or delete your personal information.</li>
                <li>Opt out of receiving promotional communications by following the unsubscribe instructions in emails.</li>
                <li>Contact us with questions about your data or to exercise your rights.</li>
            </ul>

            <h2>6. Cookies and Tracking</h2>
            <p>
                Our website may use cookies and similar technologies to enhance user experience and collect data about website usage. You can manage your cookie preferences in your browser settings.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please review this page regularly for updates.
            </p>

            <h2>8. Contact Us</h2>
            <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul>
                <li>Phone: (908) 527-9734</li>
                <li>Email: <a href="mailto:acjautoshop@gmail.com" style={{color: "blue"}}>acjautoshop@gmail.com</a></li>
                <li>Address: 570 Maple Ave, Elizabeth, NJ 07202</li>
            </ul>

            <p>
                By using our website or services, you agree to the terms of this Privacy Policy.
            </p>
        </div>
        </div>
    );
};

export default PrivacyPolicy;

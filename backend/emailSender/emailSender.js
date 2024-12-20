const nodemailer = require("nodemailer");
require("dotenv").config();

// Business details
const BUSINESS_DETAILS = {
  name: "ACJ Auto Repair",
  phone: "(908) 527-9734",
  address: "570 Maple Ave. Elizabeth, NJ 07202",
};

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.COMPANY_EMAIL, // Your email
    pass: process.env.COMPANY_EMAIL_PASSWORD, // Your app-specific password
  },
});

/**
 * Sends a confirmation email for a new appointment.
 * @param {Object} appointmentDetails - Appointment details.
 * @param {string} appointmentDetails.name - Client's name.
 * @param {string} appointmentDetails.email - Client's email.
 * @param {Date} appointmentDetails.date - Appointment date.
 * @param {string} appointmentDetails.time - Appointment time.
 */
const sendAppointmentConfirmationEmail = async (appointmentDetails) => {
  const { name, email, appointment } = appointmentDetails;
  const { date, time } = appointment;

  const mailOptions = {
    from: `${BUSINESS_DETAILS.name} <${process.env.COMPANY_EMAIL}>`,
    to: email,
    subject: "Appointment Confirmation: Car Drop-Off",
    html: `
      <h1>Appointment Confirmation</h1>
      <p>Dear ${name},</p>
      <p>Thank you for scheduling your appointment with <strong>${BUSINESS_DETAILS.name}</strong>.</p>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Date: ${new Date(date).toLocaleDateString()}</li>
        <li>Time: ${time}</li>
        <li>Address: ${BUSINESS_DETAILS.address}</li>
        <li>Phone: ${BUSINESS_DETAILS.phone}</li>
      </ul>
      <p>We look forward to serving you!</p>
      <p>If you have any questions, feel free to contact us.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending confirmation email to ${email}:`, error);
    throw new Error("Failed to send confirmation email.");
  }
};

/**
 * Sends a reminder email for an existing appointment.
 * @param {Object} appointmentDetails - Appointment details.
 * @param {string} appointmentDetails.name - Client's name.
 * @param {string} appointmentDetails.email - Client's email.
 * @param {Date} appointmentDetails.date - Appointment date.
 * @param {string} appointmentDetails.time - Appointment time.
 */
const sendAppointmentReminderEmail = async ({ name, email, date, time }) => {
  const mailOptions = {
    from: `${BUSINESS_DETAILS.name} <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Appointment Reminder: Car Drop-Off",
    html: `
      <h1>Reminder: Car Drop-Off Appointment</h1>
      <p>Dear ${name},</p>
      <p>This is a reminder of your appointment with us at <strong>${BUSINESS_DETAILS.name}</strong>.</p>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Date: ${new Date(date).toLocaleDateString()}</li>
        <li>Time: ${time}</li>
        <li>Address: ${BUSINESS_DETAILS.address}</li>
        <li>Phone: ${BUSINESS_DETAILS.phone}</li>
      </ul>
      <p>Please don't hesitate to contact us if you have any questions.</p>
      <p>We look forward to serving you!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending reminder email to ${email}:`, error);
    throw new Error("Failed to send reminder email.");
  }
};



/**
 * Sends a notification email with the appointment details to the company.
 * @param {Object} appointmentDetails - Appointment details.
 */
const sendFormSubmissionToCompany = async (appointmentDetails) => {
  const companyEmail = process.env.COMPANY_EMAIL || "acjautoshop@gmail.com";

  const mailOptions = {
    from: `${BUSINESS_DETAILS.name} <${process.env.COMPANY_EMAIL}>`,
    to: companyEmail,
    subject: "New Appointment Submission",
    html: `
      <h1>New Appointment Submission</h1>
      <p><strong>Name:</strong> ${appointmentDetails.name}</p>
      <p><strong>Phone:</strong> ${appointmentDetails.phone}</p>
      <p><strong>Email:</strong> ${appointmentDetails.email}</p>
      <p><strong>Car Details:</strong></p>
      <ul>
        <li>Make: ${appointmentDetails.carDetails.make}</li>
        <li>Model: ${appointmentDetails.carDetails.model}</li>
        <li>Year: ${appointmentDetails.carDetails.year}</li>
        <li>License Plate: ${appointmentDetails.carDetails.licensePlate}</li>
      </ul>
      <p><strong>Appointment Details:</strong></p>
      <ul>
        <li>Date: ${new Date(appointmentDetails.appointment.date).toLocaleDateString()}</li>
        <li>Time: ${appointmentDetails.appointment.time}</li>
        <li>Service: ${appointmentDetails.appointment.service}</li>
      </ul>
      <p><strong>Description:</strong> ${appointmentDetails.carDetails.description || "N/A"}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Appointment submission sent to company email: ${companyEmail}`);
  } catch (error) {
    console.error(`Error sending form submission to company email:`, error);
    throw new Error("Failed to send appointment details to the company.");
  }
};

// Funcao para mandar email de feedback apos apontamnto
// apos 1 dia de cada apontamento 


module.exports = {
  sendAppointmentConfirmationEmail,
  sendAppointmentReminderEmail,
  sendFormSubmissionToCompany,
};

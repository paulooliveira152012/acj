const nodemailer = require('nodemailer');

const sendInquiryEmail = async (inquiryData) => {
  const { firstName, lastName, email, phone, description } = inquiryData;

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.COMPANY_EMAIL, // Company email address
      pass: process.env.COMPANY_EMAIL_PASSWORD, // Email password or app-specific password
    },
  });

  // Email to the company
  const companyMailOptions = {
    from: `ACJ Auto Repair <${process.env.COMPANY_EMAIL}>`,
    to: process.env.COMPANY_RECEIVER_EMAIL, // Receiver email (company)
    subject: "New Inquiry Submitted",
    html: `
      <h1>New Inquiry Received</h1>
      <p>A new inquiry has been submitted:</p>
      <ul>
        <li><strong>Name:</strong> ${firstName} ${lastName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Description:</strong> ${description}</li>
      </ul>
    `,
  };

  // Confirmation email to the user
  const userMailOptions = {
    from: `ACJ Auto Repair <${process.env.COMPANY_EMAIL}>`, // Company email
    to: email, // User's email
    subject: "Thank You for Your Inquiry",
    html: `
      <h1>Thank You for Reaching Out</h1>
      <p>Dear ${firstName} ${lastName},</p>
      <p>Thank you for submitting your inquiry. We have received the following details:</p>
      <ul>
        <li><strong>Name:</strong> ${firstName} ${lastName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Description:</strong> ${description}</li>
      </ul>
      <p>We will get back to you as soon as possible. Please do not reply to this email.</p>
      <p>Best regards,<br>ACJ Auto Repair</p>
    `,
  };

  try {
    // Send email to the company
    await transporter.sendMail(companyMailOptions);
    console.log('Inquiry email sent to the company');

    // Send confirmation email to the user
    await transporter.sendMail(userMailOptions);
    console.log('Confirmation email sent to the user');
  } catch (error) {
    console.error('Error sending emails:', error);
    throw new Error('Email sending failed');
  }
};

module.exports = sendInquiryEmail;

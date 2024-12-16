const cron = require("node-cron");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const Appointment = require("../schemas/Costumer"); // Your Mongoose model
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB emailSender"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if connection fails
  });

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
    user: "acjautoshop@gmail.com", // Your email
    pass: "cysb pajc qpuh xroj", // Your app-specific password
  },
});

console.log("Setting up cron jobs...");

// Cron job to run every day at 7:50 PM
cron.schedule("08 20 * * *", async () => {
  console.log("Running email reminder job at 7:50 PM...");

  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Start of the day

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(tomorrow.getDate() + 1);


    // Query customers collection for appointments scheduled for tomorrow
    console.log(
      `Searching for appointments between: ${tomorrow} and ${dayAfterTomorrow}`
    );
    const appointments = await Appointment.find({
      "appointment.date": {
        $gte: tomorrow, // Greater than or equal to the start of tomorrow
        $lt: dayAfterTomorrow, // Less than the start of the day after tomorrow
      },
    });

    console.log("Inspecting appointments:", appointments);
    appointments.forEach((appt) => {
      console.log(`Name: ${appt.name}, Email: ${appt.email}`);
    });

    console.log("Appointments found:", appointments);

    if (appointments.length === 0) {
      console.log("No appointments scheduled for tomorrow.");
      return;
    }

    // Send reminder emails
    for (const appt of appointments) {
      try {
        const mailOptions = {
          from: `${BUSINESS_DETAILS.name} <acjautoshop@gmail.com>`,
          to: appt.email, // Client's email
          subject: "Appointment Reminder: Car Drop-Off",
          html: `
            <h1>Reminder: Car Drop-Off Appointment</h1>
            <p>Dear ${appt.name},</p>
            <p>This is a reminder of your appointment with us at <strong>${BUSINESS_DETAILS.name}</strong>.</p>
            <p><strong>Details:</strong></p>
            <ul>
              <li>Date: ${new Date(appt.appointment.date).toLocaleDateString()}</li>
              <li>Time: ${appt.appointment.time}</li>
              <li>Address: ${BUSINESS_DETAILS.address}</li>
              <li>Phone: ${BUSINESS_DETAILS.phone}</li>
            </ul>
            <p>Please don't hesitate to contact us if you have any questions.</p>
            <p>We look forward to serving you!</p>
          `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log(`Reminder email sent to ${appt.email}`);
      } catch (emailError) {
        console.error(`Error sending email to ${appt.email}:`, emailError);
      }
    }
  } catch (error) {
    console.error("Error during the email reminder job:", error);
  }
});

// Ensure MongoDB connection closes properly on app termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination.");
  process.exit(0);
});

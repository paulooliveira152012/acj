const cron = require("node-cron");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const Appointment = require("./schemas/Costumer"); // Your Mongoose model
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Business details
const BUSINESS_DETAILS = {
  name: "ACJ Auto Repair ",
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

// Cron job to run every day at 3 PM
cron.schedule("0 15 * * *", async () => {
  console.log("Running email reminder job at 3 PM...");
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Start of the day

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

    // Log all appointments in the database
    const allAppointments = await Appointment.find({});
    console.log("All appointments in the database:", allAppointments);

    // Query costumers collection for appointments scheduled for tomorrow
    console.log(`Searching for appointments between: ${tomorrow} and ${dayAfterTomorrow}`);
    const appointments = await Appointment.find({
      "appointment.date": {
        $gte: tomorrow, // Greater than or equal to the start of tomorrow
        $lt: dayAfterTomorrow, // Less than the start of the day after tomorrow
      },
    });

    if (appointments.length === 0) {
      console.log("No appointments scheduled for tomorrow.");
      return;
    }

    // Send reminder emails
    for (const appt of appointments) {
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
    }
  } catch (error) {
    console.error("Error sending reminder emails:", error);
  } finally {
    // Properly close the MongoDB connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
});

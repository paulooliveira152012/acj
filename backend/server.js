// Import express, the framework for server and API's requests
const express = require("express");
// Import mongoose
const mongoose = require("mongoose");
// Import dotenv to use environment variables
require("dotenv").config();
// Import router
const appointmentRouter = require("./routes/appointments");
const adminRouter = require("./routes/adm");
const newInquiry = require("./routes/inquiry");
// Import cors
const cors = require("cors");
// serve frontend
const path = require("path");

// Implement express
const app = express();

// Allow CORS
app.use(cors());
console.log("CORS is enabled");

// Use express
app.use(express.json());

// MongoConnection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));


app.use("/api/appointments", appointmentRouter);
app.use("/api/admin", adminRouter); // Routes for admin login
app.use("/api/inquiry", newInquiry);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build"))); // Corrected path to 'build' directory

   // Handle all other requests by serving the React frontend (for client-side routing)
   app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });

} else {
  app.get("/", (req, res) => res.send("Wasn't able to find serving files"));
}

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Import the email sender cron job
require("./emailSender/emailSender");

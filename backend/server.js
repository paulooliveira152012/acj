// import express, the framework for server and API's requests 
const express = require('express');
// import mongoose
const mongoose = require("mongoose");
// import dontenv to use environment variables
require('dotenv').config()
// import router
const appointmentRouter = require('./routes/appointments')
const adminRouter = require('./routes/adm');
// import cors
const cors = require('cors')


// implemente express
const app = express();

// allow CORS
app.use(cors());

// use express
app.use(express.json());

// MongoConnection
mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDb'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

app.use('/api/appointments', appointmentRouter)
app.use('/api/admin', adminRouter); // Routes for admin login
app.get('/', (req, res) => res.send('Welcome to the Mechanic Shop API'));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

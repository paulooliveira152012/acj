// import express, the framework for server and API's requests 
const express = require('express');
// import mongoose
const mongoose = require("mongoose");
// import dontenv to use environment variables
require('dotenv').config()
// import router
const appointmentRouter = require('./routes/appointments')

// implemente express
const app = express();

// use express
app.use(express.json());

// MongoConnection
mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDb'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

app.use('/api/appointments', appointmentRouter)
app.get('/', (req, res) => res.send('Welcome to the Mechanic Shop API'));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

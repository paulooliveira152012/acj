const mongoose = require('mongoose');

const costumerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false, // Optional, as not everyone may provide an email
    },
    carDetails: {
        make: { type: String, required: true }, // e.g., "Toyota"
        model: { type: String, required: true }, // e.g., "Corolla"
        year: { type: Number, required: true }, // e.g., 2018
        licensePlate: { type: String, required: true },
    },
    appointment: {
        date: { type: Date, required: true }, // Date and time of the appointment
        time: { type: String, required: true }, // Ensure the time field is explicitly defined
        service: { type: String, required: true }, // Service type, e.g., "Oil Change"
        notes: { type: String, required: false }, // Optional notes
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Costumer', costumerSchema);

const express = require('express');
const router = express.Router();
const Client = require('../schemas/Costumer'); // Import User model (correct name)

// Add a new appointment
router.post('/', async (req, res) => {
    try {
        const { name, phone, email, carDetails, appointment } = req.body;

        // Validate required fields
        if (!name || !phone || !carDetails || !appointment) {
            return res.status(400).json({ message: 'All required fields must be filled' });
        }

        const newAppointment = new Client({
            name,
            phone,
            email,
            carDetails,
            appointment,
        });

        const savedNewAppointment = await newAppointment.save();
        res.status(201).json(savedNewAppointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get appointments for a specific date
router.get('/:date', async (req, res) => {
    try {
        const date = new Date(req.params.date);

        // Find appointments on the given date
        const appointments = await Client.find({
            'appointment.date': {
                $gte: new Date(date.setHours(0, 0, 0)),
                $lt: new Date(date.setHours(23, 59, 59)),
            },
        });

        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Test Route (Optional)
router.post('/test', (req, res) => {
    const data = req.body;
    res.send(`You sent: ${JSON.stringify(data)}`);
});

module.exports = router;

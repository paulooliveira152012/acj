const express = require('express');
const router = express.Router();
const Form = require('../schemas/Form.js'); // Import the Mongoose schema
const sendInquiryEmail = require('../emailSender/inquiries.js')

// Route
router.post('/newInquiry', async (req, res) => {
  console.log('Route for new inquiry reached');
  try {
    const { firstName, lastName, email, phone, description, make, model, year } = req.body;

    console.log('Received Data:', { firstName, lastName, email, phone, description, make, model, year });

    // Validate required fields
    if (!firstName || !lastName || !phone || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log("info validated, creating new document")

    // Create a new inquiry document
    const newInquiry = new Form({
      firstName,
      lastName,
      email,
      phone,
      description,
      make,
      model,
      year
    });

    console.log("document created")

    console.log("saving new inquiry")
    // Save the document to the database
    await newInquiry.save();

    console.log("sending email with inquiry details")
     // Send the inquiry email
     await sendInquiryEmail({ firstName, lastName, email, phone, make, model, year, description });
     console.log("email sent")
    // Respond with success
    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: newInquiry });
  } catch (err) {
    console.error('Error in backend:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Staff = require('../schemas/Staff'); // Import Staff model
const bcrypt = require('bcrypt'); // For password hashing and verification
const jwt = require('jsonwebtoken'); // For generating authentication tokens

// Secret for JWT (store securely, e.g., in .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'fchdbvdbaldkvbkaehdkv';

// Route to create a new administrator
router.post('/create-admin', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username already exists
        const existingAdmin = await Staff.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new admin
        const newAdmin = new Staff({
            username,
            password: hashedPassword,
        });

        // Save the admin to the database
        await newAdmin.save();
        res.status(201).json({ message: 'Administrator created successfully' });
    } catch (err) {
        console.error('Error creating administrator:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Admin login route
router.post('/login', async (req, res) => {
    console.log("Route reached");
    const { username, password } = req.body;

    try {
        console.log("Trying to find user in the 'staff' collection...");
        const staff = await Staff.findOne({ username });
        console.log("MongoDB query result:", staff);

        if (!staff) {
            console.log("User not found");
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        console.log("Checking password...");
        const isPasswordValid = await bcrypt.compare(password, staff.password);
        console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: staff._id, username: staff.username }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error("Error during admin login:", err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/test-password', async (req, res) => {
    const { password } = req.body;

    // Hashed password from the database
    const hashedPassword = "$2b$10$XhpcgqT.L3/hDl5/8s7InuOr9OV/XtHCc2v5y/IJJ33I.BjrHhyEC";

    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        res.json({ isMatch });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;






// db.staff.insertOne({
//     username: "administrator",
//     password: "$2b$10$$2b$10$dq1MlzGIjmFagBvJ/55rc.pMMWzAsCPO3Ob8AkABYTgarVN2t6Bja", 
// })

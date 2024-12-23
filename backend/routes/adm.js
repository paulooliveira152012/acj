const express = require('express');
const router = express.Router();
const Staff = require('../schemas/Staff'); // Import Staff model
const bcrypt = require('bcryptjs'); // Temporarily commenting out bcrypt
const jwt = require('jsonwebtoken'); // For generating authentication tokens

// Secret for JWT (store securely in .env file)
const JWT_SECRET = process.env.JWT_SECRET;

// Route to create a new administrator
router.post('/create-admin', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username already exists
        const existingAdmin = await Staff.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

         // Hash the password using bcrypt
         const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

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

router.get("/verify-token", (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }
  
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ message: "Token is valid." });
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token." });
    }
  });
  

// Admin login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const staff = await Staff.findOne({ username });

        if (!staff) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Use bcrypt to compare the password
        const isPasswordValid = await bcrypt.compare(password, staff.password);

        if (!isPasswordValid) {
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



// Test password route
router.post('/test-password', async (req, res) => {
    const { password } = req.body;

    const hashedPassword = "$2a$10$XhpcgqT.L3/hDl5/8s7InuOr9OV/XtHCc2v5y/IJJ33I.BjrHhyEC";

    try {
        // Temporarily compare password directly without bcrypt
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

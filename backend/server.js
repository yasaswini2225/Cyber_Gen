// ----------------------------------------------------
// server.js - Backend REST APIs for Cyber Security Courses
// ----------------------------------------------------

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import our MySQL database pool
const db = require('./config/db');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so the frontend can interact with this backend across different ports
app.use(cors());

// Enable parsing of JSON body data (incoming POST/PUT requests)
app.use(express.json());

// ----------------------------------------------------
// 1. HEALTH CHECK & HOME ROUTE
// ----------------------------------------------------
app.get('/', (req, res) => {
    res.send('<h1>Cyber Security Courses Backend API is running! 🌐</h1><p>Use /api/courses to fetch courses.</p>');
});

// ----------------------------------------------------
// 2. COURSE REST APIs
// ----------------------------------------------------

// Route to fetch ALL courses from the database
app.get('/api/courses', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM courses');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed' });
    }
});

// Route to fetch 3 FEATURED courses for the Home Page
app.get('/api/courses/featured', async (req, res) => {
    try {
        // Retrieve only 3 courses to showcase on the landing page
        const result = await db.query('SELECT * FROM courses LIMIT 3');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching featured courses:', err.message);
        res.status(500).json({ error: 'Failed to retrieve featured courses' });
    }
});

// ----------------------------------------------------
// 3. USER AUTHENTICATION APIs
// ----------------------------------------------------

// Route for User Registration (Sign Up)
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Simple Server-Side Input Validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please enter all fields (Name, Email, Password)' });
    }

    try {
        // Check if the user already exists in the database
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email already registered. Please login.' });
        }

        // Secure password hashing
        // This takes the plain text password and scrambles it into a long hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: 'User registered successfully!',
            user: {
                id: result.insertId,
                name: name,
                email: email
            }
        });
    } catch (err) {
        console.error('Signup error:', err.message);
        res.status(500).json({ error: 'Server error during registration. Please try again.' });
    }
});

// Route for User Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    // Server-Side Input Validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter both Email and Password' });
    }

    try {
        // Lookup user by email
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid Email or Password' });
        }

        const user = users[0];

        // Compare the submitted password with the hashed password in the DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Email or Password' });
        }

        // Success: Login successful
        // In a complex app, we might issue a JWT token, but to keep things simple and beginner-friendly,
        // we'll return user details (name, email) which the frontend will save in localStorage.
        res.json({
            message: 'Login successful!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Server error during login. Please try again.' });
    }
});

// ----------------------------------------------------
// 4. CONTACT FORM API
// ----------------------------------------------------

// Route to submit Contact Messages
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Please fill in all contact fields' });
    }

    // A mock API to log submissions on the terminal (simulating an inbox)
    console.log('\n=======================================');
    console.log('📬 NEW CONTACT FORM SUBMISSION DEPOSITED:');
    console.log('---------------------------------------');
    console.log(`From: ${name} (${email})`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: "${message}"`);
    console.log('=======================================\n');

    res.json({ message: 'Thank you! Your message has been received on the server log.' });
});

// ----------------------------------------------------
// 5. SERVER RUN
// ----------------------------------------------------
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`👉 Home API: http://localhost:${PORT}/`);
    console.log(`👉 Courses API: http://localhost:${PORT}/api/courses`);
});

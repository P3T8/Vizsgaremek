import express from 'express';
import { pool } from './db.js';
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating JWT tokens

const tanar = express.Router();

// E-mail validation
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Get all teachers
tanar.get("/", async (req, res) => {
    try {
        const [tanarok] = await pool.query('SELECT * FROM tanar');
        res.json(tanarok);
    } catch (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ error: 'Database query error' });
    }
});

// Get a specific teacher by ID
tanar.get("/:id", async (req, res) => {
    let { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid or missing ID" });
    }

    try {
        const [tanar] = await pool.query('SELECT * FROM tanar WHERE tanar_id = ?', [id]);

        tanar.length > 0 ? res.json(tanar[0]) : res.status(404).json({ error: "Teacher not found" });
    } catch (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ error: 'Database query error', details: err.message });
    }
});

// Register a new teacher
tanar.post("/", async (req, res) => {
    const { t_nev, email, password } = req.body;

    if (!t_nev || !email || !password) {
        return res.status(400).json({ error: "Missing data: t_nev, email, and password are required" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email address" });
    }

    try {
        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Assuming the database auto-increments the ID
        await pool.query(
            'INSERT INTO tanar (t_nev, email, jelszo) VALUES (?, ?, ?)',  // Replaced 'password' with 'jelszo'
            [t_nev, email, hashedPassword]
        );

        res.status(201).json({ t_nev, email }); // Return the newly registered teacher data
    } catch (err) {
        console.error("Error inserting into database:", err.message);
        res.status(500).json({ error: 'Error inserting into database', details: err.message });
    }
});

// Update teacher information
tanar.put("/:tanar_id", async (req, res) => {
    const { tanar_id } = req.params;
    const { t_nev } = req.body;

    if (!tanar_id || isNaN(tanar_id)) {
        return res.status(400).json({ error: "Invalid or missing tanar_id" });
    }

    if (!t_nev) {
        return res.status(400).json({ error: "Missing data: t_nev is required" });
    }

    try {
        const [result] = await pool.query('UPDATE tanar SET t_nev = ? WHERE tanar_id = ?', [t_nev, tanar_id]);

        if (result.affectedRows > 0) {
            res.json({ tanar_id, t_nev });
        } else {
            res.status(404).json({ error: "Teacher not found" });
        }
    } catch (err) {
        console.error("Error updating database:", err.message);
        res.status(500).json({ error: 'Error updating database', details: err.message });
    }
});

// Delete a teacher
tanar.delete("/:tanar_id", async (req, res) => {
    const { tanar_id } = req.params;

    if (!tanar_id || isNaN(tanar_id)) {
        return res.status(400).json({ error: "Invalid or missing tanar_id" });
    }

    try {
        const [result] = await pool.query('DELETE FROM tanar WHERE tanar_id = ?', [tanar_id]);

        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Teacher not found" });
        }
    } catch (err) {
        console.error("Error deleting from database:", err.message);
        res.status(500).json({ error: 'Error deleting from database', details: err.message });
    }
});

// Login (auth) - Based on email and password
tanar.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing data: email and password are required" });
    }

    try {
        // Find the user by email
        const [users] = await pool.query('SELECT * FROM tanar WHERE email = ?', [email]);

        if (users.length > 0) {
            const user = users[0];

            // Compare the password using bcrypt
            const isMatch = await bcrypt.compare(password, user.jelszo);  // Replaced 'password' with 'jelszo'

            if (isMatch) {
                // Generate JWT token on successful login
                const token = jwt.sign({ tanar_id: user.tanar_id, email: user.email }, 'your_jwt_secret_key', { expiresIn: '1h' });

                res.status(200).json({ message: "Login successful!", token });
            } else {
                res.status(400).json({ error: "Invalid password" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ error: 'Login error', details: err.message });
    }
});

export default tanar;

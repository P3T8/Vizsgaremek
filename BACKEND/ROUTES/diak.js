import express from 'express';
import { pool } from './db.js';
import bcrypt from 'bcryptjs'; // Jelszó hash-eléséhez
import jwt from 'jsonwebtoken'; // JSON Web Token generálása
import validator from 'validator'; // Email validáláshoz

const diak = express.Router();

// E-mail validálás
const isValidEmail = (email) => validator.isEmail(email);

// Minden diák lekérése
diak.get("/", async (req, res) => {
    try {
        const [diakok] = await pool.query('SELECT * FROM diak');
        res.json(diakok);
    } catch (err) {
        console.error("Hiba az adatbázis lekérdezése során:", err);
        res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során' });
    }
});

// Egy adott diák lekérése
diak.get("/:id", async (req, res) => {
    let { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó ID" });
    }

    try {
        const [diak] = await pool.query('SELECT * FROM diak WHERE diak_id = ?', [id]);

        diak.length > 0 ? res.json(diak[0]) : res.status(404).json({ error: "Diák nem található" });
    } catch (err) {
        console.error("Hiba az adatbázis lekérdezése során:", err);
        res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során', details: err.message });
    }
});

// Diák létrehozása (regisztráció)
diak.post("/", async (req, res) => {
    const { d_nev, email, password } = req.body;

    if (!d_nev || !email || !password) {
        return res.status(400).json({ error: "Hiányzó adatok: d_nev, email és password szükséges" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Érvénytelen email cím" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO diak (d_nev, email, jelszo) VALUES (?, ?, ?)',
            [d_nev, email, hashedPassword]
        );

        res.status(201).json({ d_nev, email });
    } catch (err) {
        console.error("Hiba az adatbázis beszúrása során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis beszúrása során', details: err.message });
    }
});

// Diák módosítása
diak.put("/:diak_id", async (req, res) => {
    const { diak_id } = req.params;
    const { d_nev } = req.body;

    if (!diak_id || isNaN(diak_id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó diak_id" });
    }

    if (!d_nev) {
        return res.status(400).json({ error: "Hiányzó adat: d_nev szükséges" });
    }

    try {
        const [result] = await pool.query('UPDATE diak SET d_nev = ? WHERE diak_id = ?', [d_nev, diak_id]);

        if (result.affectedRows > 0) {
            res.json({ diak_id, d_nev });
        } else {
            res.status(404).json({ error: "Diák nem található" });
        }
    } catch (err) {
        console.error("Hiba az adatbázis frissítése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis frissítése során', details: err.message });
    }
});

// Diák törlése
diak.delete("/:diak_id", async (req, res) => {
    const { diak_id } = req.params;

    if (!diak_id || isNaN(diak_id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó diak_id" });
    }

    try {
        const [result] = await pool.query('DELETE FROM diak WHERE diak_id = ?', [diak_id]);

        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Diák nem található" });
        }
    } catch (err) {
        console.error("Hiba az adatbázis törlése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis törlése során', details: err.message });
    }
});

// Bejelentkezés (auth)
diak.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Hiányzó adatok: email és password szükséges" });
    }

    try {
        const [users] = await pool.query('SELECT * FROM diak WHERE email = ?', [email]);

        if (users.length > 0) {
            const user = users[0];
            const isMatch = await bcrypt.compare(password, user.jelszo);

            if (isMatch) {
                const JWT_SECRET = process.env.JWT_SECRET || 'valamiTitkosKulcs'; // Titkos kulcs

                const token = jwt.sign(
                    { diak_id: user.diak_id, email: user.email },
                    JWT_SECRET,  // Használjuk a titkos kulcsot
                    { expiresIn: '1h' }
                );
                return res.status(200).json({
                    success: true,
                    message: "Bejelentkezés sikeres!",
                    token
                });
            } else {
                return res.status(401).json({
                    success: false,
                    error: "Hibás jelszó vagy email"
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                error: "Felhasználó nem található"
            });
        }
    } catch (err) {
        console.error("Bejelentkezési hiba:", err.message);
        return res.status(500).json({
            error: "Bejelentkezési hiba",
            details: err.message
        });
    }
});

export default diak;

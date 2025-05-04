import express from 'express';
import { pool } from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const tanar = express.Router();

const isValidEmail = (email) => validator.isEmail(email);

// Bejelentkezés (auth)
tanar.post("/login", async (req, res) => {
    const { email, jelszo } = req.body;

console.log("Bejelentkezési kísérlet:", { email, jelszo: jelszo });
    if (!email || !jelszo) {
        return res.status(400).json({ error: "Hiányzó adatok: email és jelszo szükséges" });
    }

    try {
        const trimmedEmail = email.trim();
        console.log("Bejelentkezési kérés emaillel:", trimmedEmail);
        const [users] = await pool.query('SELECT * FROM tanar WHERE email = ?', [trimmedEmail]);

        if (users.length > 0) {
            const user = users[0];
            console.log("Felhasználó adatai:", { tanar_id: user.tanar_id, email: user.email });

            // Ellenőrizd, hogy a jelszo mező nem üres-e
            if (!user.jelszo) {
                console.error("Hiba: A felhasználó jelszó mezője üres az adatbázisban");
                return res.status(500).json({ error: "Szerveroldali hiba: érvénytelen jelszó tárolás" });
            }

            //const isMatch = await bcrypt.compare(jelszo, user.jelszo);
            const isMatch = jelszo == user.jelszo;

            console.log("Jelszó egyezés:", isMatch);

            if (isMatch) {
                const JWT_SECRET = process.env.JWT_SECRET || 'valamiTitkosKulcs';
                const token = jwt.sign(
                    { tanar_id: user.tanar_id, email: user.email },
                    JWT_SECRET, 
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
                    error: "Hibás jelszó"
                });
            }
        } else {
            console.log("Felhasználó nem található emaillel:", trimmedEmail);
            return res.status(404).json({
                success: false,
                error: "Felhasználó nem található"
            });
        }
    } catch (err) {
        console.error("Bejelentkezési hiba:", {
            message: err.message,
            stack: err.stack
        });
        return res.status(500).json({
            error: "Bejelentkezési hiba",
            details: err.message
        });
    }
});
  

// Minden tanár lekérése
tanar.get("/", async (req, res) => {
    try {
        const [tanarok] = await pool.query('SELECT * FROM tanar');
        res.json(tanarok);
    } catch (err) {
        console.error("Hiba az adatbázis lekérdezése során:", err);
        res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során' });
    }
});

// Egy adott tanár lekérése
tanar.get("/:id", async (req, res) => {
    let { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó ID" });
    }

    try {
        const [tanarok] = await pool.query('SELECT * FROM tanar WHERE tanar_id = ?', [id]);

        tanarok.length > 0 ? res.json(tanarok[0]) : res.status(404).json({ error: "Tanár nem található" });
    } catch (err) {
        console.error("Hiba az adatbázis lekérdezése során:", err);
        res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során', details: err.message });
    }
});

// Tanár létrehozása (regisztráció)
tanar.post("/", async (req, res) => {
    const { t_nev, email, jelszo } = req.body;

    if (!t_nev || !email || !jelszo) {
        return res.status(400).json({ error: "Hiányzó adatok: t_nev, email és jelszo szükséges" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Érvénytelen email cím" });
    }

    try {
        const hashedjelszo = await bcrypt.hash(jelszo, 10);

        await pool.query(
            'INSERT INTO tanar (t_nev, email, jelszo) VALUES (?, ?, ?)',
            [t_nev, email, hashedjelszo]
        );

        res.status(201).json({ t_nev, email });
    } catch (err) {
        console.error("Hiba az adatbázis beszúrása során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis beszúrása során', details: err.message });
    }
});

// Tanár módosítása
tanar.put("/:tanar_id", async (req, res) => {
    const { tanar_id } = req.params;
    const { t_nev } = req.body;

    if (!tanar_id || isNaN(tanar_id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó tanar_id" });
    }

    if (!t_nev) {
        return res.status(400).json({ error: "Hiányzó adat: t_nev szükséges" });
    }

    try {
        const [result] = await pool.query('UPDATE tanar SET t_nev = ? WHERE tanar_id = ?', [t_nev, tanar_id]);

        if (result.affectedRows > 0) {
            res.json({ tanar_id, t_nev });
        } else {
            res.status(404).json({ error: "Tanár nem található" });
        }
    } catch (err) {
        console.error("Hiba az adatbázis frissítése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis frissítése során', details: err.message });
    }
});

// Tanár törlése
tanar.delete("/:tanar_id", async (req, res) => {
    const { tanar_id } = req.params;

    if (!tanar_id || isNaN(tanar_id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó tanar_id" });
    }

    try {
        const [result] = await pool.query('DELETE FROM tanar WHERE tanar_id = ?', [tanar_id]);

        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Tanár nem található" });
        }
    } catch (err) {
        console.error("Hiba az adatbázis törlése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis törlése során', details: err.message });
    }
});

export default tanar;

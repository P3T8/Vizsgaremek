import express from 'express';
import { pool } from './db.js';
import bcrypt from 'bcryptjs'; // Jelszó hash-eléséhez

const diak = express.Router();

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

    try {
        const username = d_nev; // Automatikus username d_nev alapján

        // Jelszó hash-elése bcrypt-tel
        const hashedPassword = await bcrypt.hash(password, 10);

        // Feltételezve, hogy az adatbázis auto-incrementálja az ID-t
        await pool.query(
            'INSERT INTO diak (d_nev, email, username, password) VALUES (?, ?, ?, ?)', 
            [d_nev, email, username, hashedPassword]
        );

        res.status(201).json({ d_nev, email, username }); // Az új regisztráció visszaadása
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
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Hiányzó adatok: username és password szükséges" });
    }

    try {
        // Keresés a felhasználó adataink alapján
        const [users] = await pool.query('SELECT * FROM diak WHERE username = ?', [username]);

        if (users.length > 0) {
            const user = users[0];

            // Jelszó ellenőrzése bcrypt-tel
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // Sikeres bejelentkezés esetén visszaküldjük a felhasználót (pl. token)
                res.status(200).json({ message: "Bejelentkezés sikeres!", diak_id: user.diak_id, username: user.username });
            } else {
                res.status(400).json({ error: "Hibás jelszó" });
            }
        } else {
            res.status(404).json({ error: "Felhasználó nem található" });
        }
    } catch (err) {
        console.error("Bejelentkezési hiba:", err.message);
        res.status(500).json({ error: 'Bejelentkezési hiba', details: err.message });
    }
});

export default diak;

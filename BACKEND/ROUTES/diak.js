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
    const { diak_id, d_nev, email, username, password } = req.body;

    if (!diak_id || !d_nev || !email || !username || !password) {
        return res.status(400).json({ error: "Hiányzó adatok: diak_id, d_nev, email, username és password szükséges" });
    }

    if (isNaN(diak_id)) {
        return res.status(400).json({ error: "diak_id érvénytelen (számnak kell lennie)" });
    }

    try {
        // Jelszó hash-elése bcrypt-tel
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO diak (diak_id, d_nev, email, username, password) VALUES (?, ?, ?, ?, ?)', 
                         [diak_id, d_nev, email, username, hashedPassword]);
        
        res.status(201).json({ diak_id, d_nev, email, username });
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

export default diak;

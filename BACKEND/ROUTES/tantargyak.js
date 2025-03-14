import express from 'express';
import { pool } from './db.js';

const tantargyak = express.Router();

// Minden tantárgy lekérése
tantargyak.get("/", async (req, res) => {
    try {
        const [tantargyakak] = await pool.query('SELECT * FROM tantargyak');
        res.json(tantargyakak);
    } catch (err) {
        console.error("Hiba az adatbázis lekérdezése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során', details: err.message });
    }
});

// Egy adott tantárgy lekérése ID alapján
tantargyak.get("/:tantargy_id", async (req, res) => {
    const { tantargy_id } = req.params;

    if (!tantargy_id || isNaN(tantargy_id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó tantargy_id" });
    }

    try {
        const [tantargyakData] = await pool.query('SELECT * FROM tantargyak WHERE tantargy_id = ?', [tantargy_id]);

        tantargyakData.length > 0 
            ? res.json(tantargyakData[0]) 
            : res.status(404).json({ error: "Tantárgy nem található" });
    } catch (err) {
        console.error("Hiba az adatbázis lekérdezése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során', details: err.message });
    }
});

// Tantárgy létrehozása
tantargyak.post("/", async (req, res) => {
    const { tantargy_id, tantargy_nev } = req.body;

    if (!tantargy_id || isNaN(tantargy_id) || !tantargy_nev) {
        return res.status(400).json({ error: "Hiányzó vagy érvénytelen adatok: tantargy_id (szám) és tantargy_nev szükséges" });
    }

    try {
        await pool.query('INSERT INTO tantargyak (tantargy_id, tantargy_nev) VALUES (?, ?)', [tantargy_id, tantargy_nev]);
        res.status(201).json({ tantargy_id, tantargy_nev });
    } catch (err) {
        console.error("Hiba az adatbázis beszúrása során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis beszúrása során', details: err.message });
    }
});

// Tantárgy módosítása
tantargyak.put("/:tantargy_id", async (req, res) => {
    const { tantargy_id } = req.params;
    const { tantargy_nev } = req.body;

    if (!tantargy_id || isNaN(tantargy_id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó tantargy_id" });
    }

    if (!tantargy_nev) {
        return res.status(400).json({ error: "Hiányzó adat: tantargy_nev szükséges" });
    }

    try {
        const [result] = await pool.query('UPDATE tantargyak SET tantargy_nev = ? WHERE tantargy_id = ?', [tantargy_nev, tantargy_id]);

        result.affectedRows > 0 
            ? res.json({ tantargy_id, tantargy_nev }) 
            : res.status(404).json({ error: "Tantárgy nem található" });
    } catch (err) {
        console.error("Hiba az adatbázis frissítése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis frissítése során', details: err.message });
    }
});

// Tantárgy törlése
tantargyak.delete("/:tantargy_id", async (req, res) => {
    const { tantargy_id } = req.params;

    if (!tantargy_id || isNaN(tantargy_id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó tantargy_id" });
    }

    try {
        const [result] = await pool.query('DELETE FROM tantargyak WHERE tantargy_id = ?', [tantargy_id]);

        result.affectedRows > 0 
            ? res.status(204).send() 
            : res.status(404).json({ error: "Tantárgy nem található" });
    } catch (err) {
        console.error("Hiba az adatbázis törlése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis törlése során', details: err.message });
    }
});

export default tantargyak;

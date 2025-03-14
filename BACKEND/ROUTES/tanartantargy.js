import express from 'express';
import { pool } from './db.js';

const tanartantargy = express.Router();

// Minden tanár-tantárgy kapcsolat lekérése
tanartantargy.get("/", async (req, res) => {
    try {
        const [tanartantargyak] = await pool.query('SELECT * FROM tanartantargy');
        res.json(tanartantargyak);
    } catch (err) {
        console.error("Hiba az adatbázis lekérdezése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során', details: err.message });
    }
});

// Egy adott tanár-tantárgy kapcsolat lekérése ID alapján
tanartantargy.get("/:tanar_id/:tantargy_id", async (req, res) => {
    const { tanar_id, tantargy_id } = req.params;

    if (!tanar_id || isNaN(tanar_id) || !tantargy_id || isNaN(tantargy_id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó tanar_id és tantargy_id" });
    }

    try {
        const [tanartantargyData] = await pool.query(
            'SELECT * FROM tanartantargy WHERE tanar_id = ? AND tantargy_id = ?', 
            [tanar_id, tantargy_id]
        );

        tanartantargyData.length > 0 
            ? res.json(tanartantargyData[0]) 
            : res.status(404).json({ error: "Tanár-tantárgy kapcsolat nem található" });
    } catch (err) {
        console.error("Hiba az adatbázis lekérdezése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során', details: err.message });
    }
});

// Tanár-tantárgy kapcsolat létrehozása
tanartantargy.post("/", async (req, res) => {
    const { tanar_id, tantargy_id } = req.body;

    if (!tanar_id || isNaN(tanar_id) || !tantargy_id || isNaN(tantargy_id)) {
        return res.status(400).json({ error: "Hiányzó vagy érvénytelen tanar_id és tantargy_id" });
    }

    try {
        await pool.query('INSERT INTO tanartantargy (tanar_id, tantargy_id) VALUES (?, ?)', [tanar_id, tantargy_id]);
        res.status(201).json({ tanar_id, tantargy_id });
    } catch (err) {
        console.error("Hiba az adatbázis beszúrása során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis beszúrása során', details: err.message });
    }
});

// Tanár-tantárgy kapcsolat módosítása
tanartantargy.put("/:tanar_id/:tantargy_id", async (req, res) => {
    const { tanar_id, tantargy_id } = req.params;
    const { uj_tantargy_id } = req.body;

    if (!tanar_id || isNaN(tanar_id) || !tantargy_id || isNaN(tantargy_id) || !uj_tantargy_id || isNaN(uj_tantargy_id)) {
        return res.status(400).json({ error: "Hiányzó vagy érvénytelen ID-k" });
    }

    try {
        const [result] = await pool.query(
            'UPDATE tanartantargy SET tantargy_id = ? WHERE tanar_id = ? AND tantargy_id = ?', 
            [uj_tantargy_id, tanar_id, tantargy_id]
        );

        result.affectedRows > 0 
            ? res.json({ tanar_id, uj_tantargy_id }) 
            : res.status(404).json({ error: "Tanár-tantárgy kapcsolat nem található" });
    } catch (err) {
        console.error("Hiba az adatbázis frissítése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis frissítése során', details: err.message });
    }
});

// Tanár-tantárgy kapcsolat törlése
tanartantargy.delete("/:tanar_id/:tantargy_id", async (req, res) => {
    const { tanar_id, tantargy_id } = req.params;

    if (!tanar_id || isNaN(tanar_id) || !tantargy_id || isNaN(tantargy_id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó tanar_id és tantargy_id" });
    }

    try {
        const [result] = await pool.query('DELETE FROM tanartantargy WHERE tanar_id = ? AND tantargy_id = ?', [tanar_id, tantargy_id]);

        result.affectedRows > 0 
            ? res.status(204).send() 
            : res.status(404).json({ error: "Tanár-tantárgy kapcsolat nem található" });
    } catch (err) {
        console.error("Hiba az adatbázis törlése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis törlése során', details: err.message });
    }
});

export default tanartantargy;

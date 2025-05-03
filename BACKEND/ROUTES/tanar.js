import express from 'express';
import { pool } from './db.js';
import bcrypt from 'bcryptjs'; // Jelszó hash-eléséhez

const tanar = express.Router();

// Minden tanár lekérése
tanar.get("/", async (req, res) => {
    try {
        const [tanarok] = await pool.query('SELECT * FROM tanar');
        res.json(tanarok);
    } catch (err) {
        console.error("Hiba az adatbázis lekérdezése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során', details: err.message });
    }
});

// Egy adott tanár lekérése ID alapján
tanar.get("/:tanar_id", async (req, res) => {
    const { tanar_id } = req.params;

    if (!tanar_id || isNaN(tanar_id)) {
        return res.status(400).json({ error: "Érvénytelen vagy hiányzó tanar_id" });
    }

    try {
        const [tanar] = await pool.query('SELECT * FROM tanar WHERE tanar_id = ?', [tanar_id]);

        tanar.length > 0 
            ? res.json(tanar[0]) 
            : res.status(404).json({ error: "Tanár nem található" });
    } catch (err) {
        console.error("Hiba az adatbázis lekérdezése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során', details: err.message });
    }
});

// Tanár regisztráció (létrehozása)
tanar.post("/", async (req, res) => {
    const { tanar_id, t_nev, email, username, password } = req.body;

    if (!tanar_id || isNaN(tanar_id) || !t_nev || !email || !username || !password) {
        return res.status(400).json({ error: "Hiányzó vagy érvénytelen adatok: tanar_id (szám), t_nev, email, username és password szükséges" });
    }

    try {
        // Jelszó hash-elése bcrypt-tel
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO tanar (tanar_id, t_nev, email, username, password) VALUES (?, ?, ?, ?, ?)', 
                         [tanar_id, t_nev, email, username, hashedPassword]);
        
        res.status(201).json({ tanar_id, t_nev, email, username });
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

        result.affectedRows > 0 
            ? res.json({ tanar_id, t_nev }) 
            : res.status(404).json({ error: "Tanár nem található" });
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

        result.affectedRows > 0 
            ? res.status(204).send() 
            : res.status(404).json({ error: "Tanár nem található" });
    } catch (err) {
        console.error("Hiba az adatbázis törlése során:", err.message);
        res.status(500).json({ error: 'Hiba az adatbázis törlése során', details: err.message });
    }
});

export default tanar;

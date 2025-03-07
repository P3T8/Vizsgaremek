import express from "express";
import * as db from '../db.js'; // Az adatbázis kapcsolat itt található
const router = express.Router();

// ---- Diákok ----
router.get("/diak", (req, res) => {
    db.pool.query('SELECT * FROM diak', (err, diakok) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során' });
        res.json(diakok);
    });
});

router.get("/diak/:id", (req, res) => {
    const { id } = req.params;
    db.pool.query('SELECT * FROM diak WHERE id = ?', [id], (err, diak) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során' });
        diak.length > 0 ? res.json(diak[0]) : res.status(404).json({ error: "Diák nem található" });
    });
});

router.post("/diak", (req, res) => {
    const { id, nev } = req.body;
    if (!id || !nev) {
        return res.status(400).json({ error: "Hiányzó adatok" });
    }
    db.pool.query('INSERT INTO diak (id, nev) VALUES (?, ?)', [id, nev], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis beszúrása során' });
        res.status(201).json({ id, nev });
    });
});

router.put("/diak/:id", (req, res) => {
    const { id } = req.params;
    const { nev } = req.body;
    db.pool.query('UPDATE diak SET nev = ? WHERE id = ?', [nev, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis frissítése során' });
        if (result.affectedRows > 0) {
            res.json({ id, nev });
        } else {
            res.status(404).json({ error: "Diák nem található" });
        }
    });
});

router.delete("/diak/:id", (req, res) => {
    const { id } = req.params;
    db.pool.query('DELETE FROM diak WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis törlése során' });
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Diák nem található" });
        }
    });
});

// ---- Tanárok ----
router.get("/tanar", (req, res) => {
    db.pool.query('SELECT * FROM tanar', (err, tanarok) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során' });
        res.json(tanarok);
    });
});

router.get("/tanar/:id", (req, res) => {
    const { id } = req.params;
    db.pool.query('SELECT * FROM tanar WHERE id = ?', [id], (err, tanar) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során' });
        tanar.length > 0 ? res.json(tanar[0]) : res.status(404).json({ error: "Tanár nem található" });
    });
});

router.post("/tanar", (req, res) => {
    const { id, nev } = req.body;
    if (!id || !nev) {
        return res.status(400).json({ error: "Hiányzó adatok" });
    }
    db.pool.query('INSERT INTO tanar (id, nev) VALUES (?, ?)', [id, nev], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis beszúrása során' });
        res.status(201).json({ id, nev });
    });
});

router.put("/tanar/:id", (req, res) => {
    const { id } = req.params;
    const { nev } = req.body;
    db.pool.query('UPDATE tanar SET nev = ? WHERE id = ?', [nev, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis frissítése során' });
        if (result.affectedRows > 0) {
            res.json({ id, nev });
        } else {
            res.status(404).json({ error: "Tanár nem található" });
        }
    });
});

router.delete("/tanar/:id", (req, res) => {
    const { id } = req.params;
    db.pool.query('DELETE FROM tanar WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis törlése során' });
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Tanár nem található" });
        }
    });
});

// ---- Tantárgyak ----
router.get("/tantargyak", (req, res) => {
    db.pool.query('SELECT * FROM tantargy', (err, tantargyak) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során' });
        res.json(tantargyak);
    });
});

router.post("/tantargyak", (req, res) => {
    const { id, nev } = req.body;
    if (!id || !nev) {
        return res.status(400).json({ error: "Hiányzó adatok" });
    }
    db.pool.query('INSERT INTO tantargy (id, nev) VALUES (?, ?)', [id, nev], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis beszúrása során' });
        res.status(201).json({ id, nev });
    });
});

// ---- Tanár-Tantárgy összerendelés ----
router.get("/tanartantargy", (req, res) => {
    db.pool.query('SELECT * FROM tanar_tantargy', (err, tanarTantargy) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis lekérdezése során' });
        res.json(tanarTantargy);
    });
});

router.post("/tanartantargy", (req, res) => {
    const { tanar_id, tantargy_id } = req.body;
    if (!tanar_id || !tantargy_id) {
        return res.status(400).json({ error: "Hiányzó adatok" });
    }
    db.pool.query('INSERT INTO tanar_tantargy (tanar_id, tantargy_id) VALUES (?, ?)', [tanar_id, tantargy_id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis beszúrása során' });
        res.status(201).json({ tanar_id, tantargy_id });
    });
});

router.delete("/tanartantargy/:tanar_id/:tantargy_id", (req, res) => {
    const { tanar_id, tantargy_id } = req.params;
    db.pool.query('DELETE FROM tanar_tantargy WHERE tanar_id = ? AND tantargy_id = ?', [tanar_id, tantargy_id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba az adatbázis törlése során' });
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Kapcsolat nem található" });
        }
    });
});

export default router;

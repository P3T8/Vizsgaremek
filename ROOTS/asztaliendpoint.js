import express from 'express';
import * as db from '../db.js';
const router = express.Router();

export const routes = express.Router();

router.get('/magantanar', (req, res) => {
    db.query('SELECT * FROM tanar', (err, results) => {
        if (err) return res.status(500).json({ error: 'Hiba a tanárok listázásakor' });
        res.json(results);
    });
});

// Magántanár regisztráció
router.post('/magantanar/regisztracio', (req, res) => {
    const { nev, tantargy, varos, nem } = req.body;
    if (!nev || !tantargy || !varos || !nem) {
        return res.status(400).json({ error: 'Hiányzó adat(ok): név, tantárgy, város, nem kötelező!' });
    }

    db.query(
        'INSERT INTO magantanar (nev, tantargy, varos, nem) VALUES (?, ?, ?, ?)',
        [nev, tantargy, varos, nem],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Hiba a regisztráció során' });
            res.status(201).json({ message: 'Sikeres regisztráció', tanarId: result.insertId });
        }
    );
});
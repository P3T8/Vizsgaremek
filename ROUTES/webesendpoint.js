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

// Egyedi tanár lekérése ID alapján
router.get('/magantanar/:id', (req, res) => {
    db.query('SELECT * FROM tanar WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba a tanár adatainak lekérésekor' });
        if (result.length === 0) return res.status(404).json({ error: 'Nincs ilyen ID-vel rendelkező tanár' });
        res.json(result[0]);
    });
});

// Tanár keresése (tantárgy, város, nem alapján)
router.get('/magantanar/kereso', (req, res) => {
    const { tantargy, varos, nem } = req.query;
    let query = 'SELECT * FROM tanar WHERE 1=1';
    const params = [];

    if (tantargy) { query += ' AND tantargy = ?'; params.push(tantargy); }
    if (varos) { query += ' AND varos = ?'; params.push(varos); }
    if (nem) { query += ' AND nem = ?'; params.push(nem); }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: 'Hiba a keresés során' });
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

// Magántanár bejelentkezés
router.post('/magantanar/bejelentkezes', (req, res) => {
    const { nev } = req.body;
    if (!nev) return res.status(400).json({ error: 'Név megadása kötelező' });

    db.query('SELECT * FROM tanar WHERE nev = ?', [nev], (err, results) => {
        if (err) return res.status(500).json({ error: 'Hiba a bejelentkezés során' });
        if (results.length === 0) return res.status(404).json({ error: 'Nincs ilyen névvel rendelkező tanár' });
        res.json({ message: 'Sikeres bejelentkezés', tanar: results[0] });
    });
});
import express from 'express';
import * as db from '../db.js'; // Helyes elérési út
const router = express.Router();
import * as asztaliendpoint from './ROUTES/asztaliendpoint';
import * as webesendpoint from './ROUTES';



// Tanárok kezelése
router.post('/tanar/regisztracio', (req, res) => {
    const { nev, tantargy, varos, nem } = req.body;
    if (!nev || !tantargy || !varos || !nem) {
        return res.status(400).json({ error: 'Hiányzó adat(ok): név, tantárgy, város, nem kötelező!' });
    }

    db.query(
        'INSERT INTO tanar (nev, tantargy, varos, nem) VALUES (?, ?, ?, ?)',
        [nev, tantargy, varos, nem],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Hiba a regisztráció során' });
            res.status(201).json({ message: 'Sikeres regisztráció', tanarId: result.insertId });
        }
    );
});

router.get('/tanar/:id', (req, res) => {
    db.query('SELECT * FROM tanar WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba a tanár adatainak lekérésekor' });
        if (result.length === 0) return res.status(404).json({ error: 'Nincs ilyen ID-vel rendelkező tanár' });
        res.json(result[0]);
    });
});

router.delete('/tanar/:id', (req, res) => {
    db.query('DELETE FROM tanar WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'Hiba a tanár törlése során' });
        res.json({ message: 'Tanár sikeresen törölve' });
    });
});

router.put('/tanar/:id', (req, res) => {
    const { nev, tantargy, varos, nem } = req.body;
    if (!nev || !tantargy || !varos || !nem) {
        return res.status(400).json({ error: 'Hiányzó adatok' });
    }

    db.query(
        'UPDATE tanar SET nev = ?, tantargy = ?, varos = ?, nem = ? WHERE id = ?',
        [nev, tantargy, varos, nem, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: 'Hiba a tanár frissítése során' });
            res.json({ message: 'Tanár sikeresen frissítve' });
        }
    );
});

// Diákok kezelése
router.post('/diak', (req, res) => {
    const { nev, email } = req.body;
    if (!nev || !email) return res.status(400).json({ error: 'Név és email megadása kötelező' });
    
    db.query('INSERT INTO diak (nev, email) VALUES (?, ?)', [nev, email], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba a diák hozzáadása során' });
        res.status(201).json({ message: 'Diák sikeresen létrehozva', id: result.insertId });
    });
});

router.get('/diak/:id', (req, res) => {
    db.query('SELECT * FROM diak WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba a diák lekérése során' });
        if (result.length === 0) return res.status(404).json({ error: 'Nincs ilyen ID-vel rendelkező diák' });
        res.json(result[0]);
    });
});

router.delete('/diak/:id', (req, res) => {
    db.query('DELETE FROM diak WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'Hiba a diák törlése során' });
        res.json({ message: 'Diák sikeresen törölve' });
    });
});

router.put('/diak/:id', (req, res) => {
    const { nev, email } = req.body;
    if (!nev || !email) return res.status(400).json({ error: 'Név és email megadása kötelező' });
    
    db.query('UPDATE diak SET nev = ?, email = ? WHERE id = ?', [nev, email, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'Hiba a diák frissítése során' });
        res.json({ message: 'Diák sikeresen frissítve' });
    });
});

// Tantárgyak kezelése
router.post('/tantargy', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Tantárgy név megadása kötelező' });
    
    db.query('INSERT INTO tantargy (nev) VALUES (?)', [name], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba a tantárgy hozzáadása során' });
        res.status(201).json({ message: 'Tantárgy sikeresen létrehozva', id: result.insertId });
    });
});

router.get('/tantargy/:id', (req, res) => {
    db.query('SELECT * FROM tantargy WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Hiba a tantárgy lekérése során' });
        if (result.length === 0) return res.status(404).json({ error: 'Nincs ilyen ID-vel rendelkező tantárgy' });
        res.json(result[0]);
    });
});

router.delete('/tantargy/:id', (req, res) => {
    db.query('DELETE FROM tantargy WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'Hiba a tantárgy törlése során' });
        res.json({ message: 'Tantárgy sikeresen törölve' });
    });
});

router.put('/tantargy/:id', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Új tantárgy név megadása kötelező' });
    
    db.query('UPDATE tantargy SET nev = ? WHERE id = ?', [name, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'Hiba a tantárgy frissítése során' });
        res.json({ message: 'Tantárgy sikeresen frissítve' });
    });
});

export default router;

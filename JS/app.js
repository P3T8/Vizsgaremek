import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js'; // Ha van adatbázis kapcsolat

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

// 📌 Összes tanár lekérdezése
router.get('/magantanar', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tanar'); // Ha van adatbázis
        res.json({ message: "Összes tanár listázva!" }); // Teszt válasz
    } catch (err) {
        console.error('Hiba az adatbázis-lekérdezéskor:', err);
        res.status(500).json({ error: 'Hiba a tanárok listázásakor' });
    }
});

// 📌 Új tanár hozzáadása
router.post('/magantanar', async (req, res) => {
    console.log('Kapott adat:', req.body);

    const { t_nev, email, jelszo } = req.body;

    if (!t_nev || !email || !jelszo) {
        return res.status(400).json({ error: 'Hiányzó adat!' });
    }

    try {
        const [result] = await db.query('INSERT INTO tanar (...) VALUES (...)');
        res.status(201).json({ message: 'Tanár hozzáadva!' }); // Teszt válasz
    } catch (err) {
        console.error('Hiba az adatbázisba íráskor:', err);
        res.status(500).json({ error: 'Hiba a tanár hozzáadásakor' });
    }
});

app.use(router);

// 📌 Szerver indítása
app.listen(3000, () => {
    console.log('✅ A szerver fut: http://localhost:3000');
});


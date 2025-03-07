//import router from "./webesendpoint";
const asztaliendpoint = express.Router();
// Tantárgy
asztaliendpoint.delete('/tantargy/:id', (req, res) => {
    db.query('DELETE FROM tantargy WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            console.error("Tantárgy törlés hiba:", err); // Hiba logolása
            return res.status(500).json({ error: 'Hiba a tantárgy törlése során' });
        }
        res.json({ message: 'Tantárgy sikeresen törölve' });
    });
});

// Tanár
asztaliendpoint.delete('/tanar/:id', (req, res) => {
    db.query('DELETE FROM tanar WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            console.error("Tanár törlés hiba:", err); // Hiba logolása
            return res.status(500).json({ error: 'Hiba a tanár törlése során' });
        }
        res.json({ message: 'Tanár sikeresen törölve' });
    });
});

// Diák
asztaliendpoint.delete('/diak/:id', (req, res) => {
    db.query('DELETE FROM diak WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            console.error("Diák törlés hiba:", err); // Hiba logolása
            return res.status(500).json({ error: 'Hiba a diák törlése során' });
        }
        res.json({ message: 'Diák sikeresen törölve' });
    });
});

export default asztaliendpoint;

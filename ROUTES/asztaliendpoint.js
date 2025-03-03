import router from "./webesendpoint";

// Tantárgy
router.delete('/tantargy/:id', (req, res) => {
    db.query('DELETE FROM tantargy WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'Hiba a tantárgy törlése során' });
        res.json({ message: 'Tantárgy sikeresen törölve' });
    });
});

//Tanár
router.delete('/tanarok/:id', (req, res) => {
    db.query('DELETE FROM tanar WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'Hiba a tanár törlése során' });
        res.json({ message: 'Tanár sikeresen törölve' });
    });
});

//Diák
router.delete('/diakok/:id', (req, res) => {
    db.query('DELETE FROM diak WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'Hiba a diák törlése során' });
        res.json({ message: 'Diák sikeresen törölve' });
    });
});

export default router;
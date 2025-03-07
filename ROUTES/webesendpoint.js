import express from "express";
import * as db from '../db.js'; // Feltételezve, hogy innen jönnek az adatok
const router = express.Router();

// Feltételezett adatszerkezetek (példa: ha nincs adatbázis)
let diakok = [];
let tanarok = [];
let tantargyak = [];
let tanarTantargy = [];
let esemenyek = [];
let uzenetek = [];

// ---- Diákok ----
router.get("/diak", (req, res) => res.json(diakok));
router.get("/diak/:id", (req, res) => {
    const diak = diakok.find(d => d.id == req.params.id);
    diak ? res.json(diak) : res.status(404).json({ error: "Diák nem található" });
});
router.post("/diak", (req, res) => {
    if (!req.body.id || !req.body.nev) {
        return res.status(400).json({ error: "Hiányzó adatok" });
    }
    diakok.push(req.body);
    res.status(201).json(req.body);
});
router.put("/diak/:id", (req, res) => {
    let index = diakok.findIndex(d => d.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Diák nem található" });
    diakok[index] = { ...diakok[index], ...req.body };
    res.json(diakok[index]);
});
router.delete("/diak/:id", (req, res) => {
    let prevLength = diakok.length;
    diakok = diakok.filter(d => d.id != req.params.id);
    prevLength > diakok.length ? res.status(204).send() : res.status(404).json({ error: "Diák nem található" });
});

// ---- Tanárok ----
router.get("/tanar", (req, res) => res.json(tanarok));
router.get("/tanar/:id", (req, res) => {
    const tanar = tanarok.find(t => t.id == req.params.id);
    tanar ? res.json(tanar) : res.status(404).json({ error: "Tanár nem található" });
});
router.post("/tanar", (req, res) => {
    if (!req.body.id || !req.body.nev) {
        return res.status(400).json({ error: "Hiányzó adatok" });
    }
    tanarok.push(req.body);
    res.status(201).json(req.body);
});
router.put("/tanar/:id", (req, res) => {
    let index = tanarok.findIndex(t => t.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Tanár nem található" });
    tanarok[index] = { ...tanarok[index], ...req.body };
    res.json(tanarok[index]);
});
router.delete("/tanar/:id", (req, res) => {
    let prevLength = tanarok.length;
    tanarok = tanarok.filter(t => t.id != req.params.id);
    prevLength > tanarok.length ? res.status(204).send() : res.status(404).json({ error: "Tanár nem található" });
});

// ---- Tantárgyak ----
router.get("/tantargyak", (req, res) => res.json(tantargyak));
router.post("/tantargyak", (req, res) => {
    if (!req.body.id || !req.body.nev) {
        return res.status(400).json({ error: "Hiányzó adatok" });
    }
    tantargyak.push(req.body);
    res.status(201).json(req.body);
});

// ---- Tanár-Tantárgy összerendelés ----
router.get("/tanartantargy", (req, res) => res.json(tanarTantargy));
router.post("/tanartantargy", (req, res) => {
    if (!req.body.tanar_id || !req.body.tantargy_id) {
        return res.status(400).json({ error: "Hiányzó adatok" });
    }
    tanarTantargy.push(req.body);
    res.status(201).json(req.body);
});
router.delete("/tanartantargy/:tanar_id/:tantargy_id", (req, res) => {
    let prevLength = tanarTantargy.length;
    tanarTantargy = tanarTantargy.filter(tt => !(tt.tanar_id == req.params.tanar_id && tt.tantargy_id == req.params.tantargy_id));
    prevLength > tanarTantargy.length ? res.status(204).send() : res.status(404).json({ error: "Kapcsolat nem található" });
});

// ---- Események ----
router.get("/esemeny", (req, res) => res.json(esemenyek));
router.post("/esemeny", (req, res) => {
    if (!req.body.id || !req.body.leiras) {
        return res.status(400).json({ error: "Hiányzó adatok" });
    }
    esemenyek.push(req.body);
    res.status(201).json(req.body);
});

// ---- Üzenetek ----
router.get("/uzenetek", (req, res) => res.json(uzenetek));
router.post("/uzenetek", (req, res) => {
    if (!req.body.id || !req.body.szoveg) {
        return res.status(400).json({ error: "Hiányzó adatok" });
    }
    uzenetek.push(req.body);
    res.status(201).json(req.body);
});
router.delete("/uzenetek/:id", (req, res) => {
    let prevLength = uzenetek.length;
    uzenetek = uzenetek.filter(u => u.id != req.params.id);
    prevLength > uzenetek.length ? res.status(204).send() : res.status(404).json({ error: "Üzenet nem található" });
});

export default router;

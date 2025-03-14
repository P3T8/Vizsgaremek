import express from 'express';
import cors from 'cors';
import diak from './ROUTES/diak.js';
import tanar from './ROUTES/tanar.js';
import tanartantargy from './ROUTES/tanartantargy.js';
import tantargy from './ROUTES/tantargyak.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// Route-ek

app.use('/diak', diak);
app.use('/tanar', tanar);
app.use('/tanartantargy', tanartantargy);
app.use('/tantargyak', tantargy);

// Szerver indítása
app.listen(port, () => {
    console.log(`Szerver fut: http://localhost:${port}`);
});
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// .env fájl betöltése
dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'magantanar',
    port: process.env.DB_PORT || 3306, //sulis gépen ezt a 3307-re átkell írni
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

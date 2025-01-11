-- Adatbázis újralétrehozása: ha már létezik, töröljük
DROP DATABASE IF EXISTS magantanar;
CREATE DATABASE magantanar;
USE magantanar;

-- Táblák létrehozása
CREATE TABLE statusz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vendeg INT,
    diak INT,
    tanar INT
);

CREATE TABLE adatok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(255),
    email VARCHAR(255),
    jelszo VARCHAR(255),
    felhasznalonev INT
);

CREATE TABLE diak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(255),
    email VARCHAR(255),
    jelszo VARCHAR(255),
    tanarok_lista VARCHAR(255)
);

CREATE TABLE tanar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tantargyak VARCHAR(255),
    dijszabas VARCHAR(255),
    bemutatkozas VARCHAR(255),
    tanarok_lista VARCHAR(255)
);

CREATE TABLE uzenetek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    datum DATE,
    tagok VARCHAR(255)
);

-- Idegen kulcsok hozzáadása
ALTER TABLE statusz ADD CONSTRAINT fk_statusz_adatok FOREIGN KEY (id) REFERENCES adatok (id);
ALTER TABLE adatok ADD CONSTRAINT fk_adatok_diak FOREIGN KEY (id) REFERENCES diak (id);
ALTER TABLE adatok ADD CONSTRAINT fk_adatok_tanar FOREIGN KEY (id) REFERENCES tanar (id);

ALTER TABLE tanar ADD CONSTRAINT fk_tanar_uzenetek FOREIGN KEY (id) REFERENCES uzenetek (id);
ALTER TABLE diak ADD CONSTRAINT fk_diak_uzenetek FOREIGN KEY (id) REFERENCES uzenetek (id);

-- Hivatkozott oszlop UNIQUE attribútummal
ALTER TABLE diak ADD UNIQUE (tanarok_lista);

-- Idegen kulcs hozzáadása
ALTER TABLE tanar ADD CONSTRAINT fk_tanar_diak_lista FOREIGN KEY (tanarok_lista) REFERENCES diak (tanarok_lista);

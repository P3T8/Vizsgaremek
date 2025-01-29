DROP DATABASE IF EXISTS magantanar;
CREATE DATABASE magantanar;
USE magantanar;

-- Táblák létrehozása
CREATE TABLE `diak` (
  `diak_id` INTEGER PRIMARY KEY,
  `d_nev` VARCHAR(255),
  `email` VARCHAR(255),
  `jelszo` VARCHAR(255),
  `tanar_id` INT,
  `tantargy_id` INT
);

CREATE TABLE `tanar` (
  `tanar_id` INTEGER PRIMARY KEY,
  `t_nev` VARCHAR(255),
  `iranyitoszam` VARCHAR(10),
  `varos` VARCHAR(255),
  `utca` VARCHAR(255),
  `hazszam` VARCHAR(255),
  `email` VARCHAR(255),
  `jelszo` VARCHAR(255),
  `telefonszam` VARCHAR(30),
  `dijszabas` VARCHAR(255),
  `bemutatkozas` TEXT,
  `bszamla` INTEGER,
  `adoszam` VARCHAR(255),
  `IBAN` VARCHAR(255),
  `tantargy_id` INT
);

CREATE TABLE `uzenetek` (
  `uzenetek_id` INTEGER PRIMARY KEY,
  `datum` DATE,
  `diak_id` INTEGER,
  `tanar_id` INTEGER,
  `szoveg` TEXT
);

CREATE TABLE `tantargyak` (
  `tantargy_id` INTEGER PRIMARY KEY,
  `tantargy_nev` VARCHAR(255),
  `tanar_id` INTEGER,
  `oradij` INT
);

-- Külső kulcsok beállítása
ALTER TABLE `uzenetek` ADD FOREIGN KEY (`diak_id`) REFERENCES `diak` (`diak_id`);
ALTER TABLE `uzenetek` ADD FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`);
ALTER TABLE `diak` ADD FOREIGN KEY (`tantargy_id`) REFERENCES `tantargyak` (`tantargy_id`);
ALTER TABLE `diak` ADD FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`);
ALTER TABLE `tantargyak` ADD FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`);

-- Előbb a tanárt kell felvenni
INSERT INTO tanar (tanar_id, t_nev, iranyitoszam, varos, utca, hazszam, email, jelszo, telefonszam, dijszabas, bemutatkozas, bszamla, adoszam, IBAN, tantargy_id) 
VALUES (1, 'Nagy Péter', '1011', 'Budapest', 'Fő utca', '1', 'peter.nagy@example.com', 'tanar123', '+36123456789', '5000 Ft/óra', 'Tapasztalt matematika tanár.', 12345678, '12345678-1-42', 'HU12345678901234567890123456', NULL);

-- Ezután a tantárgyakat kell felvenni
INSERT INTO tantargyak (tantargy_id, tantargy_nev, tanar_id, oradij) 
VALUES (1, 'Matematika', 1, 5000);

-- Frissíteni kell a tanár rekordját, hogy beállítsuk a tantargy_id-t
UPDATE tanar SET tantargy_id = 1 WHERE tanar_id = 1;

-- Most már a diákokat is felvehetjük
INSERT INTO diak (diak_id, d_nev, email, jelszo, tanar_id, tantargy_id) 
VALUES (1, 'Kiss Anna', 'anna.kiss@example.com', 'jelszo123', 1, 1);

-- Végül az üzeneteket is felvehetjük
INSERT INTO uzenetek (uzenetek_id, datum, diak_id, tanar_id, szoveg) 
VALUES (1, '2025-01-21', 1, 1, 'Érdekelne a matematika oktatás!');

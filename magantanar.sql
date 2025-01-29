DROP DATABASE IF EXISTS magantanar;
CREATE DATABASE magantanar;
USE magantanar;

CREATE TABLE `diak` (
  `diak_id` integer PRIMARY KEY,
  `d_nev` varchar(255),
  `email` varchar(255),
  `jelszo` varchar(255),
  `tanar_id` int,
  `tantargy_id` int
);

CREATE TABLE `tanar` (
  `tanar_id` integer PRIMARY KEY,
  `t_nev` varchar(255),
  `iranyitoszam` varchar(10),
  `varos` varchar(255),
  `utca` varchar(255),
  `hazszam` varchar(255),
  `email` varchar(255),
  `jelszo` varchar(255),
  `telefonszam` varchar(30),
  `dijszabas` varchar(255),
  `bemutatkozas` text,
  `bszamla` integer,
  `adoszam` varchar(255),
  `IBAN` varchar(255),
  `tantargy_id` int
);

CREATE TABLE `uzenetek` (
  `uzenetek_id` integer PRIMARY KEY,
  `datum` date,
  `diak_id` integer,
  `tanar_id` integer,
  `szoveg` text
);

CREATE TABLE `tantargyak` (
  `tantargy_id` integer PRIMARY KEY,
  `tantargy_nev` varchar(255),
  `tanar_id` integer,
  `oradij` int
);

ALTER TABLE `uzenetek` ADD FOREIGN KEY (`diak_id`) REFERENCES `diak` (`diak_id`);
ALTER TABLE `uzenetek` ADD FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`);
ALTER TABLE `diak` ADD FOREIGN KEY (`tantargy_id`) REFERENCES `tantargyak` (`tantargy_id`);
ALTER TABLE `diak` ADD FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`);
ALTER TABLE `tantargyak` ADD FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`);

-- Előbb a tantárgyakat kell felvenni
INSERT INTO tantargyak (tantargy_id, tantargy_nev, tanar_id, oradij) 
VALUES (1, 'Matematika', 1, 5000);

-- Ezután a tanárokat
INSERT INTO tanar (tanar_id, t_nev, iranyitoszam, varos, utca, hazszam, email, jelszo, telefonszam, dijszabas, bemutatkozas, bszamla, adoszam, IBAN, tantargy_id) 
VALUES (1, 'Nagy Péter', '1011', 'Budapest', 'Fő utca', '1', 'peter.nagy@example.com', 'tanar123', '+36123456789', '5000 Ft/óra', 'Tapasztalt matematika tanár.', 12345678, '12345678-1-42', 'HU12345678901234567890123456', 1);

-- Majd a diákokat
INSERT INTO diak (diak_id, d_nev, email, jelszo, tanar_id, tantargy_id) 
VALUES (1, 'Kiss Anna', 'anna.kiss@example.com', 'jelszo123', 1, 1);

-- Végül az üzeneteket
INSERT INTO uzenetek (uzenetek_id, datum, diak_id, tanar_id, szoveg) 
VALUES (1, '2025-01-21', 1, 1, 'Érdekelne a matematika oktatás!');

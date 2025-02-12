
DROP DATABASE IF EXISTS magantanar;
CREATE DATABASE magantanar;
USE magantanar;

CREATE TABLE `diak` (
  `diak_id` int(11) NOT NULL,
  `d_nev` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `jelszo` varchar(255) DEFAULT NULL,
  `tanar_id` int(11) DEFAULT NULL,
  `tantargy_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `diak` (`diak_id`, `d_nev`, `email`, `jelszo`, `tanar_id`, `tantargy_id`) VALUES
(1, 'Kiss Anna', 'anna.kiss@example.com', 'jelszo123', 1, 1),
(2, 'Nagy Gábor', 'gabor.nagy@example.com', 'jelszo124', 2, 2),
(3, 'Szabó Júlia', 'julia.szabo@example.com', 'jelszo125', 3, 3),
(4, 'Horváth Mária', 'maria.horvath@example.com', 'jelszo126', 4, 4),
(5, 'Tóth Péter', 'peter.toth@example.com', 'jelszo127', 5, 5),
(6, 'Mészáros Zoltán', 'zoltan.meszaros@example.com', 'jelszo128', 6, 6),
(7, 'Horváth Ádám', 'adam.horvath@example.com', 'jelszo129', 7, 7),
(8, 'Tóth Klára', 'klara.toth@example.com', 'jelszo130', 8, 8),
(9, 'Kovács Norbert', 'norbert.kovacs@example.com', 'jelszo131', 9, 9),
(10, 'Nagy Zsófia', 'zsofia.nagy@example.com', 'jelszo132', 10, 10),
(11, 'Péter Katalin', 'katalin.peter@example.com', 'jelszo133', 11, 11);

CREATE TABLE `tanar` (
  `tanar_id` int(11) NOT NULL,
  `t_nev` varchar(255) DEFAULT NULL,
  `iranyitoszam` varchar(10) DEFAULT NULL,
  `varos` varchar(255) DEFAULT NULL,
  `utca` varchar(255) DEFAULT NULL,
  `hazszam` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `jelszo` varchar(255) DEFAULT NULL,
  `telefonszam` varchar(30) DEFAULT NULL,
  `dijszabas` varchar(255) DEFAULT NULL,
  `bemutatkozas` text DEFAULT NULL,
  `bszamla` int(11) DEFAULT NULL,
  `adoszam` varchar(255) DEFAULT NULL,
  `IBAN` varchar(255) DEFAULT NULL,
  `tantargy_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `tanar` (`tanar_id`, `t_nev`, `iranyitoszam`, `varos`, `utca`, `hazszam`, `email`, `jelszo`, `telefonszam`, `dijszabas`, `bemutatkozas`, `bszamla`, `adoszam`, `IBAN`, `tantargy_id`) VALUES
(1, 'Nagy Péter', '1011', 'Budapest', 'Fő utca', '1', 'peter.nagy@example.com', 'tanar123', '+36123456789', '5000 ', 'Tapasztalt matematika tanár.', 12345678, '12345678-1-42', 'HU12345678901234567890123456', 1);

CREATE TABLE `tantargyak` (
  `tantargy_id` int(11) NOT NULL,
  `tantargy_nev` varchar(255) DEFAULT NULL,
  `tanar_id` int(11) DEFAULT NULL,
  `oradij` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `tantargyak` (`tantargy_id`, `tantargy_nev`, `tanar_id`, `oradij`) VALUES
(1, 'Matematika', 1, 5000);

CREATE TABLE `uzenetek` (
  `uzenetek_id` int(11) NOT NULL,
  `datum` date DEFAULT NULL,
  `diak_id` int(11) DEFAULT NULL,
  `tanar_id` int(11) DEFAULT NULL,
  `szoveg` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `uzenetek` (`uzenetek_id`, `datum`, `diak_id`, `tanar_id`, `szoveg`) VALUES
(1, '2025-01-21', 1, 1, 'Érdekelne a matematika oktatás!');

ALTER TABLE `diak`
  ADD PRIMARY KEY (`diak_id`),
  ADD KEY `tantargy_id` (`tantargy_id`),
  ADD KEY `tanar_id` (`tanar_id`);

ALTER TABLE `tanar`
  ADD PRIMARY KEY (`tanar_id`);

ALTER TABLE `tantargyak`
  ADD PRIMARY KEY (`tantargy_id`),
  ADD KEY `tanar_id` (`tanar_id`);

ALTER TABLE `uzenetek`
  ADD PRIMARY KEY (`uzenetek_id`),
  ADD KEY `diak_id` (`diak_id`),
  ADD KEY `tanar_id` (`tanar_id`);

ALTER TABLE `diak`
  ADD CONSTRAINT `diak_ibfk_1` FOREIGN KEY (`tantargy_id`) REFERENCES `tantargyak` (`tantargy_id`),
  ADD CONSTRAINT `diak_ibfk_2` FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`);

ALTER TABLE `tantargyak`
  ADD CONSTRAINT `tantargyak_ibfk_1` FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`);

ALTER TABLE `uzenetek`
  ADD CONSTRAINT `uzenetek_ibfk_1` FOREIGN KEY (`diak_id`) REFERENCES `diak` (`diak_id`),
  ADD CONSTRAINT `uzenetek_ibfk_2` FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`);

COMMIT;

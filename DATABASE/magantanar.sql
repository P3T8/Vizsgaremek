
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
(2, 'Kovács Gábor', '1023', 'Budapest', 'Margit körút', '12', 'gabor.kovacs@example.com', 'tanar234', '+36201234567', '6000', 'Fizika oktatás több mint 10 év tapasztalattal.', 22334455, '22334455-1-55', 'HU22334455667788990011223344', 2),
(3, 'Szabó Dóra', '6000', 'Kecskemét', 'Petőfi utca', '5', 'dora.szabo@example.com', 'tanar345', '+36205556677', '4500', 'Angol nyelvoktatás kezdőknek és haladóknak.', 33445566, '33445566-1-66', 'HU33445566778899001122334455', 3),
(4, 'Tóth László', '4025', 'Debrecen', 'Kossuth tér', '8', 'laszlo.toth@example.com', 'tanar456', '+36301234568', '5500', 'Történelem tanítás egyetemi szinten.', 44556677, '44556677-1-77', 'HU44556677889900112233445566', 4),
(5, 'Németh Anna', '6720', 'Szeged', 'Dugonics tér', '10', 'anna.nemeth@example.com', 'tanar567', '+36203334455', '5000', 'Kémia oktatás középiskolai és egyetemi szinten.', 55667788, '55667788-1-88', 'HU55667788990011223344556677', 5),
(6, 'Farkas Péter', '8000', 'Székesfehérvár', 'Rákóczi utca', '7', 'peter.farkas@example.com', 'tanar678', '+36204445566', '4000', 'Informatika és programozás oktatás.', 66778899, '66778899-1-99', 'HU66778899001122334455667788', 6),
(7, 'Kiss Zoltán', '4032', 'Debrecen', 'Egyetem tér', '3', 'zoltan.kiss@example.com', 'tanar789', '+36301112233', '6500', 'Biológia tanítás érettségi felkészítéshez.', 77889900, '77889900-1-00', 'HU77889900112233445566778899', 7),
(8, 'Molnár Mária', '7100', 'Szekszárd', 'Béke utca', '14', 'maria.molnar@example.com', 'tanar890', '+36206667788', '4800', 'Földrajz és környezetismeret oktatás.', 88990011, '88990011-1-11', 'HU88990011223344556677889900', 8),
(9, 'Varga István', '9021', 'Győr', 'Széchenyi tér', '9', 'istvan.varga@example.com', 'tanar901', '+36207778899', '7000', 'Testnevelés és sportedzés tanítás.', 99001122, '99001122-1-22', 'HU99001122334455667788990011', 9);

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

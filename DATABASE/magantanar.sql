-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2025. Ápr 10. 12:42
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `magantanar`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `diak`
--

CREATE TABLE `diak` (
  `diak_id` int(11) NOT NULL,
  `d_nev` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `jelszo` varchar(255) DEFAULT NULL,
  `aktiv` enum('true','false') NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `diak`
--

INSERT INTO `diak` (`diak_id`, `d_nev`, `email`, `jelszo`, `aktiv`) VALUES
(1, 'Kiss Anna', 'anna.kiss@example.com', 'jelszo123', 'true'),
(2, 'Nagy Gábor', 'gabor.nagy@example.com', 'jelszo124', 'true'),
(3, 'Szabó Júlia', 'julia.szabo@example.com', 'jelszo125', 'false'),
(4, 'Horváth Mária', 'maria.horvath@example.com', 'jelszo126', 'true'),
(5, 'Tóth Péter', 'peter.toth@example.com', 'jelszo127', 'false'),
(6, 'Mészáros Zoltán', 'zoltan.meszaros@example.com', 'jelszo128', 'false'),
(7, 'Horváth Ádám', 'adam.horvath@example.com', 'jelszo129', 'false'),
(8, 'Tóth Klára', 'klara.toth@example.com', 'jelszo130', 'false'),
(9, 'Kovács Norbert', 'norbert.kovacs@example.com', 'jelszo131', 'false'),
(10, 'Nagy Zsófia', 'zsofia.nagy@example.com', 'jelszo132', 'false'),
(11, 'Péter Katalin', 'katalin.peter@example.com', 'jelszo133', 'false');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `esemeny`
--

CREATE TABLE `esemeny` (
  `esemenyek_id` int(11) NOT NULL,
  `kezd` datetime DEFAULT NULL,
  `veg` datetime DEFAULT NULL,
  `diak_id` int(11) DEFAULT NULL,
  `tanar_id` int(11) DEFAULT NULL,
  `tantargy_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanar`
--

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
  `dijszabas` varchar(255) DEFAULT NULL COMMENT 'Ft/óra',
  `bemutatkozas` text DEFAULT NULL,
  `bszamla` int(11) DEFAULT NULL,
  `adoszam` varchar(255) DEFAULT NULL,
  `IBAN` varchar(255) DEFAULT NULL,
  `aktiv` enum('true','false') NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tanar`
--

INSERT INTO `tanar` (`tanar_id`, `t_nev`, `iranyitoszam`, `varos`, `utca`, `hazszam`, `email`, `jelszo`, `telefonszam`, `dijszabas`, `bemutatkozas`, `bszamla`, `adoszam`, `IBAN`, `aktiv`) VALUES
(1, 'Nagy Péter', '1011', 'Budapest', 'Fő utca', '1', 'peter.nagy@example.com', 'tanar123', '+36123456789', '5000 ', 'Tapasztalt matematika tanár.', 12345678, '12345678-1-42', 'HU12345678901234567890123456', 'true'),
(2, 'Szabó László', '1022', 'Budapest', 'Történelem utca', '3', 'laszlo.szabo@example.com', 'tanar456', '+36123456790', '4500 ', 'Fizika tanár és kutató.', 23456789, '23456789-2-43', 'HU23456789012345678901234567', 'false'),
(3, 'Kovács Eszter', '1033', 'Budapest', 'Kémia utca', '5', 'eszter.kovacs@example.com', 'tanar789', '+36123456791', '4800 ', 'Kémia szakértő.', 34567890, '34567890-3-44', 'HU34567890123456789012345678', 'false'),
(4, 'Horváth Zoltán', '1044', 'Budapest', 'Biológia utca', '7', 'zoltan.horvath@example.com', 'tanar101', '+36123456792', '4700 ', 'Biológia tanár.', 45678901, '45678901-4-45', 'HU45678901234567890123456789', 'false'),
(5, 'Tóth Anita', '1055', 'Budapest', 'Irodalom utca', '9', 'anita.toth@example.com', 'tanar112', '+36123456793', '4000 ', 'Történelem tanár és mentor.', 56789012, '56789012-5-46', 'HU56789012345678901234567890', 'true'),
(6, 'Mészáros Katalin', '1066', 'Budapest', 'Matematika utca', '12', 'katalin.meszaros@example.com', 'tanar113', '+36123456794', '5300 ', 'Matematika és statisztika tanár.', 67890123, '67890123-6-47', 'HU67890123456789012345678901', 'true'),
(7, 'Juhász Ferenc', '1077', 'Budapest', 'Fizikai utca', '13', 'ferenc.juhasz@example.com', 'tanar114', '+36123456795', '4600 ', 'Fizikai kutató és tanár.', 78901234, '78901234-7-48', 'HU78901234567890123456789012', 'false'),
(8, 'Balogh Zsófia ', '1088', 'Budapest', 'Zsófia utca', '15', 'balogh.zsofia@example.com', 'tanar115', '+36123456796', '4700 ', 'Matematika és statisztika előadó.', 89012345, '35624892-6-18', 'HU89012345678901234567890123', 'false'),
(9, 'Varga Béla', '1099', 'Budapest', 'Béla utca', '17', 'bela.varga@example.com', 'tanar116', '+36123456797', '4800 ', 'Biológia és ökológia oktató.', 90123456, '90123456-9-50', 'HU90123456789012345678901234', 'false'),
(10, 'Kiss Judit', '1101', 'Budapest', 'Judit utca', '19', 'judit.kiss@example.com', 'tanar117', '+36123456798', '4900 ', 'Történelem és politika szakértő.', 12345678, '12345678-10-51', 'HU12345678901234567890123456', 'false'),
(11, 'Farkas Tamás', '1102', 'Budapest', 'Műszaki utca', '21', 'tamas.farkas@example.com', 'tanar118', '+36123456799', '5000 ', 'Műszaki ismeretek tanár.', 11223344, '11223344-11-52', 'HU11223344556677889900123456', 'false');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanartantargy`
--

CREATE TABLE `tanartantargy` (
  `tanar_id` int(11) NOT NULL,
  `tantargy_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tanartantargy`
--

INSERT INTO `tanartantargy` (`tanar_id`, `tantargy_id`) VALUES
(8, 4),
(11, 7),
(6, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tantargyak`
--

CREATE TABLE `tantargyak` (
  `tantargy_id` int(11) NOT NULL,
  `tantargy_nev` varchar(255) DEFAULT NULL,
  `oradij` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tantargyak`
--

INSERT INTO `tantargyak` (`tantargy_id`, `tantargy_nev`, `oradij`) VALUES
(1, 'Matematika', 5000),
(2, 'Fizika', 4500),
(3, 'Kémia', 4800),
(4, 'Biológia', 4700),
(5, 'Irodalom', 4000),
(6, 'Statisztika', 5300),
(7, 'Fizikai tudományok', 4600),
(8, 'Matematika statisztika', 4700),
(9, 'Biológia ökológia', 4800),
(10, 'Politikai tudományok', 4900),
(11, 'Műszaki ismeretek', 5000);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `uzenetek`
--

CREATE TABLE `uzenetek` (
  `uzenetek_id` int(11) NOT NULL,
  `datum` date DEFAULT NULL,
  `diak_id` int(11) DEFAULT NULL,
  `tanar_id` int(11) DEFAULT NULL,
  `szoveg` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `uzenetek`
--

INSERT INTO `uzenetek` (`uzenetek_id`, `datum`, `diak_id`, `tanar_id`, `szoveg`) VALUES
(1, '2025-01-21', 1, 1, 'Érdekelne a matematika oktatás!'),
(2, '2025-01-22', 2, 2, 'Érdeklődöm a fizika tantárgy iránt.'),
(3, '2025-01-23', 3, 3, 'Segítséget kérnék a kémia feladatokhoz.'),
(4, '2025-01-24', 4, 4, 'Biológia érettségi előkészítőt szeretnék.'),
(5, '2025-01-25', 5, 5, 'Történelem tanfolyamot keresek.'),
(6, '2025-01-26', 6, 6, 'Statisztika órákról érdeklődöm.'),
(7, '2025-01-27', 7, 7, 'Érdeklődnék a fizikai tudományok órák iránt.'),
(8, '2025-01-28', 8, 8, 'Szeretnék többet megtudni a statisztikáról.'),
(9, '2025-01-29', 9, 9, 'Kérem segítsen a biológia feladatokban.'),
(10, '2025-01-30', 10, 10, 'Történelem érettségi felkészítőt szeretnék.'),
(11, '2025-01-31', 11, 11, 'Műszaki ismeretek órák iránt érdeklődöm.');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `diak`
--
ALTER TABLE `diak`
  ADD PRIMARY KEY (`diak_id`);

--
-- A tábla indexei `esemeny`
--
ALTER TABLE `esemeny`
  ADD KEY `fv_esem_tanar` (`tanar_id`),
  ADD KEY `fv_esem_tant` (`tantargy_id`),
  ADD KEY `fv_esem_diak` (`diak_id`);

--
-- A tábla indexei `tanar`
--
ALTER TABLE `tanar`
  ADD PRIMARY KEY (`tanar_id`),
  ADD UNIQUE KEY `t_nev` (`t_nev`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `tanartantargy`
--
ALTER TABLE `tanartantargy`
  ADD KEY `fk_tanartantargy` (`tanar_id`),
  ADD KEY `fk_tantargy` (`tantargy_id`);

--
-- A tábla indexei `tantargyak`
--
ALTER TABLE `tantargyak`
  ADD PRIMARY KEY (`tantargy_id`);

--
-- A tábla indexei `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD PRIMARY KEY (`uzenetek_id`),
  ADD KEY `diak_id` (`diak_id`),
  ADD KEY `tanar_id` (`tanar_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `diak`
--
ALTER TABLE `diak`
  MODIFY `diak_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `tanar`
--
ALTER TABLE `tanar`
  MODIFY `tanar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `tantargyak`
--
ALTER TABLE `tantargyak`
  MODIFY `tantargy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  MODIFY `uzenetek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `esemeny`
--
ALTER TABLE `esemeny`
  ADD CONSTRAINT `fv_esem_diak` FOREIGN KEY (`diak_id`) REFERENCES `diak` (`diak_id`),
  ADD CONSTRAINT `fv_esem_tanar` FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`),
  ADD CONSTRAINT `fv_esem_tant` FOREIGN KEY (`tantargy_id`) REFERENCES `tantargyak` (`tantargy_id`);

--
-- Megkötések a táblához `tanartantargy`
--
ALTER TABLE `tanartantargy`
  ADD CONSTRAINT `fk_tanartantargy` FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`),
  ADD CONSTRAINT `fk_tantargy` FOREIGN KEY (`tantargy_id`) REFERENCES `tantargyak` (`tantargy_id`);

--
-- Megkötések a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD CONSTRAINT `uzenetek_ibfk_1` FOREIGN KEY (`diak_id`) REFERENCES `diak` (`diak_id`),
  ADD CONSTRAINT `uzenetek_ibfk_2` FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`tanar_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

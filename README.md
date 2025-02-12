# Magántanár Kereső Weboldal

## Bevezetés
Ez a dokumentáció egy olyan magántanár kereső weboldal felépítését és működését írja le, amely lehetővé teszi a felhasználók számára, hogy könnyen találjanak és kapcsolatba léphessenek a számukra megfelelő magántanárokkal. Az oldal célja, hogy összekösse a tanulni vágyó diákokat a tantárgyakban jártas tanárokkal, és biztosítsa a hatékony kommunikációt közöttük.

## Fő Funkciók
- **Kezdőlap és ismertető szekció**: Rövid bemutatás az oldal céljáról és előnyeiről.
- **Felhasználói hitelesítés**: Regisztráció és bejelentkezés a felhasználók számára (diákok és tanárok).
- **Tanárkeresés**: Tantárgy, elérhetőség, ár és értékelések alapján lehet tanárt keresni.
- **Kapcsolatfelvétel a tanárral**: A diák üzenetet küldhet a kiválasztott tanárnak időpont-egyeztetés céljából.
- **Felhasználói profilok**: Mind a tanárok, mind a diákok személyes profilt hozhatnak létre, ahol kezelhetik adataikat.

## Felhasználói Szerepkörök
### Vendég (Nem regisztrált felhasználó)
- Megtekintheti a kezdőlapot és az oldalról szóló ismertetőt.
- Bejelentkezés vagy regisztráció szükséges a további funkciók eléréséhez.

### Diák (Regisztrált felhasználó)
- Kereshet tanárokat tantárgy, ár, elérhetőség, értékelés alapján.
- Profil oldalt hozhat létre, ahol kezelheti az adatait.
- Kapcsolatba léphet a tanárral üzenetküldő rendszeren keresztül.

### Tanár (Regisztrált felhasználó)
- Profil oldalt hozhat létre, ahol bemutathatja a szakterületét, díjazását, elérhetőségét.
- Fogadhatja a diákok üzeneteit, és válaszolhat rájuk.
- Értékeléseket kaphat a diákoktól.

## Adatbázis Felépítése
- **Felhasználók tábla**: Név, e-mail, jelszó, felhasználói típus (diák vagy tanár).
- **Tanárok tábla**: Tantárgyak, díjszabás, bemutatkozás, elérhetőség.
- **Üzenetek tábla**: Üzenetküldés a diák és tanár között.

## Biztonsági Megfontolások
- Jelszavak titkosítása (bcrypt), SQL injekció elleni védelem, GDPR-megfelelőség.

## Végpontok
```plaintext
Főoldal: www.localhost:3300/magantanar
Tanár: www.localhost:3300/magantanar/tanar
Diák: www.localhost:3300/magantanar/diak
Regisztráció: www.localhost:3300/magantanar/regisztracio
Bejelentkezés: www.localhost:3300/magantanar/bejelentkezes
Kereső: www.localhost:3300/magantanar/tanar/kereso
Órarend: www.localhost:3300/magantanar/orarend
Időpontfoglalás: www.localhost:3300/magantanar/idopont
Rólunk: www.localhost:3300/magantanar/rolunk
Chat funkció: www.localhost:3300/magantanar/uzenet
Regisztráció(ok): www.localhost:3300/magantanar/regisztracio/ok
```

## Készítették
- **Baracskai Angyalka**
- **Maráczi Péter**

---
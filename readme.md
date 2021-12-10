# Tekstipohjainen viestintäalusta

Ryhmä 5: Sami Huoppila, Saku Myyryläinen ja Elmo Vahvaselkä

## Projektin alustus

Tee seuraavat vaiheet. Kaikki npm-komennot ajetaan projektin juuressa.

1. `npm install` Asentaa riippuvuudet.
2. Luo server-kansioon .env tiedosto, jossa annat tietokannan parametrit, sekä salausavaimen JsonWebTokenia varten:
	- DB_HOST=*Tietokannan url*
	- DB_USERNAME=*Käyttäjätunnus*
	- DB_PASSWORD=*Salasana*
	- DB_NAME=*Tietokannan nimi*
	- SECRET=*JsonWebToken salausavain, laita satunnaisia merkkejä*
3. `npm create-db` Luo tarvittavat tietokannat.
4. `npm run build:ui` Buildaa käyttöliittymän ja kopioi dist-kansion serverin public-kansioon.
5. `npm start` Käynnistää serverin, joka myös tarjoilee käyttöliittymän.

Testit voi ajaa komennolla `npm run test:server`. Toistaiseksi testit on tehty vain serveripuolelle. Komento hyödyntää concurrently-kirjastoa, joka käynnistää serverin testimoodissa rinnakkain Jestin testiajon kanssa.

## REST endpoints

| URI               | HTTP metodi | Autentikointi vaaditaan? * | HTTP bodyssa vaadittava data | Query strings   | Palauttaa…                                                                                                                                              |
|-------------------|-------------|--------------------------|------------------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| /api/login        | POST        | ei                       | "username", "password"       |                 | sisään kirjautuvan käyttäjän access tokenin.                                                                                                            |
| /api/users        | GET         | kyllä                    | -                            |                 | listan kaikista käyttäjistä ja heidän scorensa.                                                                                                         |
| /api/users        | POST        | ei                       | "username", "password"       |                 | luodun käyttäjätunnuksen tiedot.                                                                                                                        |
| /api/users/me     | GET         | kyllä                    | -                            | offset, limit   | sisään kirjautuneen käyttäjän tiedot, sekä viestiketjut joihin tämä on osallistunut. Parametreilla offset ja limit voidaan rajata haettavat viestiketjut.                                                                                                   |
| /api/topics       | GET         | kyllä                    | -                            |                 | listauksen kaikista aihealueista.                                                                                                                       |
| /api/threads      | GET         | kyllä                    | -                            | offset, limit, topic_id | limit kpl viestiketjuja offset-indeksistä alkaen, tai 100 ensimmäistä viestiketjua jos parametrit puuttuvat. Parametri topic_id palauttaa vain kyseisen aihealueen viestiketjut.                                    |
| /api/threads/:id  | GET         | kyllä                    | -                            |                 | yhden viestiketjun tiedot viesteineen.                                                                                                                  |
| /api/threads      | POST        | kyllä                    | "message", "topicId"         |                 | annettuun aihealueeseen luodun viestiketjun, jossa mukana annettu aloitusviesti. Aihealue on valinnainen, ilman sitä ketju luodaan oletusaihealueeseen. |
| /api/threads/:id  | POST        | kyllä                    | "message"                    |                 | päivitetyn viestiketjun, johon on luotu uusi viesti.                                                                                                    |
| /api/threads/:id  | DELETE      | kyllä                    | -                            |                 | ei mitään. Asettaa käyttäjän viestiketjun poistetuksi.                                                                                                   |
| /api/messages/:id | POST        | kyllä                    | "amount"                     |                 | viestin, jonka score on päivittynyt annetun äänen verran.                                                                                               |
| /api/messages/:id | DELETE      | kyllä                    | -                            |                 | poistetun viestin, jolle on asetettu removed = 1.                                                                                               |

\* Autentikoiduissa reiteissä vaaditaan kyselyn mukana *Authorization*-header, jonka arvona *bearer \<token\>* (ilman kulmasulkeita). Tokenin saa login-reitin paluuarvona onnistuneen sisäänkirjautumisen tuloksena.
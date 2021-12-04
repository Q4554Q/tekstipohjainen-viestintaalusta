# Tekstipohjainen viestintäalusta

Ryhmä 5: Sami Huoppila, Saku Myyryläinen ja Elmo Vahvaselkä

## Projektin alustus

Tee seuraavat vaiheet. Komennot ajetaan projektin juuressa, ellei toisin mainita.

1. `npm install` Asentaa riippuvuudet.
2. Luo server-kansioon .env tiedosto, jossa annat tietokannan parametrit, sekä salausavaimen JsonWebTokenia varten:
	- DB_HOST=localhost
	- DB_USERNAME=*KÄYTTÄJÄTUNNUS*
	- DB_PASSWORD=*SALASANA*
	- DB_NAME=*TIETOKANNAN NIMI*
	- SECRET=461984yv1strjnkandouwi98ghio
3. `npm create-db` Luo tarvittavat tietokannat.
4. Client-kansiossa: `npm run build`
5. Kopioi dist-kansion sisältö server-kansion alle public-kansioon.
6. `npm start` Käynnistää serverin, joka myös tarjoilee käyttöliittymän.

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
| /api/messages/:id | POST        | kyllä                    | "amount"                     |                 | viestin, jonka score on päivittynyt annetun äänen verran.                                                                                               |

\* Autentikoiduissa reiteissä vaaditaan kyselyn mukana *Authentication*-header, jonka arvona *bearer {token}*. Token on login-reitistä saatava access token.
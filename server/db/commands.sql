-- SQL-komentoja copy-pastettavaksi, näillä saa tehtyä oikeanlaisen tietokannan
DROP DATABASE IF EXISTS viestintäalusta;

CREATE DATABASE viestintäalusta;

USE viestintäalusta;

CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(20) UNIQUE NOT NULL,
	password_hash VARCHAR(60) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE topics(
	id INT NOT NULL AUTO_INCREMENT,
	topic_name VARCHAR(20) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE threads(
	id INT NOT NULL AUTO_INCREMENT,
	topic_id INT NOT NULL,
	writer_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY(topic_id) REFERENCES topics(id),
	FOREIGN KEY(writer_id) REFERENCES users(id)
);

CREATE TABLE messages(
	id INT NOT NULL AUTO_INCREMENT,
	thread_id INT NOT NULL,
	writer_id INT NOT NULL,
	index_in_thread INT NOT NULL,
	content VARCHAR(350) NOT NULL,
	posted_time DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY(thread_id) REFERENCES threads(id),
	FOREIGN KEY(writer_id) REFERENCES users(id)
);

CREATE TABLE votes(
	writer_id INT NOT NULL,
	message_id INT NOT NULL,
	amount INT NOT NULL,
	PRIMARY KEY (writer_id, message_id),
	FOREIGN KEY(writer_id) REFERENCES users(id),
	FOREIGN KEY(message_id) REFERENCES messages(id)
);

-- Esimerkkidataa tauluihin
INSERT INTO
	users(username, password_hash)
VALUES
	("testikäyttäjä", "");

INSERT INTO
	topics(topic_name)
VALUES
	("Yleinen");

INSERT INTO
	threads(topic_id, writer_id)
VALUES
	(1, 1);

INSERT INTO
	messages(thread_id, writer_id, index_in_thread, content)
VALUES
	(1, 1, 1, "Viesti testikäyttäjältä"),
	(1, 1, 2, "Toinenkin viesti vielä");

INSERT INTO
	votes(writer_id, message_id, amount)
VALUES
	(1, 2, 1),
	(1, 1, -1);
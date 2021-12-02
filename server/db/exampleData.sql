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
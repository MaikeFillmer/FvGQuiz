### Schema
CREATE DATABASE fvg_db;
USE fvg_db;

CREATE TABLE questions
(
	id int NOT NULL AUTO_INCREMENT,
	question varchar(255) NOT NULL,
	agreeS int,
    agree int,
    disagree int,
    disagreeS int,
	date TIMESTAMP DEFAULT now() ON UPDATE now(),
	PRIMARY KEY (id)
);

INSERT INTO questions (question, agreeS, agree, disagree, disagreeS) VALUES ('Test Question', 3, 2, 1, 0);
	CREATE DATABASE IF NOT EXISTS gestBudget_DB;


	USE gestBudget_DB;

	/* Création des tables */ /*123*/

	CREATE TABLE IF NOT EXISTS Personnes (
		id_personne int PRIMARY KEY AUTO_INCREMENT,
		nom_personne varchar(50),
		prenom_personne varchar(50),
		is_parent boolean
	);



	CREATE TABLE IF NOT EXISTS Connect (
		login_connect varchar(20) PRIMARY KEY,
		password_connect varchar(20),
		personne_connect int,
		FOREIGN KEY (personne_connect) REFERENCES Personnes(id_personne)
	);



	CREATE TABLE IF NOT EXISTS Depenses (
		id_depense int PRIMARY KEY AUTO_INCREMENT,
		montant_depense decimal(10, 2),
		date_depense date,
		poste_depense text,
		personne_depense int,
		FOREIGN KEY (personne_depense) REFERENCES Personnes(id_personne)
	);



	CREATE TABLE IF NOT EXISTS Rentrees (
		id_rentree int PRIMARY KEY AUTO_INCREMENT,
		montant_rentree decimal(10, 2),
		date_rentree date,
		origine_rentree text,
		personne_rentree int,
		FOREIGN KEY (personne_rentree) REFERENCES Personnes(id_personne)
	);



	CREATE TABLE IF NOT EXISTS Budgets (
		id_budget int PRIMARY KEY AUTO_INCREMENT,
		montant_budget decimal,
		date_budget date,
		raison_budget text,
		personne_budget int,
		FOREIGN KEY (personne_budget) REFERENCES Personnes(id_personne)
	);


	/* INSERTION DE QUELQUES DONNEES DE BASE */


	INSERT INTO Personnes (nom_personne, prenom_personne, is_parent) VALUES ('Dupont','Jean', 1);

	INSERT INTO Connect VALUES ('root','root',1);
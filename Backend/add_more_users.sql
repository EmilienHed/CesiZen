-- Script pour ajouter 15 nouveaux utilisateurs

-- Utilisateurs avec rôle User (RoleId = 2)
INSERT INTO "Users" ("Nom", "Prenom", "Email", "MotDePasse", "DateNaissance", "RoleId", "DateCreation")
VALUES 
-- 8 utilisateurs standards
('Durand', 'Mathilde', 'mathilde.durand@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1990-05-15', 2, NOW()),
('Bernard', 'Antoine', 'antoine.bernard@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1985-10-22', 2, NOW()),
('Rousseau', 'Julie', 'julie.rousseau@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1992-03-07', 2, NOW()),
('Garnier', 'Nicolas', 'nicolas.garnier@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1988-12-18', 2, NOW()),
('Faure', 'Camille', 'camille.faure@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1995-07-29', 2, NOW()),
('Mercier', 'Hugo', 'hugo.mercier@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1983-04-11', 2, NOW()),
('Lambert', 'Manon', 'manon.lambert@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1993-09-02', 2, NOW()),
('Dupont', 'Alexandre', 'alexandre.dupont@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1987-11-14', 2, NOW());

-- Utilisateurs avec rôle Auteur (RoleId = 3)
INSERT INTO "Users" ("Nom", "Prenom", "Email", "MotDePasse", "DateNaissance", "RoleId", "DateCreation")
VALUES 
-- 5 auteurs
('Leclerc', 'Élodie', 'elodie.leclerc@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1984-06-23', 3, NOW()),
('Morel', 'David', 'david.morel@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1979-02-19', 3, NOW()),
('Girard', 'Chloé', 'chloe.girard@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1991-08-05', 3, NOW()),
('Fontaine', 'Maxime', 'maxime.fontaine@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1986-01-27', 3, NOW()),
('Blanc', 'Sarah', 'sarah.blanc@example.com', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1989-12-09', 3, NOW());

-- Utilisateurs avec rôle Admin (RoleId = 1)
INSERT INTO "Users" ("Nom", "Prenom", "Email", "MotDePasse", "DateNaissance", "RoleId", "DateCreation")
VALUES 
-- 2 administrateurs
('Roux', 'Philippe', 'philippe.roux@cesizen.fr', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1975-04-18', 1, NOW()),
('Henry', 'Marie', 'marie.henry@cesizen.fr', '$2a$11$ysf5gjLcS.TPb7JUxxbE0.4psl50YKGYGgTCLwgSXX9yBJpYb4L4u', '1982-09-30', 1, NOW()); 
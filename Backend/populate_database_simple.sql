-- Script pour peupler la base de données

-- Insertion des rôles
INSERT INTO "Role" ("Name") VALUES 
('Admin'),
('User'),
('Auteur');

-- Insertion des catégories
INSERT INTO "Categories" ("Name", "Description", "IsActive")
VALUES
('Bien-être', 'Articles sur le bien-être et la santé mentale', true),
('Méditation', 'Techniques de méditation et conseils pratiques', true),
('Respiration', 'Exercices de respiration et leurs bienfaits', true),
('Mindfulness', 'Pratiques de pleine conscience au quotidien', true),
('Yoga', 'Postures et philosophie du yoga', true),
('Santé', 'Conseils pour prendre soin de sa santé physique et mentale', true),
('Sommeil', 'Améliorer la qualité de son sommeil', true),
('Relaxation', 'Techniques de relaxation et de gestion du stress', true),
('Nutrition', 'Alimentation équilibrée pour le corps et l''esprit', true),
('Développement personnel', 'Ressources pour grandir et s''épanouir', true);

-- Insertion des utilisateurs
-- Admin (RoleId = 1)
INSERT INTO "Users" ("Nom", "Prenom", "Email", "MotDePasse", "DateNaissance", "RoleId", "DateCreation", "DateDerniereConnexion")
VALUES ('Admin', 'Super', 'admin@cesizen.fr', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1990-01-01', 1, NOW(), NOW());

-- Auteurs (RoleId = 3)
INSERT INTO "Users" ("Nom", "Prenom", "Email", "MotDePasse", "DateNaissance", "RoleId", "DateCreation", "DateDerniereConnexion")
VALUES
('Dubois', 'Jean', 'jean.dubois@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1985-05-12', 3, NOW() - INTERVAL '5 days', NOW() - INTERVAL '1 day'),
('Martin', 'Sophie', 'sophie.martin@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1992-08-21', 3, NOW() - INTERVAL '10 days', NOW() - INTERVAL '2 days'),
('Petit', 'Thomas', 'thomas.petit@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1988-02-15', 3, NOW() - INTERVAL '15 days', NOW() - INTERVAL '3 days');

-- Utilisateurs avec rôle User (RoleId = 2)
INSERT INTO "Users" ("Nom", "Prenom", "Email", "MotDePasse", "DateNaissance", "RoleId", "DateCreation", "DateDerniereConnexion")
VALUES
('Leroy', 'Emma', 'emma.leroy@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1995-11-30', 2, NOW() - INTERVAL '20 days', NOW() - INTERVAL '4 days'),
('Moreau', 'Lucas', 'lucas.moreau@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1990-06-08', 2, NOW() - INTERVAL '25 days', NOW() - INTERVAL '5 days'),
('Simon', 'Léa', 'lea.simon@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1993-04-17', 2, NOW() - INTERVAL '30 days', NOW() - INTERVAL '6 days');

-- Quelques articles (userId=2 = Jean Dubois, le premier auteur)
INSERT INTO "Articles" ("Title", "Content", "ImageUrl", "CreatedAt", "UpdatedAt", "IsActive", "UserId", "CategoryId")
VALUES
('5 habitudes quotidiennes pour améliorer votre bien-être', 
 'Le bien-être est un processus continu qui nécessite des habitudes régulières. Voici 5 habitudes simples pour améliorer votre bien-être global:

1. Pratiquer la gratitude: Prenez quelques minutes chaque jour pour noter trois choses pour lesquelles vous êtes reconnaissant.

2. Bouger quotidiennement: L''activité physique libère des endorphines. Même 15 minutes de marche peuvent faire une différence sur votre humeur.

3. Limiter le temps d''écran: Fixez-vous des périodes sans écran, particulièrement avant le coucher.

4. Pratiquer la respiration consciente: Quelques minutes de respiration profonde peuvent réduire votre niveau de stress.

5. Cultiver les connexions sociales: Prenez le temps d''entretenir vos relations.',
 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
 NOW() - INTERVAL '30 days',
 NOW() - INTERVAL '25 days',
 true,
 2,
 1),
 
('La technique de respiration 4-7-8 pour calmer l''anxiété',
 'La respiration est un outil puissant contre l''anxiété. La technique 4-7-8, développée par le Dr. Andrew Weil, est particulièrement efficace.

Comment pratiquer:

1. Position: Asseyez-vous confortablement.
2. Préparation: Placez la langue derrière vos incisives supérieures.
3. Expiration: Expirez complètement par la bouche.
4. La séquence:
   - Inspirez par le nez (4 secondes).
   - Retenez votre souffle (7 secondes).
   - Expirez par la bouche (8 secondes).

Répétez 3-4 fois au début, puis jusqu''à 8 cycles avec l''expérience.

Cette technique agit comme un tranquillisant naturel pour le système nerveux en augmentant l''oxygénation du sang.',
 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b',
 NOW() - INTERVAL '28 days',
 NOW() - INTERVAL '26 days',
 true,
 2,
 3),
 
('Débuter la méditation : guide pour les débutants',
 'Guide simple pour débuter votre pratique de méditation:

1. Trouvez un espace calme où vous ne serez pas dérangé.

2. Adoptez une position confortable, dos droit mais sans tension.

3. Commencez par des sessions courtes (5 minutes) puis augmentez progressivement.

4. Concentrez-vous sur votre respiration sans tenter de la modifier.

5. Accueillez vos pensées sans jugement et ramenez doucement votre attention sur la respiration.

Approches recommandées:
- Méditation guidée avec applications comme Petit BamBou
- Méditation de la pleine conscience
- Scan corporel

Conseils: pratiquez régulièrement, soyez patient, et ne vous jugez pas.',
 'https://images.unsplash.com/photo-1593164842264-854604db2260',
 NOW() - INTERVAL '25 days',
 NOW() - INTERVAL '24 days',
 true,
 3,
 2);

-- Insertion des exercices de respiration
INSERT INTO "RespirationExercises" ("Name", "InspirationDuration", "HoldDuration", "ExpirationDuration", "Description", "IsDefault")
VALUES
('748', 7, 4, 8, 'Inspiration: 7 secondes / Apnée: 4 secondes / Expiration: 8 secondes', true),
('55', 5, 0, 5, 'Inspiration: 5 secondes / Apnée: 0 secondes / Expiration: 5 secondes', true),
('46', 4, 0, 6, 'Inspiration: 4 secondes / Apnée: 0 secondes / Expiration: 6 secondes', true); 
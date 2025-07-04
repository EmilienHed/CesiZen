-- Script pour peupler la base de données

-- Insertion des rôles
INSERT INTO "Role" ("Name") VALUES 
('Admin'),
('User'),
('Auteur');

-- Récupérer les IDs des rôles
DO $$
DECLARE
    admin_role_id INT;
    user_role_id INT;
    auteur_role_id INT;
BEGIN
    SELECT id INTO admin_role_id FROM "Role" WHERE "Name" = 'Admin';
    SELECT id INTO user_role_id FROM "Role" WHERE "Name" = 'User';
    SELECT id INTO auteur_role_id FROM "Role" WHERE "Name" = 'Auteur';

    -- Insertion des utilisateurs
    -- Utilisateurs avec rôle Admin et Auteur
    INSERT INTO "Users" ("Nom", "Prenom", "Email", "MotDePasse", "DateNaissance", "RoleId", "DateCreation", "DateDerniereConnexion")
    VALUES
    ('Admin', 'Super', 'admin@cesizen.fr', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1990-01-01', admin_role_id, NOW(), NOW()),
    ('Dubois', 'Jean', 'jean.dubois@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1985-05-12', auteur_role_id, NOW() - INTERVAL '5 days', NOW() - INTERVAL '1 day'),
    ('Martin', 'Sophie', 'sophie.martin@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1992-08-21', auteur_role_id, NOW() - INTERVAL '10 days', NOW() - INTERVAL '2 days'),
    ('Petit', 'Thomas', 'thomas.petit@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1988-02-15', auteur_role_id, NOW() - INTERVAL '15 days', NOW() - INTERVAL '3 days');

    -- Utilisateurs avec rôle User
    INSERT INTO "Users" ("Nom", "Prenom", "Email", "MotDePasse", "DateNaissance", "RoleId", "DateCreation", "DateDerniereConnexion")
    VALUES
    ('Leroy', 'Emma', 'emma.leroy@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1995-11-30', user_role_id, NOW() - INTERVAL '20 days', NOW() - INTERVAL '4 days'),
    ('Moreau', 'Lucas', 'lucas.moreau@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1990-06-08', user_role_id, NOW() - INTERVAL '25 days', NOW() - INTERVAL '5 days'),
    ('Simon', 'Léa', 'lea.simon@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1993-04-17', user_role_id, NOW() - INTERVAL '30 days', NOW() - INTERVAL '6 days'),
    ('Laurent', 'Hugo', 'hugo.laurent@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1987-09-22', user_role_id, NOW() - INTERVAL '35 days', NOW() - INTERVAL '7 days'),
    ('Lefebvre', 'Manon', 'manon.lefebvre@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1991-12-03', user_role_id, NOW() - INTERVAL '40 days', NOW() - INTERVAL '8 days'),
    ('Michel', 'Liam', 'liam.michel@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1994-07-14', user_role_id, NOW() - INTERVAL '45 days', NOW() - INTERVAL '9 days');
END $$;

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

-- Récupérer premier auteur et première catégorie pour les articles
DO $$
DECLARE
    auteur_id INT;
    bien_etre_id INT;
    respiration_id INT;
    meditation_id INT;
    mindfulness_id INT;
    yoga_id INT;
    sante_id INT;
    sommeil_id INT;
    relaxation_id INT;
    nutrition_id INT;
    dev_perso_id INT;
BEGIN
    -- Récupérer l'ID d'un auteur
    SELECT "IdUtilisateur" INTO auteur_id FROM "Users" 
    WHERE "Email" = 'jean.dubois@example.com' LIMIT 1;
    
    -- Récupérer les IDs des catégories
    SELECT "Id" INTO bien_etre_id FROM "Categories" WHERE "Name" = 'Bien-être' LIMIT 1;
    SELECT "Id" INTO respiration_id FROM "Categories" WHERE "Name" = 'Respiration' LIMIT 1;
    SELECT "Id" INTO meditation_id FROM "Categories" WHERE "Name" = 'Méditation' LIMIT 1;
    SELECT "Id" INTO mindfulness_id FROM "Categories" WHERE "Name" = 'Mindfulness' LIMIT 1;
    SELECT "Id" INTO yoga_id FROM "Categories" WHERE "Name" = 'Yoga' LIMIT 1;
    SELECT "Id" INTO sante_id FROM "Categories" WHERE "Name" = 'Santé' LIMIT 1;
    SELECT "Id" INTO sommeil_id FROM "Categories" WHERE "Name" = 'Sommeil' LIMIT 1;
    SELECT "Id" INTO relaxation_id FROM "Categories" WHERE "Name" = 'Relaxation' LIMIT 1;
    SELECT "Id" INTO nutrition_id FROM "Categories" WHERE "Name" = 'Nutrition' LIMIT 1;
    SELECT "Id" INTO dev_perso_id FROM "Categories" WHERE "Name" = 'Développement personnel' LIMIT 1;
    
    -- Créer quelques articles
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
     auteur_id,
     bien_etre_id),
     
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
     auteur_id,
     respiration_id),
     
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
     auteur_id,
     meditation_id),
     
    ('La pleine conscience au travail : améliorer sa concentration',
     'La pleine conscience au travail consiste à porter délibérément votre attention sur le moment présent et votre tâche actuelle.

Exercices pour le bureau:

1. La minute de respiration: Avant chaque nouvelle tâche, prenez une minute pour respirer profondément.

2. Travail mono-tâche: Concentrez-vous sur une seule tâche à la fois, sans notifications.

3. Transition consciente: Prenez un moment entre deux tâches pour respirer et reconnaître le changement.

4. Écoute active: Dans les réunions, concentrez-vous pleinement sur la personne qui parle.

5. Pauses mindful: Intégrez de courtes pauses conscientes dans votre journée.

Bénéfices: meilleure concentration, réduction du stress, meilleure prise de décision, relations professionnelles améliorées, créativité renforcée.',
     'https://images.unsplash.com/photo-1616699002805-0741e1e4a9c5',
     NOW() - INTERVAL '20 days',
     NOW() - INTERVAL '18 days',
     true,
     auteur_id,
     mindfulness_id),
     
    ('Le yoga pour débutants : par où commencer',
     'Guide pour bien démarrer votre pratique du yoga:

Styles adaptés aux débutants:
1. Hatha Yoga: Doux et accessible, idéal pour apprendre les bases.
2. Yoga Vinyasa doux: Enchaînements fluides mais adaptés.
3. Yoga Iyengar: Accent sur la précision et l''alignement.
4. Yoga Restauratif: Très doux, avec postures maintenues longtemps.

Équipement essentiel:
- Un tapis antidérapant
- Des vêtements confortables
- Éventuellement: bloc, sangle, couverture

5 postures de base:
1. La montagne (Tadasana)
2. La posture de l''enfant (Balasana)
3. Le chien tête en bas (Adho Mukha Svanasana)
4. Le cobra (Bhujangasana)
5. Le guerrier I (Virabhadrasana I)

Conseils: commencez doucement, respectez votre corps, soyez régulier, respirez consciemment.',
     'https://images.unsplash.com/photo-1602192509154-0b900ee1f851',
     NOW() - INTERVAL '18 days',
     NOW() - INTERVAL '15 days',
     true,
     auteur_id,
     yoga_id);
     
    -- Ajouter 5 autres articles
    INSERT INTO "Articles" ("Title", "Content", "ImageUrl", "CreatedAt", "UpdatedAt", "IsActive", "UserId", "CategoryId")
    VALUES
    ('Renforcer son système immunitaire naturellement',
     'Un système immunitaire fort est votre meilleure défense contre les maladies.

Alimentation pour l''immunité:
1. Aliments riches en vitamine C: Agrumes, kiwis, poivrons
2. Sources de zinc: Fruits de mer, légumineuses
3. Aliments fermentés: Yaourt, kéfir, choucroute
4. Ail et oignon: Composés antiseptiques naturels
5. Aliments anti-inflammatoires: Curcuma, gingembre, poissons gras

Mode de vie fortifiant:
1. Sommeil réparateur: 7-8 heures par nuit
2. Activité physique régulière: 30 minutes quotidiennes
3. Gestion du stress: Méditation, yoga, respiration
4. Hydratation: Maintenez les muqueuses humides
5. Exposition solaire modérée: Pour la vitamine D

Habitudes à adopter: lavage des mains régulier, limitation des toxines, contact avec la nature.',
     'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
     NOW() - INTERVAL '15 days',
     NOW() - INTERVAL '14 days',
     true,
     auteur_id,
     sante_id),
     
    ('7 conseils pour un sommeil réparateur',
     'Conseils pour améliorer la qualité de votre sommeil:

1. Respectez un horaire régulier: Couchez-vous et levez-vous à heures fixes, même le week-end.

2. Créez un environnement propice:
   - Température: 16-18°C
   - Obscurité: Rideaux occultants ou masque
   - Silence: Bouchons d''oreilles ou bruit blanc
   - Confort: Literie de qualité

3. Limitez l''exposition aux écrans: Évitez les écrans 1h avant le coucher.

4. Adoptez une routine d''endormissement: Lecture, méditation, étirements doux, bain chaud.

5. Surveillez alimentation et hydratation:
   - Évitez caféine 6h avant le coucher
   - Limitez l''alcool
   - Évitez repas lourds tard le soir

6. Pratiquez une activité physique régulière, mais pas juste avant de dormir.

7. Gérez stress et anxiété: Techniques de relaxation, écriture, pleine conscience.',
     'https://images.unsplash.com/photo-1465101162946-4377e57745c3',
     NOW() - INTERVAL '12 days',
     NOW() - INTERVAL '10 days',
     true,
     auteur_id,
     sommeil_id),
     
    ('Techniques de relaxation musculaire progressive',
     'La relaxation musculaire progressive réduit le stress en relâchant systématiquement les tensions corporelles.

Préparation:
- Endroit calme, position confortable
- Vêtements confortables, retirez accessoires gênants

Technique en 5 étapes:

1. Respiration profonde initiale:
   - Inspirez par le nez (4 secondes)
   - Retenez (2 secondes)
   - Expirez par la bouche (6 secondes)
   - Répétez 3 fois

2. Cycle tension-relâchement:
   - Contractez les muscles (5-7 secondes)
   - Relâchez soudainement
   - Notez la différence (15-20 secondes)

3. Séquence des groupes musculaires:
   - Mains et avant-bras: serrez les poings
   - Haut des bras, visage, cou, épaules
   - Poitrine, abdomen, jambes, pieds

4. Vérification corporelle finale
5. Retour progressif

Bénéfices: réduction du stress, conscience corporelle, aide à l''endormissement, gestion de la douleur.',
     'https://images.unsplash.com/photo-1499209974431-9dddcece7f88',
     NOW() - INTERVAL '10 days',
     NOW() - INTERVAL '8 days',
     true,
     auteur_id,
     relaxation_id),
     
    ('Les aliments qui favorisent la bonne humeur',
     'Notre alimentation influence notre humeur et notre bien-être mental.

Aliments riches en sérotonine:
- Bananes: Tryptophane et vitamines B6
- Ananas: Tryptophane et bromélaïne
- Noix et graines: Noix du Brésil, amandes, graines de chia
- Œufs: Protéines, vitamines B et D
- Légumineuses: Lentilles, pois chiches, haricots

Aliments riches en oméga-3:
- Poissons gras: Saumon, maquereau, sardines
- Graines de lin et de chia
- Huile de colza et noix

Aliments probiotiques:
- Yaourt nature et kéfir
- Choucroute et kimchi
- Kombucha

Autres aliments "bonne humeur":
- Chocolat noir (min. 70% cacao)
- Agrumes: Riches en vitamine C
- Curcuma: Propriétés anti-inflammatoires
- Thé vert: Contient de la L-théanine

Habitudes pour une humeur stable: glycémie équilibrée, repas réguliers, hydratation.',
     'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
     NOW() - INTERVAL '8 days',
     NOW() - INTERVAL '5 days',
     true,
     auteur_id,
     nutrition_id),
     
    ('Comment cultiver la gratitude au quotidien',
     'La gratitude est une pratique qui, cultivée régulièrement, peut transformer notre perception du monde.

Bienfaits:
- Amélioration du bien-être émotionnel
- Renforcement des relations sociales
- Meilleur sommeil
- Réduction du stress
- Augmentation de la résilience

Pratiques quotidiennes:

1. Le journal de gratitude:
   - 5 minutes chaque jour pour noter 3 choses
   - Soyez spécifique et variez les sujets

2. La méditation de gratitude:
   - Position confortable, yeux fermés
   - Concentration sur les éléments positifs de votre vie

3. Les lettres de gratitude:
   - Écrivez à quelqu''un qui a eu un impact positif
   - L''acte d''écrire est thérapeutique en soi

4. La boîte à souvenirs reconnaissants
5. L''attention consciente au quotidien

Surmonter les obstacles: accepter les difficultés, contrer le négativisme, varier les pratiques.',
     'https://images.unsplash.com/photo-1563178406-4cdc2923acbc',
     NOW() - INTERVAL '5 days',
     NOW() - INTERVAL '3 days',
     true,
     auteur_id,
     dev_perso_id);
END $$;

-- Insertion des exercices de respiration
INSERT INTO "RespirationExercises" ("Name", "InspirationDuration", "HoldDuration", "ExpirationDuration", "Description", "IsDefault")
VALUES
('748', 7, 4, 8, 'Inspiration: 7 secondes / Apnée: 4 secondes / Expiration: 8 secondes', true),
('55', 5, 0, 5, 'Inspiration: 5 secondes / Apnée: 0 secondes / Expiration: 5 secondes', true),
('46', 4, 0, 6, 'Inspiration: 4 secondes / Apnée: 0 secondes / Expiration: 6 secondes', true); 
-- Script pour peupler la base de données

-- Insertion des rôles
INSERT INTO "Role" (id, "Name") VALUES 
(1, 'Admin'),
(2, 'User'),
(3, 'Auteur');

-- Insertion des utilisateurs
-- Utilisateurs avec rôle Admin et Auteur
INSERT INTO "Users" ("IdUtilisateur", "Nom", "Prenom", "Email", "MotDePasse", "DateNaissance", "RoleId", "DateCreation", "DateDerniereConnexion")
VALUES
(1, 'Admin', 'Super', 'admin@cesizen.fr', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1990-01-01', 1, NOW(), NOW()),
(2, 'Dubois', 'Jean', 'jean.dubois@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1985-05-12', 3, NOW() - INTERVAL '5 days', NOW() - INTERVAL '1 day'),
(3, 'Martin', 'Sophie', 'sophie.martin@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1992-08-21', 3, NOW() - INTERVAL '10 days', NOW() - INTERVAL '2 days'),
(4, 'Petit', 'Thomas', 'thomas.petit@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1988-02-15', 3, NOW() - INTERVAL '15 days', NOW() - INTERVAL '3 days');

-- Utilisateurs avec rôle User
INSERT INTO "Users" ("IdUtilisateur", "Nom", "Prenom", "Email", "MotDePasse", "DateNaissance", "RoleId", "DateCreation", "DateDerniereConnexion")
VALUES
(5, 'Leroy', 'Emma', 'emma.leroy@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1995-11-30', 2, NOW() - INTERVAL '20 days', NOW() - INTERVAL '4 days'),
(6, 'Moreau', 'Lucas', 'lucas.moreau@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1990-06-08', 2, NOW() - INTERVAL '25 days', NOW() - INTERVAL '5 days'),
(7, 'Simon', 'Léa', 'lea.simon@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1993-04-17', 2, NOW() - INTERVAL '30 days', NOW() - INTERVAL '6 days'),
(8, 'Laurent', 'Hugo', 'hugo.laurent@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1987-09-22', 2, NOW() - INTERVAL '35 days', NOW() - INTERVAL '7 days'),
(9, 'Lefebvre', 'Manon', 'manon.lefebvre@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1991-12-03', 2, NOW() - INTERVAL '40 days', NOW() - INTERVAL '8 days'),
(10, 'Michel', 'Liam', 'liam.michel@example.com', '$2a$11$nbG8mYk5OORWfY36O74c4OQ5rY8WPKMQRd21.a05sKnP.lV2Jj.Qu', '1994-07-14', 2, NOW() - INTERVAL '45 days', NOW() - INTERVAL '9 days');

-- Insertion des catégories
INSERT INTO "Categories" ("Id", "Name", "Description", "IsActive")
VALUES
(1, 'Bien-être', 'Articles sur le bien-être et la santé mentale', true),
(2, 'Méditation', 'Techniques de méditation et conseils pratiques', true),
(3, 'Respiration', 'Exercices de respiration et leurs bienfaits', true),
(4, 'Mindfulness', 'Pratiques de pleine conscience au quotidien', true),
(5, 'Yoga', 'Postures et philosophie du yoga', true),
(6, 'Santé', 'Conseils pour prendre soin de sa santé physique et mentale', true),
(7, 'Sommeil', 'Améliorer la qualité de son sommeil', true),
(8, 'Relaxation', 'Techniques de relaxation et de gestion du stress', true),
(9, 'Nutrition', 'Alimentation équilibrée pour le corps et l'esprit', true),
(10, 'Développement personnel', 'Ressources pour grandir et s'épanouir', true);

-- Insertion des articles
INSERT INTO "Articles" ("Id", "Title", "Content", "ImageUrl", "CreatedAt", "UpdatedAt", "IsActive", "UserId", "CategoryId")
VALUES
(1, '5 habitudes quotidiennes pour améliorer votre bien-être', 
   'Le bien-être n\'est pas un état que l\'on atteint du jour au lendemain, mais plutôt un processus continu qui nécessite des habitudes régulières. Voici 5 habitudes simples que vous pouvez intégrer à votre quotidien pour améliorer votre bien-être global:

1. **Pratiquer la gratitude**: Prenez quelques minutes chaque jour pour noter trois choses pour lesquelles vous êtes reconnaissant. Cette pratique simple recentre votre attention sur les aspects positifs de votre vie.

2. **Bouger quotidiennement**: L\'activité physique libère des endorphines, ces hormones du bonheur. Même 15 minutes de marche peuvent faire une différence significative sur votre humeur.

3. **Limiter le temps d\'écran**: Fixez-vous des périodes sans écran, particulièrement avant le coucher. Cela améliore la qualité du sommeil et réduit l\'anxiété.

4. **Pratiquer la respiration consciente**: Quelques minutes de respiration profonde et contrôlée peuvent réduire significativement votre niveau de stress.

5. **Cultiver les connexions sociales**: Prenez le temps d\'entretenir vos relations. Le soutien social est l\'un des facteurs les plus importants du bien-être psychologique.

En intégrant ces habitudes simples à votre routine quotidienne, vous constaterez une amélioration progressive de votre bien-être général.',
   'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
   NOW() - INTERVAL '30 days',
   NOW() - INTERVAL '25 days',
   true,
   2,
   1),
   
(2, 'La technique de respiration 4-7-8 pour calmer l\'anxiété',
   'La respiration est un outil puissant que nous avons toujours à notre disposition. La technique de respiration 4-7-8, développée par le Dr. Andrew Weil, est particulièrement efficace pour calmer rapidement le système nerveux et réduire l\'anxiété.

### Comment pratiquer la respiration 4-7-8

1. **Position**: Asseyez-vous confortablement, le dos droit.
2. **Préparation**: Placez le bout de votre langue contre le tissu juste derrière vos incisives supérieures.
3. **Expiration**: Expirez complètement par la bouche, en faisant un son de souffle.
4. **La séquence**:
   - Inspirez silencieusement par le nez en comptant jusqu\'à 4.
   - Retenez votre souffle en comptant jusqu\'à 7.
   - Expirez complètement par la bouche en comptant jusqu\'à 8.

Répétez ce cycle trois ou quatre fois lors de vos premières pratiques, puis augmentez progressivement jusqu\'à huit cycles.

### Pourquoi cela fonctionne

Cette technique agit comme un tranquillisant naturel pour le système nerveux. En forçant votre respiration à ralentir, vous déclenchez une réponse de relaxation dans votre corps. La rétention du souffle permet d\'augmenter les niveaux d\'oxygène dans votre sang, ce qui a un effet calmant sur votre système nerveux.

Pratiquez cette technique deux fois par jour pour des résultats optimaux, et utilisez-la dès que vous vous sentez anxieux ou stressé.',
   'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b',
   NOW() - INTERVAL '28 days',
   NOW() - INTERVAL '26 days',
   true,
   2,
   3),
   
(3, 'Débuter la méditation : guide pour les débutants',
   'La méditation est une pratique millénaire qui offre de nombreux bienfaits pour la santé mentale et physique. Si vous êtes débutant, voici un guide simple pour commencer votre pratique de méditation.

### Par où commencer

1. **Trouvez un espace calme**: Choisissez un endroit où vous ne serez pas dérangé pendant votre pratique.

2. **Adoptez une position confortable**: Asseyez-vous sur une chaise ou un coussin, le dos droit mais sans tension. Vous pouvez également vous allonger si cela est plus confortable.

3. **Commencez par des sessions courtes**: 5 minutes suffisent pour débuter. Vous pourrez augmenter progressivement la durée.

4. **Concentrez-vous sur votre respiration**: Observez simplement le flux naturel de votre respiration sans tenter de la modifier.

5. **Accueillez vos pensées sans jugement**: Lorsque votre esprit vagabonde (ce qui est normal), remarquez-le gentiment et ramenez votre attention sur votre respiration.

### Approches simples pour débutants

- **Méditation guidée**: Utilisez des applications comme Petit BamBou, Calm ou Headspace qui proposent des méditations guidées pour débutants.

- **Méditation de la pleine conscience**: Concentrez-vous sur vos sensations corporelles, votre respiration et les sons autour de vous.

- **Scan corporel**: Portez progressivement votre attention sur chaque partie de votre corps, des orteils jusqu\'à la tête.

### Conseils pour persévérer

- **Pratiquez régulièrement**: Même quelques minutes par jour valent mieux qu\'une longue session occasionnelle.
- **Soyez patient**: Les bienfaits de la méditation se développent avec le temps.
- **Ne vous jugez pas**: Il n\'y a pas de "bonne" ou "mauvaise" méditation.

La méditation est un voyage personnel. Avec de la patience et de la régularité, vous découvrirez progressivement ses nombreux bienfaits.',
   'https://images.unsplash.com/photo-1593164842264-854604db2260',
   NOW() - INTERVAL '25 days',
   NOW() - INTERVAL '24 days',
   true,
   3,
   2),
   
(4, 'La pleine conscience au travail : améliorer sa concentration',
   'Dans notre environnement professionnel moderne, marqué par les distractions constantes, la pleine conscience (mindfulness) peut être un outil précieux pour améliorer la concentration et la productivité.

### Qu\'est-ce que la pleine conscience au travail?

La pleine conscience au travail consiste à porter délibérément votre attention sur le moment présent, sur votre tâche actuelle, sans vous laisser distraire par les pensées concernant le passé ou le futur, les notifications ou les interruptions.

### Exercices de pleine conscience pour le bureau

1. **La minute de respiration**: Avant de commencer une nouvelle tâche, prenez une minute pour respirer profondément et intentionnellement, en vous concentrant uniquement sur votre respiration.

2. **Travail mono-tâche**: Choisissez consciemment de vous concentrer sur une seule tâche à la fois. Désactivez les notifications et créez des blocs de temps dédiés à des tâches spécifiques.

3. **Transition consciente**: Lors du passage d\'une tâche à une autre, prenez un moment pour respirer et reconnaître consciemment que vous changez d\'activité.

4. **Écoute active**: Pendant les réunions, pratiquez l\'écoute attentive en vous concentrant pleinement sur la personne qui parle, sans préparer mentalement votre réponse.

5. **Pauses mindful**: Intégrez de courtes pauses conscientes dans votre journée. Éloignez-vous de votre écran, respirez profondément et observez vos sensations corporelles.

### Bénéfices de la pleine conscience au travail

- **Amélioration de la concentration**: Capacité accrue à rester focalisé sur les tâches importantes.
- **Réduction du stress**: Diminution des niveaux de cortisol et d\'anxiété liés au travail.
- **Meilleure prise de décision**: Clarté mentale accrue pour des décisions plus réfléchies.
- **Relations professionnelles améliorées**: Communication plus efficace et empathique.
- **Créativité renforcée**: Ouverture mentale favorable à l\'innovation.

En intégrant progressivement ces pratiques dans votre quotidien professionnel, vous cultiverez un environnement de travail plus serein et productif.',
   'https://images.unsplash.com/photo-1616699002805-0741e1e4a9c5',
   NOW() - INTERVAL '20 days',
   NOW() - INTERVAL '18 days',
   true,
   3,
   4),
   
(5, 'Le yoga pour débutants : par où commencer',
   'Le yoga est une pratique millénaire qui combine postures physiques, techniques de respiration et méditation. Pour les débutants, il peut parfois sembler intimidant de se lancer. Voici un guide simple pour bien démarrer votre pratique du yoga.

### Choisir le style de yoga adapté aux débutants

1. **Hatha Yoga**: Style doux et accessible, idéal pour apprendre les bases et les alignements corrects.
2. **Yoga Vinyasa doux**: Enchaînements fluides mais adaptés aux débutants.
3. **Yoga Iyengar**: Accent mis sur la précision et l\'alignement, souvent avec des accessoires.
4. **Yoga Restauratif**: Très doux, avec des postures maintenues longtemps, parfait pour la relaxation.

### Équipement essentiel pour commencer

- Un tapis de yoga antidérapant
- Des vêtements confortables qui permettent une liberté de mouvement
- Éventuellement: bloc de yoga, sangle, couverture

### 5 postures de base pour débuter

1. **La montagne (Tadasana)**: Position debout, base de nombreuses postures.
2. **La posture de l\'enfant (Balasana)**: Posture de repos et de récupération.
3. **Le chien tête en bas (Adho Mukha Svanasana)**: Posture fondamentale qui étire tout le corps.
4. **La posture du cobra (Bhujangasana)**: Renforce le dos et ouvre la poitrine.
5. **La posture du guerrier I (Virabhadrasana I)**: Développe force et stabilité.

### Conseils pour débutants

- **Commencez doucement**: 10-15 minutes par jour suffisent pour débuter.
- **Respectez votre corps**: Ne forcez jamais jusqu\'à la douleur.
- **Soyez régulier**: La régularité est plus importante que la durée.
- **Respirez consciemment**: La respiration est au cœur de la pratique.
- **Suivez un cours**: Si possible, prenez quelques cours avec un professeur qualifié pour apprendre les bases correctement.

Le yoga est un voyage personnel, pas une compétition. Avec patience et persévérance, vous découvrirez ses nombreux bienfaits pour le corps et l\'esprit.',
   'https://images.unsplash.com/photo-1602192509154-0b900ee1f851',
   NOW() - INTERVAL '18 days',
   NOW() - INTERVAL '15 days',
   true,
   4,
   5),
   
(6, 'Renforcer son système immunitaire naturellement',
   'Un système immunitaire fort est votre meilleure défense contre les maladies. Heureusement, de nombreuses habitudes et choix de vie peuvent naturellement renforcer vos défenses immunitaires.

### Alimentation pour l\'immunité

1. **Aliments riches en vitamine C**: Agrumes, kiwis, poivrons, baies, brocoli.
2. **Sources de zinc**: Fruits de mer, viandes, légumineuses, graines de citrouille.
3. **Aliments fermentés**: Yaourt, kéfir, choucroute, kimchi pour une flore intestinale saine.
4. **Ail et oignon**: Contiennent des composés antiseptiques naturels.
5. **Aliments anti-inflammatoires**: Curcuma, gingembre, baies, poissons gras.

### Mode de vie fortifiant

1. **Sommeil réparateur**: Visez 7-8 heures de sommeil de qualité par nuit.
2. **Activité physique régulière**: 30 minutes d\'exercice modéré quotidien stimule la circulation des cellules immunitaires.
3. **Gestion du stress**: Méditation, yoga, respiration profonde (le stress chronique affaiblit l\'immunité).
4. **Hydratation**: Buvez suffisamment d\'eau pour maintenir les muqueuses humides, première barrière contre les pathogènes.
5. **Exposition solaire modérée**: Pour la production de vitamine D, essentielle au bon fonctionnement immunitaire.

### Habitudes à adopter

- **Lavage des mains régulier**: Simple mais efficace pour réduire l\'exposition aux pathogènes.
- **Éviter les toxines**: Limitez l\'alcool, le tabac et les aliments ultra-transformés.
- **Contact avec la nature**: Passer du temps en forêt ou dans des espaces verts renforce l\'immunité.
- **Rire et connexions sociales**: Les liens sociaux positifs et le rire sont associés à une meilleure immunité.

Renforcer son système immunitaire est un processus continu qui repose sur un mode de vie équilibré plutôt que sur une solution miracle. En adoptant ces habitudes au quotidien, vous donnerez à votre corps les meilleures chances de rester en bonne santé.',
   'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
   NOW() - INTERVAL '15 days',
   NOW() - INTERVAL '14 days',
   true,
   2,
   6),
   
(7, '7 conseils pour un sommeil réparateur',
   'Un sommeil de qualité est fondamental pour notre santé physique et mentale. Voici 7 conseils scientifiquement prouvés pour améliorer la qualité de votre sommeil.

### 1. Respectez un horaire régulier

Couchez-vous et levez-vous à des heures similaires tous les jours, même le week-end. Cette régularité renforce votre horloge biologique interne.

### 2. Créez un environnement propice au sommeil

- **Température**: Maintenez votre chambre entre 16-18°C.
- **Obscurité**: Utilisez des rideaux occultants ou un masque de sommeil.
- **Silence**: Réduisez les bruits ou utilisez des bouchons d\'oreilles ou un bruit blanc.
- **Confort**: Investissez dans une literie de qualité adaptée à vos besoins.

### 3. Limitez l\'exposition aux écrans avant le coucher

La lumière bleue des écrans supprime la production de mélatonine, l\'hormone du sommeil. Évitez les écrans au moins 1h avant de vous coucher.

### 4. Adoptez une routine d\'endormissement

Créez un rituel relaxant avant le coucher: lecture, méditation, étirements doux, bain chaud... Votre cerveau associera ces activités au moment de dormir.

### 5. Surveillez votre alimentation et hydratation

- Évitez la caféine 6h avant le coucher.
- Limitez l\'alcool qui perturbe les cycles de sommeil.
- Ne mangez pas de repas lourds tard le soir.
- Hydratez-vous suffisamment dans la journée, mais réduisez les liquides en soirée.

### 6. Pratiquez une activité physique régulière

L\'exercice favorise un sommeil plus profond, mais évitez les activités intenses dans les 2h précédant le coucher.

### 7. Gérez le stress et l\'anxiété

- Pratiquez des techniques de relaxation comme la respiration profonde ou la méditation.
- Notez vos préoccupations sur un papier avant de vous coucher pour "libérer" votre esprit.
- Utilisez des techniques de pleine conscience pour calmer un mental agité.

En intégrant progressivement ces habitudes à votre quotidien, vous constaterez une amélioration significative de la qualité de votre sommeil et, par conséquent, de votre bien-être général.',
   'https://images.unsplash.com/photo-1465101162946-4377e57745c3',
   NOW() - INTERVAL '12 days',
   NOW() - INTERVAL '10 days',
   true,
   3,
   7),
   
(8, 'Techniques de relaxation musculaire progressive',
   'La relaxation musculaire progressive est une technique efficace pour réduire le stress et l\'anxiété en relâchant systématiquement les tensions corporelles. Développée dans les années 1930 par le Dr. Edmund Jacobson, cette méthode s\'appuie sur le principe que la relaxation physique entraîne la relaxation mentale.

### Comment pratiquer la relaxation musculaire progressive

**Préparation**:
- Trouvez un endroit calme où vous ne serez pas dérangé.
- Installez-vous confortablement, assis ou allongé.
- Portez des vêtements confortables et retirez chaussures, lunettes ou lentilles.

**La technique en 5 étapes**:

1. **Respiration profonde initiale**:
   - Inspirez lentement par le nez pendant 4 secondes.
   - Retenez votre souffle pendant 2 secondes.
   - Expirez doucement par la bouche pendant 6 secondes.
   - Répétez 3 fois.

2. **Cycle tension-relâchement**:
   Pour chaque groupe musculaire:
   - Contractez les muscles pendant 5-7 secondes (tension modérée, sans douleur).
   - Relâchez soudainement et complètement.
   - Notez la différence de sensation pendant 15-20 secondes.

3. **Séquence des groupes musculaires**:
   - Mains et avant-bras: serrez les poings.
   - Haut des bras: poussez les coudes contre le corps.
   - Visage: froncez les sourcils, plissez les yeux, serrez la mâchoire.
   - Cou et épaules: haussez les épaules vers les oreilles.
   - Poitrine et abdomen: contractez en inspirant profondément.
   - Jambes et pieds: tendez les jambes, pointez les orteils vers vous puis loin de vous.

4. **Vérification corporelle finale**:
   - Parcourez mentalement votre corps pour identifier d\'éventuelles tensions résiduelles.
   - Si vous en trouvez, répétez le cycle tension-relâchement pour cette zone.

5. **Retour progressif**:
   - Prenez conscience de votre environnement.
   - Bougez doucement les extrémités.
   - Ouvrez les yeux lentement.

### Bénéfices et applications

- **Réduction immédiate du stress physiologique**
- **Amélioration de la conscience corporelle**
- **Aide à l\'endormissement**
- **Outil de gestion de la douleur chronique**
- **Complément aux thérapies psychologiques**

Pratiquez cette technique 10-15 minutes quotidiennement pour des résultats optimaux. Avec l\'expérience, vous pourrez l\'utiliser rapidement dans des situations stressantes.',
   'https://images.unsplash.com/photo-1499209974431-9dddcece7f88',
   NOW() - INTERVAL '10 days',
   NOW() - INTERVAL '8 days',
   true,
   3,
   8),
   
(9, 'Les aliments qui favorisent la bonne humeur',
   'Ce que nous mangeons influence non seulement notre santé physique, mais aussi notre humeur et notre bien-être mental. Certains aliments contiennent des nutriments qui peuvent naturellement stimuler la production de neurotransmetteurs liés au bonheur et à la détente.

### Aliments riches en sérotonine et précurseurs

La sérotonine, souvent appelée "hormone du bonheur", joue un rôle clé dans la régulation de l\'humeur. Ces aliments favorisent sa production:

- **Bananes**: Contiennent du tryptophane et des vitamines B6, nécessaires à la synthèse de la sérotonine.
- **Ananas**: Riche en tryptophane et en bromélaïne qui réduit l\'inflammation.
- **Noix et graines**: Particulièrement les noix du Brésil, amandes et graines de chia.
- **Œufs**: Source de protéines, vitamines B et D, tous importants pour la santé mentale.
- **Légumineuses**: Lentilles, pois chiches et haricots riches en protéines végétales et fibres.

### Aliments riches en oméga-3

Les acides gras oméga-3 sont essentiels pour la santé cérébrale et ont été associés à une réduction des symptômes dépressifs:

- **Poissons gras**: Saumon, maquereau, sardines, truite.
- **Graines de lin et de chia**: Excellentes sources végétales d\'oméga-3.
- **Huile de colza et noix**: Alternatives pratiques à intégrer dans l\'alimentation quotidienne.

### Aliments probiotiques pour l\'axe intestin-cerveau

La recherche démontre un lien fort entre notre flore intestinale et notre santé mentale:

- **Yaourt nature et kéfir**: Sources de probiotiques vivants.
- **Choucroute et kimchi**: Légumes fermentés riches en probiotiques.
- **Kombucha**: Boisson fermentée bénéfique pour le microbiome.

### Autres aliments "bonne humeur"

- **Chocolat noir** (70% cacao minimum): Contient des flavonoïdes et stimule la production d\'endorphines.
- **Agrumes**: Riches en vitamine C qui aide à réduire le stress oxydatif.
- **Curcuma**: Contient de la curcumine aux propriétés anti-inflammatoires.
- **Thé vert**: Contient de la L-théanine qui favorise la relaxation sans somnolence.

### Habitudes alimentaires pour une humeur stable

- Maintenir une glycémie stable en évitant les sucres raffinés et en privilégiant les glucides complexes.
- Manger à intervalles réguliers pour éviter les variations d\'humeur liées à la faim.
- S\'hydrater suffisamment, la déshydratation pouvant affecter l\'humeur et les fonctions cognitives.

Intégrer ces aliments dans une alimentation équilibrée peut contribuer significativement à votre bien-être émotionnel. Rappelez-vous que l\'alimentation est un facteur parmi d\'autres qui influencent notre humeur.',
   'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
   NOW() - INTERVAL '8 days',
   NOW() - INTERVAL '5 days',
   true,
   4,
   9),
   
(10, 'Comment cultiver la gratitude au quotidien',
    'La gratitude est bien plus qu\'un simple sentiment de reconnaissance - c\'est une pratique qui, cultivée régulièrement, peut transformer profondément notre perception du monde et notre bien-être général. Des recherches en psychologie positive ont démontré ses nombreux bienfaits sur la santé mentale et physique.

### Les bienfaits de la gratitude

- **Amélioration du bien-être émotionnel**: Réduction des symptômes de dépression et d\'anxiété.
- **Renforcement des relations sociales**: Meilleure appréciation des autres et des liens plus profonds.
- **Meilleur sommeil**: Pratiquer la gratitude avant le coucher peut améliorer la qualité du sommeil.
- **Réduction du stress**: Réorientation de l\'attention des soucis vers les aspects positifs de la vie.
- **Augmentation de la résilience**: Capacité accrue à faire face aux défis et à l\'adversité.

### Pratiques quotidiennes de gratitude

1. **Le journal de gratitude**:
   - Prenez 5 minutes chaque jour pour noter 3 choses pour lesquelles vous êtes reconnaissant.
   - Soyez spécifique et inclure des détails sur le pourquoi et le comment.
   - Variez entre des événements quotidiens (un bon café) et des éléments plus profonds (relations, santé).

2. **La méditation de gratitude**:
   - Asseyez-vous confortablement et fermez les yeux.
   - Respirez profondément et laissez votre esprit se concentrer sur les personnes et les choses qui enrichissent votre vie.
   - Ressentez pleinement la reconnaissance dans votre corps.

3. **Les lettres de gratitude**:
   - Écrivez une lettre à quelqu\'un qui a eu un impact positif sur votre vie.
   - L\'acte d\'écrire est thérapeutique, même si vous ne l\'envoyez pas.
   - Si possible, lisez-la en personne à son destinataire pour un impact émotionnel plus fort.

4. **La boîte à souvenirs reconnaissants**:
   - Gardez une boîte où vous déposez des notes sur des moments de joie ou de gratitude.
   - Lors des périodes difficiles, revisitez ces souvenirs positifs.

5. **L\'attention consciente au quotidien**:
   - Prenez l\'habitude de remarquer les petites choses positives habituellement ignorées.
   - Prenez une "pause gratitude" pendant la journée pour apprécier consciemment le moment présent.

### Surmonter les obstacles à la gratitude

- **Dans les moments difficiles**: Reconnaître que la gratitude n\'est pas l\'absence de difficultés, mais la capacité à voir au-delà d\'elles.
- **Face au négativisme**: Contrer le biais négatif naturel de notre cerveau par une pratique délibérée de la reconnaissance.
- **Pour éviter la routine**: Varier vos pratiques de gratitude pour qu\'elles restent fraîches et significatives.

La gratitude est une compétence qui se développe avec la pratique. En l\'intégrant consciemment dans votre quotidien, vous cultiverez progressivement un état d\'esprit plus positif et épanouissant.',
    'https://images.unsplash.com/photo-1563178406-4cdc2923acbc',
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '3 days',
    true,
    2,
    10);
    
-- Insertion des exercices de respiration
INSERT INTO "RespirationExercises" ("Id", "Name", "InspirationDuration", "HoldDuration", "ExpirationDuration", "Description", "IsDefault")
VALUES
(1, '748', 7, 4, 8, 'Inspiration: 7 secondes / Apnée: 4 secondes / Expiration: 8 secondes', true),
(2, '55', 5, 0, 5, 'Inspiration: 5 secondes / Apnée: 0 secondes / Expiration: 5 secondes', true),
(3, '46', 4, 0, 6, 'Inspiration: 4 secondes / Apnée: 0 secondes / Expiration: 6 secondes', true); 
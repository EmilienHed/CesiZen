-- Script pour ajouter plus d'articles

-- Articles pour l'auteur Jean Dubois (UserId=2)
INSERT INTO "Articles" ("Title", "Content", "ImageUrl", "CreatedAt", "UpdatedAt", "IsActive", "UserId", "CategoryId")
VALUES
('Comment méditer efficacement en 10 minutes par jour', 
 'Méditer 10 minutes par jour suffit pour profiter des bienfaits de la méditation. Voici comment:

1. Choisissez le bon moment: le matin au réveil ou le soir avant de dormir
2. Trouvez un endroit calme
3. Installez-vous confortablement, dos droit
4. Réglez un minuteur sur 10 minutes
5. Respirez naturellement
6. Concentrez-vous sur votre respiration
7. Quand votre esprit s''égare, ramenez doucement votre attention
8. Soyez bienveillant envers vous-même

Avec une pratique régulière, même courte, vous verrez rapidement des changements positifs!',
 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
 NOW() - INTERVAL '27 days',
 NOW() - INTERVAL '27 days',
 true,
 2,
 2),

('Yoga du matin: 5 postures pour bien démarrer la journée', 
 'Routine de yoga matinal en 15 minutes:

1. Salutation au soleil (Surya Namaskar): 3 répétitions pour réveiller le corps
2. Posture de l''arbre (Vrksasana): améliore l''équilibre et la concentration
3. Guerrier II (Virabhadrasana II): renforce les jambes et ouvre les hanches
4. Pince debout (Uttanasana): étire le dos et les ischio-jambiers
5. Posture de l''enfant (Balasana): apaise le système nerveux

Pratiquez cet enchaînement chaque matin pour plus d''énergie, de clarté mentale et de souplesse.',
 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b',
 NOW() - INTERVAL '22 days',
 NOW() - INTERVAL '21 days',
 true,
 2,
 5),

('Les superaliments à intégrer dans votre alimentation quotidienne', 
 'Superaliments accessibles pour renforcer votre alimentation:

1. Myrtilles: antioxydants, vitamines C et K
2. Épinards: fer, vitamines A, C et K
3. Graines de chia: oméga-3, fibres et protéines
4. Curcuma: anti-inflammatoire naturel (ajouter du poivre noir pour l''absorption)
5. Noix: acides gras essentiels et protéines végétales
6. Avocat: graisses saines, fibres et potassium
7. Lentilles: protéines, fer et fibres
8. Saumon sauvage: oméga-3 et protéines de qualité

Intégrez ces aliments progressivement sans réformer brutalement votre alimentation.',
 'https://images.unsplash.com/photo-1490818387583-1baba5e638af',
 NOW() - INTERVAL '18 days',
 NOW() - INTERVAL '18 days',
 true,
 2,
 9),

-- Articles pour l'auteur Sophie Martin (UserId=3)
('Les bienfaits insoupçonnés de la marche quotidienne', 
 'La marche est l''exercice le plus accessible et pourtant sous-estimé. Ses bienfaits:

• Santé cardiaque: réduit la tension artérielle et le risque de maladies cardiovasculaires
• Poids: maintien d''un poids sain, aide à brûler des calories
• Mental: réduit l''anxiété et les symptômes dépressifs
• Créativité: stimule la pensée divergente et les idées nouvelles
• Digestion: favorise le transit intestinal
• Immunité: renforce les défenses naturelles
• Longévité: associée à une espérance de vie plus longue

Comment l''intégrer:
• Commencez par 10 minutes par jour
• Visez progressivement 30 minutes quotidiennes
• Marchez pendant votre pause déjeuner
• Garez-vous plus loin ou descendez un arrêt plus tôt
• Prenez les escaliers quand possible',
 'https://images.unsplash.com/photo-1487956382158-bb926046304a',
 NOW() - INTERVAL '16 days',
 NOW() - INTERVAL '15 days',
 true,
 3,
 6),

('Comment pratiquer la pleine conscience dans les moments difficiles', 
 'La pleine conscience est particulièrement utile pendant les moments de stress:

1. Technique STOP
   • S: Stop, faites une pause
   • T: Take a breath, prenez une respiration
   • O: Observe, observez vos sensations, émotions et pensées
   • P: Proceed, continuez avec plus de clarté

2. Scanner les sensations corporelles
   • Observez où se manifeste votre stress physiquement
   • Respirez vers ces zones tendues
   • Acceptez ces sensations sans jugement

3. Pratiquer l''ancrage dans les 5 sens
   • Nommez 5 choses que vous voyez
   • 4 choses que vous pouvez toucher
   • 3 choses que vous entendez
   • 2 choses que vous sentez
   • 1 chose que vous goûtez

Ces techniques simples vous aident à revenir au moment présent et à réduire la réactivité émotionnelle.',
 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
 NOW() - INTERVAL '14 days',
 NOW() - INTERVAL '13 days',
 true,
 3,
 4),

('Les phases du sommeil et leur importance pour la récupération', 
 'Comprendre les cycles du sommeil pour mieux récupérer:

1. Phase d''endormissement (N1): transition veille-sommeil, 5-10 minutes
   • Sensibilité aux perturbations, sursauts possibles

2. Sommeil léger (N2): 50% du temps de sommeil total
   • Température corporelle baisse, rythme cardiaque ralentit
   • Consolidation des apprentissages et mémoire procédurale

3. Sommeil profond (N3): 20% du temps de sommeil total
   • Phase cruciale pour la récupération physique
   • Production d''hormone de croissance
   • Renforcement du système immunitaire
   • Consolidation de la mémoire déclarative

4. Sommeil paradoxal (REM): 20-25% du temps de sommeil total
   • Activité cérébrale intense, rêves vivaces
   • Traitement émotionnel et consolidation de la mémoire
   • Créativité et résolution de problèmes

Un cycle complet dure environ 90 minutes et se répète 4-5 fois par nuit. Privilégiez un sommeil ininterrompu pour bénéficier de tous les cycles.',
 'https://images.unsplash.com/photo-1465101162946-4377e57745c3',
 NOW() - INTERVAL '11 days',
 NOW() - INTERVAL '10 days',
 true,
 3,
 7),

-- Articles pour l'auteur Thomas Petit (UserId=4)
('5 exercices de respiration pour les débutants', 
 'Exercices simples de respiration à pratiquer quotidiennement:

1. Respiration abdominale: base de toute pratique respiratoire
   • Allongé ou assis, une main sur le ventre
   • Inspirez par le nez en gonflant le ventre
   • Expirez lentement par la bouche
   • 5-10 respirations, 3 fois par jour

2. Respiration 4-4-4-4 (carrée):
   • Inspirez sur 4 temps
   • Retenez sur 4 temps
   • Expirez sur 4 temps
   • Retenez poumons vides sur 4 temps
   • Répétez 5 fois

3. Respiration alternée (Nadi Shodhana):
   • Pouce droit ferme narine droite, inspirez par la gauche
   • Annulaire droit ferme narine gauche, expirez par la droite
   • Inspirez par la droite, expirez par la gauche
   • Répétez 5 cycles

4. Respiration apaisante 4-7-8:
   • Inspirez par le nez sur 4 temps
   • Retenez sur 7 temps
   • Expirez doucement par la bouche sur 8 temps
   • Répétez 4 fois

5. Expiration prolongée (1:2):
   • Inspirez sur 4 temps
   • Expirez sur 8 temps (double de l''inspiration)
   • Aide à activer le système parasympathique',
 'https://images.unsplash.com/photo-1475938476802-32a7e851dad1',
 NOW() - INTERVAL '9 days',
 NOW() - INTERVAL '8 days',
 true,
 4,
 3),

('Comment créer un espace de bien-être chez soi', 
 'Aménagez votre espace de vie pour favoriser le bien-être:

1. Désencombrez
   • Éliminez le superflu pour libérer l''espace et l''esprit
   • Principe: chaque objet doit avoir son utilité ou vous apporter de la joie

2. Créez un coin méditation/détente
   • Espace dédié, même petit (coin de pièce)
   • Coussin confortable, plante, bougie
   • Lumière naturelle si possible

3. Intégrez des éléments naturels
   • Plantes d''intérieur purifiant l''air (Pothos, Aloe Vera, Ficus)
   • Bois et matières naturelles
   • Pierres ou cristaux selon vos préférences

4. Optimisez la lumière
   • Maximisez la lumière naturelle
   • Éclairage doux et chaleureux pour les soirées
   • Évitez les lumières bleues et crues

5. Créez une ambiance sonore apaisante
   • Limitez les bruits parasites
   • Musique relaxante, sons de la nature
   • Fontaine d''eau pour son effet apaisant

6. Intégrez des odeurs agréables
   • Huiles essentielles (lavande, orange douce)
   • Encens naturels
   • Bougies non toxiques

7. Limitez les écrans
   • Désignez des zones sans écrans
   • Créez un espace dédié à la lecture',
 'https://images.unsplash.com/photo-1564078516393-cf04bd966897',
 NOW() - INTERVAL '7 days',
 NOW() - INTERVAL '6 days',
 true,
 4,
 1),

('L''impact de la gratitude sur la santé mentale et physique', 
 'La gratitude: un levier puissant pour la santé globale

Bénéfices mentaux démontrés:
• Réduction des symptômes d''anxiété et de dépression
• Amélioration de l''estime de soi
• Plus grande résilience face aux traumatismes
• Meilleure qualité relationnelle
• Satisfaction de vie accrue

Bénéfices physiques:
• Amélioration de la qualité du sommeil
• Diminution de la pression artérielle
• Renforcement du système immunitaire
• Réduction des douleurs chroniques
• Moins de symptômes inflammatoires

Pratiques de gratitude accessibles:
• Journal quotidien: notez 3 éléments positifs chaque soir
• Lettres de gratitude: écrivez à des personnes qui vous ont impacté
• Méditation de gratitude: 5 minutes pour ressentir la reconnaissance
• Visualisation positive: imaginez ce qui irait mal sans les éléments positifs actuels
• Ancrage dans le présent: prenez conscience des petits plaisirs quotidiens',
 'https://images.unsplash.com/photo-1447619297994-b829cc1ab44a',
 NOW() - INTERVAL '5 days',
 NOW() - INTERVAL '4 days',
 true,
 4,
 10);

-- Encore quelques articles supplémentaires (2 par auteur)
INSERT INTO "Articles" ("Title", "Content", "ImageUrl", "CreatedAt", "UpdatedAt", "IsActive", "UserId", "CategoryId")
VALUES
-- Auteur Jean Dubois (UserId=2)
('Bain de forêt: les bénéfices de la sylvothérapie', 
 'Le bain de forêt, ou shinrin-yoku en japonais, est une pratique qui consiste à s''immerger consciemment dans l''atmosphère forestière. Ses bienfaits sont nombreux:

• Réduction du stress: baisse du cortisol et de l''activité du système nerveux sympathique
• Renforcement immunitaire: augmentation des cellules NK (Natural Killer)
• Amélioration de l''humeur: réduction des sentiments de dépression et d''anxiété
• Stimulation de la créativité: l''environnement naturel favorise la pensée divergente
• Baisse de la tension artérielle: effet hypotenseur démontré
• Amélioration de la concentration: effet restaurateur de l''attention

Comment pratiquer:
• Choisissez une forêt ou un parc boisé
• Laissez vos appareils électroniques
• Marchez lentement, sans but précis
• Ouvrez vos sens (écoutez, touchez, sentez)
• Respirez profondément
• Pratiquez 2 heures idéalement, mais même 20 minutes sont bénéfiques',
 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
 NOW() - INTERVAL '20 days',
 NOW() - INTERVAL '19 days',
 true,
 2,
 8),

('L''alimentation intuitive: retrouver une relation saine avec la nourriture', 
 'L''alimentation intuitive est une approche qui vous reconnecte à vos signaux corporels naturels de faim et de satiété.

Principes fondamentaux:
1. Rejeter la mentalité de régime: abandonner les restrictions qui mènent aux cycles restriction/excès
2. Honorer sa faim: reconnaître et répondre aux premiers signaux de faim
3. Faire la paix avec les aliments: aucun aliment n''est interdit
4. Challenger le "policier alimentaire": abandonner les jugements sur les "bons" et "mauvais" aliments
5. Découvrir la satisfaction: prendre plaisir à manger est essentiel
6. Respecter la satiété: écouter les signaux indiquant que vous êtes rassasié
7. Gérer les émotions sans nourriture: développer des stratégies alternatives
8. Respecter son corps: accepter sa génétique et sa morphologie
9. Exercice physique par plaisir: bouger pour se sentir bien, pas pour brûler des calories
10. Nutrition bienveillante: choisir des aliments qui vous font sentir bien

Comment commencer:
• Mangez sans distractions
• Prenez le temps de savourer
• Évaluez votre faim avant, pendant et après le repas
• Observez sans juger comment différents aliments vous font sentir',
 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
 NOW() - INTERVAL '17 days',
 NOW() - INTERVAL '16 days',
 true,
 2,
 9),

-- Auteur Sophie Martin (UserId=3)
('Comment réduire le stress au travail grâce à la pleine conscience', 
 'Intégrer la pleine conscience dans votre quotidien professionnel:

• Commencez la journée consciemment (5 min de respiration avant de consulter emails/messages)
• Installez des rappels de pleine conscience (application, alarme discrète)
• Pratique des trois respirations conscientes entre les tâches
• Mangez en pleine conscience (sans écran, en savourant chaque bouchée)
• Marchez en pleine conscience pendant vos pauses
• Écoutez activement lors des réunions et conversations
• Pratiquez la technique S.T.O.P. face aux situations stressantes:
  - Stop: Arrêtez ce que vous faites
  - Take a breath: Prenez une respiration profonde
  - Observe: Observez vos sensations, émotions, pensées
  - Proceed: Continuez avec plus de clarté

Exercice minute:
Quand le stress monte, prenez une minute pour:
1. Sentir les points de contact avec votre chaise/sol
2. Suivre 5 cycles respiratoires complets
3. Observer votre état émotionnel sans jugement',
 'https://images.unsplash.com/photo-1551033406-611cf9a28f67',
 NOW() - INTERVAL '12 days',
 NOW() - INTERVAL '11 days',
 true,
 3,
 4),

('Yoga restauratif: 5 postures pour récupérer après une journée difficile', 
 'Le yoga restauratif utilise des accessoires pour soutenir le corps, permettant un relâchement profond.

Matériel recommandé: couvertures, coussins, blocs de yoga, bolster (ou oreiller ferme)

1. Posture de l''enfant soutenue (Balasana)
   • Bolster ou oreiller sous le torse et la tête
   • Genoux écartés, gros orteils qui se touchent
   • Front reposant sur le support
   • Maintenir 5-10 minutes, respiration profonde

2. Torsion allongée douce
   • Allongé sur le dos, genoux vers la poitrine
   • Laissez les genoux tomber sur un côté, soutenus par des coussins
   • Tête tournée dans la direction opposée
   • Bras en T
   • Maintenir 3-5 minutes de chaque côté

3. Posture des jambes contre le mur (Viparita Karani)
   • Allongé sur le dos, fessier proche du mur
   • Jambes étendues contre le mur
   • Bolster optionnel sous le bassin
   • Maintenir 10-15 minutes

4. Flexion avant assise soutenue
   • Assis jambes tendues, bolster/couvertures sur les jambes
   • Penchez doucement le buste vers l''avant sur le support
   • Tête tournée sur le côté
   • Maintenir 5 minutes, puis changer la direction de la tête

5. Relaxation finale soutenue (Savasana)
   • Allongé sur le dos
   • Petit coussin sous la tête
   • Bolster sous les genoux
   • Couverture pour la chaleur
   • Maintenir 10-15 minutes

Pratique complète: environ 45 minutes, idéalement en soirée.',
 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b',
 NOW() - INTERVAL '8 days',
 NOW() - INTERVAL '7 days',
 true,
 3,
 5),

-- Auteur Thomas Petit (UserId=4)
('Méditation de pleine conscience pour débutants', 
 'Guide pas à pas pour débuter la méditation de pleine conscience:

Pour qui: tous niveaux, particulièrement adapté aux débutants
Durée: commencez par 5 minutes, augmentez progressivement jusqu''à 20 minutes
Fréquence: idéalement quotidienne, même si courte

Préparation:
• Choisir un moment calme (matin ou soir)
• Trouver un lieu tranquille
• Position: assise confortable, dos droit mais détendu
• Minuteur silencieux ou application de méditation

Technique de base en 5 étapes:
1. Installation (30 secondes)
   • Prenez conscience des points de contact avec le sol/siège
   • Redressez doucement la colonne vertébrale
   • Détendez les épaules, la mâchoire, le visage

2. Prise de conscience de la respiration (1-2 minutes)
   • Portez attention au mouvement naturel de la respiration
   • Observez sans modifier (ventre qui se soulève/s''abaisse)
   • Ressentez les sensations aux narines

3. Ancrage dans la respiration (2-3 minutes)
   • Comptez les cycles respiratoires de 1 à 10, puis recommencez
   • Alternative: notez mentalement "inspir" et "expir"

4. Élargissement de la conscience (1-2 minutes)
   • Incluez les sensations corporelles
   • Notez les sons environnants
   • Observez les pensées qui traversent l''esprit

5. Retour au quotidien (30 secondes)
   • Élargissez votre conscience à l''ensemble de la pièce
   • Bougez doucement les doigts, les orteils
   • Prenez quelques respirations profondes avant de terminer

Conseils pour débutants:
• Commencez par des sessions courtes et régulières
• Ne jugez pas votre expérience
• Votre esprit va vagabonder - c''est normal et attendu
• Chaque fois que vous remarquez une distraction, revenez simplement à la respiration
• La constance est plus importante que la durée',
 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c',
 NOW() - INTERVAL '4 days',
 NOW() - INTERVAL '3 days',
 true,
 4,
 2),

('Le pouvoir des rituels quotidiens pour le développement personnel', 
 'Les rituels quotidiens structurent votre journée et créent un sentiment de stabilité et de progression.

Rituels matinaux efficaces:
• Hydratation immédiate (eau avec citron)
• 5-10 minutes de méditation/respiration consciente
• Journaling (intentions du jour, gratitude)
• Mouvement (étirements, yoga, courte marche)
• Lecture inspirante (10-15 minutes)

Rituels pour la journée de travail:
• Commencer par la tâche la plus importante
• Pauses conscientes de 2-3 minutes toutes les 90 minutes
• Respiration profonde avant les réunions importantes
• Déjeuner sans écrans
• Courte marche digestive

Rituels du soir:
• Déconnexion digitale (1h avant le coucher)
• Revue de la journée (3 victoires/apprentissages)
• Préparation de la journée suivante
• Routine d''hygiène consciente
• Lecture légère ou méditation de gratitude

Conseils pour créer et maintenir des rituels:
• Commencez petit (1-2 rituels à la fois)
• Ancrez-les à des activités existantes
• Préparez l''environnement la veille
• Suivez votre progression
• Ajustez selon vos résultats et ressentis

Les rituels ne sont pas rigides - ils évoluent avec vous et vos besoins.',
 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d',
 NOW() - INTERVAL '2 days',
 NOW() - INTERVAL '1 day',
 true,
 4,
 10); 
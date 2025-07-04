-- Script pour ajouter des articles supplémentaires

-- Articles pour l'auteur Jean Dubois (UserId=2)
INSERT INTO "Articles" ("Title", "Content", "ImageUrl", "CreatedAt", "UpdatedAt", "IsActive", "UserId", "CategoryId")
VALUES
('Les bienfaits thérapeutiques de l''écriture quotidienne', 
 'L''écriture thérapeutique est accessible à tous et ses bienfaits sont nombreux:

• Réduction du stress et de l''anxiété
• Clarification des pensées et des émotions
• Gain de perspective sur les situations difficiles
• Renforcement de l''immunité (études du Dr. James Pennebaker)
• Amélioration du sommeil
• Développement de la créativité
• Augmentation de la confiance en soi

Techniques d''écriture thérapeutique:

1. Journal des gratitudes
   • Notez 3-5 éléments pour lesquels vous êtes reconnaissant
   • Soyez précis et détaillé dans vos descriptions
   • Incluez des événements quotidiens simples

2. Écriture expressive
   • Écrivez sur des expériences émotionnellement chargées
   • Explorez vos sentiments sans censure
   • 15-20 minutes, 3-4 jours consécutifs

3. Journal de résolution de problèmes
   • Décrivez un problème actuel
   • Listez toutes les solutions possibles
   • Évaluez chaque option objectivement
   • Établissez un plan d''action

4. Dialogue avec soi-même
   • Écrivez une conversation entre différentes parties de vous
   • Posez des questions à votre "moi sage"
   • Explorez les opinions contradictoires

Pour commencer:
• Écrivez régulièrement (idéalement quotidiennement)
• Ne jugez pas ce que vous écrivez
• Gardez vos écrits privés pour plus d''honnêteté
• Relisez périodiquement pour observer vos progrès',
 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
 NOW() - INTERVAL '3 days',
 NOW() - INTERVAL '3 days',
 true,
 2,
 10),

-- Articles pour l'auteur Sophie Martin (UserId=3)
('Comment développer une routine de soins personnels adaptée à votre type de peau', 
 'Une routine de soins efficace doit être personnalisée selon votre type de peau:

PEAU NORMALE
• Matin: nettoyant doux, tonique hydratant, sérum antioxydant, crème hydratante légère, SPF
• Soir: démaquillant, nettoyant, tonique, sérum (vitamine C ou hyaluronique), crème de nuit
• Hebdomadaire: exfoliation douce, masque hydratant

PEAU SÈCHE
• Matin: nettoyant crémeux sans savon, tonique sans alcool, sérum hydratant, crème riche, SPF
• Soir: huile démaquillante, nettoyant crémeux, tonique hydratant, sérum réparateur, huile faciale ou crème épaisse
• Hebdomadaire: masque nourrissant, pas d''exfoliation mécanique

PEAU GRASSE
• Matin: gel nettoyant, tonique à l''acide salicylique, sérum à la niacinamide, hydratant léger sans huile, SPF matifiant
• Soir: démaquillant, nettoyant, tonique clarifiant, sérum régulateur de sébum, hydratant léger
• Hebdomadaire: masque à l''argile, exfoliation chimique (AHA/BHA)

PEAU MIXTE
• Matin: nettoyant doux, tonique équilibrant, sérum hydratant sur zones sèches, hydratant léger, SPF
• Soir: démaquillant, nettoyant adapté, tonique, sérum ciblé (zones T: contrôle sébum, zones sèches: hydratant), crème légère
• Hebdomadaire: multi-masking (argile sur zone T, hydratant ailleurs)

PEAU SENSIBLE
• Matin: nettoyant ultra-doux sans parfum, tonique apaisant, sérum calmant, crème protectrice, SPF minéral
• Soir: démaquillant doux, nettoyant sans savon, sérum réparateur, crème apaisante
• Hebdomadaire: masque calmant, jamais d''exfoliation agressive

Conseils généraux:
• Introduisez les nouveaux produits un à la fois
• Testez sur une petite zone pendant 24-48h
• Privilégiez les ingrédients simples pour les peaux sensibles
• Adaptez votre routine aux saisons
• L''hydratation reste essentielle pour tous les types de peau',
 'https://images.unsplash.com/photo-1498842812179-c81beecf902c',
 NOW() - INTERVAL '2 days',
 NOW() - INTERVAL '2 days',
 true,
 3,
 10),

-- Articles pour l'auteur Thomas Petit (UserId=4)
('Comment se reconnecter à la nature en milieu urbain', 
 'Vivre en ville ne doit pas vous priver de connexion avec la nature. Voici comment la retrouver:

1. Créez votre oasis urbaine
   • Plantes d''intérieur purificatrices
   • Petit potager de balcon ou rebord de fenêtre
   • Mini-jardin vertical
   • Herbes aromatiques en cuisine
   • Terrarium pour micro-environnement

2. Exploitez les espaces verts urbains
   • Pratiquez le "park hopping" (découvrir différents parcs)
   • Adoptez le "shinrin-yoku" (bain de forêt) dans les parcs
   • Joignez-vous aux jardins communautaires
   • Cherchez les sentiers urbains méconnus
   • Pratiquez le pique-nique contemplatif

3. Observez la biodiversité urbaine
   • Installez mangeoires et nichoirs pour oiseaux
   • Notez les espèces végétales et animales rencontrées
   • Participez aux sciences citoyennes (inventaires)
   • Photographiez la nature urbaine
   • Créez un journal d''observation naturaliste

4. Intégrez des rituels nature dans votre quotidien
   • Marcher pieds nus dans l''herbe au petit matin
   • Boire votre café en observant le ciel
   • Respirer consciemment près des arbres
   • Toucher différentes textures naturelles
   • Observer le lever/coucher du soleil

5. Utilisez la technologie pour vous reconnecter
   • Applications d''identification de plantes/oiseaux
   • Sons naturels pour méditation/relaxation
   • Visualisations guidées en nature
   • Documentaires immersifs
   • Défis photo nature en ville

La vraie connexion vient de l''attention portée aux détails et de la présence consciente, même dans les plus petits fragments de nature urbaine.',
 'https://images.unsplash.com/photo-1492093502190-25c0c7b3094c',
 NOW() - INTERVAL '1 day',
 NOW() - INTERVAL '1 day',
 true,
 4,
 8),

('L''art de pratiquer la gentillesse au quotidien', 
 'La gentillesse est un superaliment pour l''âme et la société. Voici comment la cultiver:

Bénéfices scientifiquement prouvés:
• Production d''ocytocine et d''endorphines
• Diminution du cortisol (hormone du stress)
• Renforcement du système immunitaire
• Amélioration de la santé cardiovasculaire
• Augmentation de l''espérance de vie
• Sensation accrue de bonheur et de sens

Pratiques quotidiennes simples:
• Sourire consciemment aux personnes croisées
• Complimenter sincèrement (au-delà de l''apparence)
• Pratiquer l''écoute active sans interruption
• Proposer de l''aide concrète et spécifique
• Laisser des notes encourageantes
• Exprimer régulièrement sa gratitude
• Pratiquer la patience dans les files d''attente
• Céder le passage avec bienveillance
• Remercier les travailleurs essentiels
• Partager ressources et connaissances

Pour les moments difficiles:
• Présumer des bonnes intentions d''autrui
• Respirer profondément avant de réagir
• Se demander "Comment puis-je aider?"
• Pratiquer l''auto-compassion d''abord
• Utiliser des affirmations positives

La gentillesse en cercles concentriques:
1. Envers soi-même (fondation essentielle)
2. Famille et proches
3. Collègues et connaissances
4. Étrangers
5. Ceux avec qui on est en désaccord
6. La planète et autres espèces

La gentillesse n''est pas faiblesse, mais force de caractère et intelligence émotionnelle.',
 'https://images.unsplash.com/photo-1469571486292-b53601021a68',
 NOW(),
 NOW(),
 true,
 4,
 10),

('Optimiser votre sommeil pour des performances cognitives maximales', 
 'La qualité du sommeil est directement liée à votre performance cognitive. Voici les stratégies avancées:

Fondamentaux scientifiques:
• Cycles de sommeil de 90 minutes (4-6 cycles par nuit)
• Phases cruciales: sommeil profond (réparation physique) et REM (consolidation mémoire)
• Chronotype individuel (lève-tôt, couche-tard, intermédiaire)
• Pression homéostatique (accumulation d''adénosine) et rythme circadien (horloge interne)

Optimisation de l''environnement:
• Température idéale: 16-19°C
• Obscurité totale (masque si nécessaire)
• Silence ou bruit blanc/brun constant
• Literie respirante et confortable
• Chambre minimaliste et dédiée au sommeil

Routine pré-sommeil (60-90 minutes):
• Diminution progressive de la lumière
• Blocage de la lumière bleue (lunettes, applications)
• Refroidissement corporel (douche tiède)
• Relaxation mentale (lecture, méditation, respiration 4-7-8)
• Limitation des liquides
• Journal de gratitude ou de décharge mentale

Nutrition et sommeil:
• Éviter caféine 8-12h avant coucher
• Tryptophane et magnésium en soirée
• Glycémie stable (petit encas protéiné si nécessaire)
• Limiter l''alcool (perturbe le REM)

Stratégies avancées:
• Cohérence cardiaque avant le coucher
• Technique militaire d''endormissement en 2 minutes
• Réveil en fin de cycle (applications de suivi)
• Exposition à la lumière forte le matin
• Micro-siestes stratégiques (10-20 min)
• Méditation Yoga Nidra pour sommeil profond

Pour chaque stratégie, testez pendant 1-2 semaines et notez les résultats pour personnaliser votre approche optimale.',
 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
 NOW(),
 NOW(),
 true,
 2,
 7); 
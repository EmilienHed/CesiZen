# Cahier de Tests - Application CESI Zen

## 1. Authentification

### Test 1.1 : Connexion utilisateur avec identifiants valides
**Description** : Un utilisateur se connecte avec des identifiants valides
**Prérequis** : Compte utilisateur créé dans le système

**Étapes** :
1. J'ouvre l'application CESI Zen
2. Je constate que je suis redirigé vers la page de connexion
3. Je saisis mon adresse email dans le champ "Email"
4. Je saisis mon mot de passe dans le champ "Mot de passe"
5. Je clique sur le bouton "Se connecter"

**Résultat attendu** :
- Je suis automatiquement redirigé vers la page d'accueil
- L'interface affiche le menu avec le choi entre les exercices de respiration ou bien la lecture d'articles

### Test 1.2 : Connexion utilisateur avec identifiants invalides
**Description** : Un utilisateur tente de se connecter avec des identifiants incorrects
**Prérequis** : Aucun

**Étapes** :
1. J'ouvre l'application CESI Zen
2. Je constate que je suis redirigé vers la page de connexion
3. Je saisis une adresse email au format valide mais inconnue
4. Je saisis un mot de passe
5. Je clique sur le bouton "Se connecter"

**Résultat attendu** :
- Un message d'erreur apparaît : "Identifiants incorrects. Veuillez réessayer."
- Je reste sur la page de connexion

### Test 1.3 : Création de compte utilisateur
**Description** : Un nouvel utilisateur crée un compte
**Prérequis** : Aucun

**Étapes** :
1. J'ouvre l'application CESI Zen
2. Sur la page de connexion, je clique sur "S'inscrire"
3. Sur la page d'inscription, je saisis :
  - Prénom : "Jean"
  - Nom : "Dupont"
  - Email : "jean.dupont@exemple.com"
  - Date de naissance : "01/01/1990"
  - Mot de passe : "MotDePasse123"
  - Confirmation du mot de passe : "MotDePasse123"
4. Je clique sur le bouton "S'inscrire"

**Résultat attendu** :
- Une fenêtre de confirmation apparaît avec le message "Votre compte a été créé avec succès"
- Je suis redirigé vers la page de connexion

### Test 1.4 : Déconnexion utilisateur
**Description** : Un utilisateur se déconnecte de l'application
**Prérequis** : Être connecté à l'application

**Étapes** :
1. Depuis le header je clique sur le bouton se déconnecter

**Résultat attendu** :
- Je suis redirigé vers la page de connexion
- Toutes les données de session sont effacées

**Résultat attendu** :
- Un message d'erreur "Pas de connexion internet" s'affiche
- Les fonctionnalités hors ligne restent accessibles
- La synchronisation reprend automatiquement une fois la connexion rétablie

## 2. Navigation dans l'application

### Test 2.1 : Navigation entre les onglets
**Description** : Un utilisateur navigue entre les différents onglets de l'application
**Prérequis** : Être connecté à l'application

**Étapes** :
1. Depuis l'onglet "Accueil", je clique sur l'onglet "Articles" depuis le header, footer ou le menu
2. Je vérifie que la liste des articles est affichée
3. Depuis l'onglet "Accueil", je clique sur l'onglet "Exercices" depuis le header, footer ou le menu
4. Je vérifie que la liste des exercices de respiration est affichée


**Résultat attendu** :
- À chaque clic, l'interface change pour afficher la section correspondante
- L'onglet actif est visuellement mis en évidence dans la barre de navigation
- Le contenu approprié est chargé pour chaque section

## 3. Exercices de respiration

### Test 3.1 : Affichage de la liste des exercices
**Description** : Un utilisateur consulte la liste des exercices de respiration en étant connecté ou non 

**Étapes** :
1. Je me rends sur l'onglet "Exercices"
2. J'observe la liste des exercices de respiration disponibles

**Résultat attendu** :
- Une liste d'exercices de respiration s'affiche
- Chaque exercice affiche :
  - Son nom
  - Une brève description
  - La durée d'inspiration, de rétention (si applicable) et d'expiration
  - Un bouton "Commencer l'exercice"

### Test 3.2 : Démarrage et suivi d'un exercice de respiration
**Description** : Un utilisateur sélectionne et réalise un exercice de respiration
**Prérequis** : Être connecté à l'application

**Étapes** :
1. Je me rends sur l'onglet "Exercices"
2. Je sélectionne un exercice dans la liste en cliquant dessus
3. Sur la page de détail de l'exercice, je clique sur "Commencer l'exercice"
4. Je suis les instructions visuelles
5. Je complète l'exercice ou je l'arrête en cours de route

**Résultat attendu** :
- L'interface affiche un compteur visuel pour chaque phase
- Des instructions claires sont données pour chaque étape
- Un son guide la respiration si activé

## 4. Articles et Ressources

### Test 4.1 : Consultation des articles
**Description** : Navigation et lecture des articles
**Prérequis** : Être connecté à l'application

**Étapes** :
1. Je me rends sur l'onglet "Articles"
2. Je parcours la liste des articles disponibles
3. Je sélectionne un article pour le lire

**Résultat attendu** :
- La liste des articles s'affiche avec :
  - Un titre
  - Une image de couverture
  - Un résumé
  - La date de publication
- L'article s'ouvre en modal 
- Le contenu est bien formaté et lisible

## 5. Gestion du profil

### Test 5.1 : Modification des informations personnelles
**Description** : Mise à jour des informations du profil
**Prérequis** : Être connecté à l'application

**Étapes** :
1. Je me rends sur l'onglet "Profil"
2. Je clique sur "Modifier le profil"
3. Je modifie certaines informations
4. Je sauvegarde les modifications

**Résultat attendu** :
- Les modifications sont enregistrées
- Un message de confirmation s'affiche
- Les nouvelles informations sont visibles immédiatement

### Test 5.2 : Changement de mot de passe
**Description** : Modification du mot de passe
**Prérequis** : Être connecté à l'application

**Étapes** :
1. Je me rends sur l'onglet "Profil"
2. Je clique sur "Changer le mot de passe"
3. Je saisis :
  - L'ancien mot de passe
  - Le nouveau mot de passe
  - La confirmation du nouveau mot de passe
4. Je valide le changement

**Résultat attendu** :
- Un message de confirmation s'affiche
- Je peux me reconnecter avec le nouveau mot de passe
- L'ancien mot de passe n'est plus valide

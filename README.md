# CesiZen - Plateforme de Gestion d'Articles

CesiZen est une application web permettant de gérer des articles avec un système d'administration. L'application est construite avec une architecture client-serveur utilisant Angular pour le frontend et ASP.NET Core pour le backend.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [API](#api)
- [Gestion des droits](#gestion-des-droits)

## Fonctionnalités

- Affichage d'articles avec filtrage par catégorie
- Système d'authentification avec rôles (utilisateur et administrateur)
- Gestion des articles (création, modification, suppression, désactivation)
- Visibilité des articles contrôlée par statut d'activation
- Interface d'administration pour les utilisateurs avec le rôle "Admin"

## Prérequis

- [.NET 6.0 SDK](https://dotnet.microsoft.com/download/dotnet/6.0) ou supérieur
- [Node.js](https://nodejs.org/) (v14 ou supérieur)
- [Angular CLI](https://cli.angular.io/) (`npm install -g @angular/cli`)
- [PostgreSQL](https://www.postgresql.org/) ou autre base de données compatible avec Entity Framework Core

## Installation

### Backend

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/CesiZen.git
   cd CesiZen
   ```

2. Configurez la base de données dans `appsettings.json` :
Remplacez les informations par celles qui se trouvent dans le docker-compose.yml
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=cesizen;Username=postgres;Password=votre_mot_de_passe"
}
```

3. Appliquez les migrations pour créer la base de données :
   ```bash
   cd Backend
   dotnet ef database update
   ```

4. Lancez le serveur backend :
   ```bash
   dotnet run
   ```
   Le serveur sera accessible à l'adresse http://localhost:5016

### Frontend

1. Installez les dépendances :
   ```bash
   cd frontend
   npm install
   ```

2. Lancez le serveur de développement :
   ```bash
   ng serve
   ```
   L'application sera accessible à l'adresse http://localhost:4200

## Configuration

### Backend

Les principaux paramètres de configuration se trouvent dans le fichier `appsettings.json` :

- **ConnectionStrings** : Configuration de la connexion à la base de données
- **Jwt** : Configuration du token JWT pour l'authentification
  - **Key** : Clé secrète pour signer les tokens
  - **Issuer** : Émetteur du token
  - **Audience** : Audience du token

### Frontend

La configuration du frontend se trouve principalement dans :

- **environment.ts** : Configuration pour l'environnement de développement
- **environment.prod.ts** : Configuration pour l'environnement de production

## Utilisation

### Utilisateurs normaux

Les utilisateurs normaux peuvent :
- Consulter la liste des articles actifs
- Voir le détail d'un article actif
- Filtrer les articles par catégorie

### Administrateurs

Les administrateurs peuvent en plus :
- Créer de nouveaux articles
- Modifier des articles existants
- Désactiver des articles (les rendre invisibles aux utilisateurs normaux)
- Supprimer des articles
- Voir tous les articles, y compris ceux qui sont inactifs

## Structure du projet

### Backend

- **Controllers/** : Contrôleurs API
- **Models/** : Modèles de données
- **Services/** : Services métier
- **Interfaces/** : Interfaces pour l'injection de dépendances
- **Data/** : Configuration de la base de données
- **DTOs/** : Objets de transfert de données

### Frontend

- **src/app/components/** : Composants Angular
- **src/app/services/** : Services Angular
- **src/app/Models/** : Modèles de données
- **src/app/guards/** : Guards pour la protection des routes

## API

### Endpoints Articles

| Méthode | URL | Description | Rôle requis |
|---------|-----|-------------|-------------|
| GET | /api/articles | Récupère tous les articles | - |
| GET | /api/articles/active | Récupère les articles actifs | - |
| GET | /api/articles/all | Récupère tous les articles | Admin |
| GET | /api/articles/{id} | Récupère un article par son ID | - |
| GET | /api/articles/category/{categoryId} | Récupère les articles par catégorie | - |
| GET | /api/articles/user/{userId} | Récupère les articles par utilisateur | - |
| POST | /api/articles | Crée un nouvel article | Admin |
| PUT | /api/articles/{id} | Met à jour un article | Admin |
| DELETE | /api/articles/{id} | Supprime un article | Admin |
| PUT | /api/articles/deactivate/{id} | Désactive un article | Admin |

### Authentification

| Méthode | URL | Description |
|---------|-----|-------------|
| POST | /api/auth/login | Connexion utilisateur |
| POST | /api/auth/register | Inscription utilisateur |

## Gestion des droits

L'application utilise un système de rôles pour gérer les droits d'accès :

- **Admin** (roleId = 1) : Accès complet à tous les articles et fonctionnalités d'administration
- **Utilisateur** (roleId = 2) : Accès en lecture aux articles actifs uniquement

Les articles inactifs (IsActive = false) sont invisibles pour les utilisateurs normaux, mais restent visibles pour les administrateurs.

## Fonctionnalité de visibilité des articles inactifs

### Description

Cette fonctionnalité permet aux administrateurs de désactiver temporairement des articles sans les supprimer de la base de données. Les articles désactivés restent visibles pour les administrateurs mais sont masqués pour les utilisateurs normaux.

### Implémentation technique

#### Backend

- Le service `ArticleService` dispose d'une méthode `GetActiveArticlesAsync()` qui filtre les articles par la propriété `IsActive`
- Le contrôleur `ArticlesController` vérifie le rôle de l'utilisateur pour déterminer quels articles renvoyer :
  - L'endpoint `/api/articles/active` renvoie uniquement les articles actifs
  - L'endpoint `/api/articles/{id}` vérifie si l'utilisateur est admin ou si l'article est actif
  - Les endpoints `/api/articles/category/{categoryId}` et `/api/articles/user/{userId}` filtrent également les articles inactifs pour les utilisateurs normaux

#### Frontend

- Le service `ArticleService` dans Angular utilise l'endpoint approprié selon le rôle de l'utilisateur :
  - Pour les administrateurs : `/api/articles` (tous les articles)
  - Pour les utilisateurs normaux : `/api/articles/active` (articles actifs uniquement)
- Le composant `ArticleDetailComponent` redirige les utilisateurs normaux s'ils tentent d'accéder à un article inactif

### Utilisation

Les administrateurs peuvent désactiver un article en :
1. Accédant à la page de détail de l'article
2. Cliquant sur le bouton "Désactiver"
3. L'article reste visible pour les administrateurs mais devient invisible pour les utilisateurs normaux

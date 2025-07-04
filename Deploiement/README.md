# Configuration Vault pour CesiZen

Ce document explique comment utiliser Vault pour gérer les variables d'environnement dans les environnements de développement et production.

## Architecture

L'architecture mise en place utilise:
- **Vault**: Service de gestion de secrets
- **Docker Compose**: Pour orchestrer les conteneurs
- **Traefik**: Pour le routage et les certificats SSL
- **Entrypoint Script**: Pour récupérer les configurations depuis Vault

## Structure des secrets dans Vault

Les secrets sont organisés comme suit:
- **Dev**: `secret/cesizen/dev/config` 
  - API_URL: URL de l'API de développement
  - HOMEPAGE: Chemin de base pour le frontend de développement
  
- **Prod**: `secret/cesizen/prod/config`
  - API_URL: URL de l'API de production
  - HOMEPAGE: Chemin de base pour le frontend de production

## Déploiement

### Démarrage des environnements

**Pour l'environnement de développement:**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

**Pour l'environnement de production:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Initialisation de Vault

Après le démarrage des conteneurs, vous devez initialiser Vault:

```bash
# Pour l'environnement de développement
docker exec cesizen-vault /bin/sh -c "cd /app && ./init-vault.sh"

# Pour l'environnement de production
docker exec cesizen-vault-prod /bin/sh -c "cd /app && ./init-vault.sh"
```

### Vérification des configurations

Pour vérifier que les configurations ont été correctement chargées:

```bash
# Pour l'environnement de développement
docker logs frontend-dev

# Pour l'environnement de production
docker logs frontend-prod
```

## Utilisation dans le frontend

Le script `entrypoint.sh` génère un fichier `env.js` qui est chargé dans votre application frontend. Ce fichier contient les variables d'environnement nécessaires à votre application.

Exemple d'utilisation dans votre application:

```javascript
// Accès aux variables d'environnement
const apiUrl = window.ENV?.API_URL || '/api';
const homepage = window.ENV?.HOMEPAGE || '/';

// Utilisation des variables
console.log(`API URL: ${apiUrl}`);
console.log(`Homepage: ${homepage}`);
```

## Modification des secrets

Pour modifier les secrets dans Vault:

```bash
# Pour l'environnement de développement
export VAULT_ADDR=http://localhost:8200
export VAULT_TOKEN=root
vault kv put secret/cesizen/dev/config API_URL="https://nouvelle-url/api" HOMEPAGE="/nouveau-chemin"

# Pour l'environnement de production
export VAULT_ADDR=http://localhost:8201
export VAULT_TOKEN=root
vault kv put secret/cesizen/prod/config API_URL="https://nouvelle-url/api" HOMEPAGE="/nouveau-chemin"
```

## Sécurité

En production, il est recommandé de:
1. Ne pas utiliser le token root
2. Configurer un stockage persistant pour Vault
3. Activer l'authentification
4. Utiliser TLS pour les communications avec Vault 
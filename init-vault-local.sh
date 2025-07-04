#!/bin/sh

# Configuration de l'environnement Vault local
export VAULT_ADDR=http://localhost:8200
export VAULT_TOKEN=root

echo "Activation du moteur KV version 2..."
vault secrets enable -path=secret kv-v2 || echo "Le moteur KV-v2 est déjà activé"

# Configuration pour l'environnement de développement
echo "Configuration des secrets pour l'environnement de développement..."
vault kv put secret/cesizen/dev/config \
    API_URL="https://localhost/emilien-dev/api" \
    HOMEPAGE="/emilien-dev"

# Configuration pour l'environnement de production
echo "Configuration des secrets pour l'environnement de production..."
vault kv put secret/cesizen/prod/config \
    API_URL="https://localhost/emilien-prod/api" \
    HOMEPAGE="/emilien-prod"

echo "✅ Initialisation de Vault locale terminée avec succès!" 
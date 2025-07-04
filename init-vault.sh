#!/bin/sh

# Attente que Vault soit prêt
echo "Attente du démarrage de Vault..."
until curl -s http://vault:8200/v1/sys/health > /dev/null; do
    echo "Vault n'est pas encore prêt, nouvelle tentative dans 1 seconde..."
    sleep 1
done

# Configuration de l'environnement Vault
export VAULT_ADDR=http://vault:8200
export VAULT_TOKEN=root

echo "Activation du moteur KV version 2..."
vault secrets enable -path=secret kv-v2

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

echo "✅ Initialisation de Vault terminée avec succès!" 
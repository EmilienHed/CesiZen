#!/bin/sh

: "${VAULT_ADDR:=http://vault:8200}"
: "${VAULT_TOKEN:=root}"
: "${VAULT_PATH:=secret/data/cesizen/config}"
: "${PUBLIC_URL:=/}"

echo "Récupération des variables d'environnement depuis Vault à $VAULT_ADDR..."

ENV_DATA=$(curl -s -H "X-Vault-Token: $VAULT_TOKEN" "$VAULT_ADDR/v1/$VAULT_PATH")

if [ $? -ne 0 ] || [ -z "$ENV_DATA" ]; then
    echo "⚠️ Erreur lors de la récupération des données depuis Vault. Utilisation des valeurs par défaut."
    API_URL="https://localhost:5016/api"
    HOMEPAGE="/"
else
    echo "Données récupérées depuis Vault:"
    echo "$ENV_DATA" | jq '.'
    
    API_URL=$(echo "$ENV_DATA" | jq -r '.data.data.API_URL')
    HOMEPAGE=$(echo "$ENV_DATA" | jq -r '.data.data.HOMEPAGE')
    
    # Vérification des valeurs récupérées
    if [ "$API_URL" = "null" ] || [ -z "$API_URL" ]; then
        API_URL="https://localhost:5016/api"
        echo "API_URL non définie dans Vault, utilisation de la valeur par défaut: $API_URL"
    fi
    
    if [ "$HOMEPAGE" = "null" ] || [ -z "$HOMEPAGE" ]; then
        HOMEPAGE="$PUBLIC_URL"
        echo "HOMEPAGE non définie dans Vault, utilisation de la valeur par défaut: $HOMEPAGE"
    fi
fi

# Création du fichier env.js avec les variables récupérées
cat <<EOF > /usr/share/nginx/html/env.js
window.ENV = {
  API_URL: "$API_URL",
  HOMEPAGE: "$HOMEPAGE",
  PUBLIC_URL: "$PUBLIC_URL",
  ENV: "${ENV:-production}"
};
EOF

echo "✅ Fichier env.js généré avec:"
echo "API_URL=$API_URL"
echo "HOMEPAGE=$HOMEPAGE"
echo "PUBLIC_URL=$PUBLIC_URL"
echo "ENV=${ENV:-production}"

exec nginx -g "daemon off;" 
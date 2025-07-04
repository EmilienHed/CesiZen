# Étape 1 : Build de l'app Angular
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances d'abord (pour le cache Docker)
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copier le reste du code
COPY . .

# ARG pour choisir l'environnement et le baseHref
ARG DEPLOY_ENV=production
ARG BASE_HREF="/"

# Build avec la configuration appropriée
RUN npm run build -- --configuration=$DEPLOY_ENV --base-href=$BASE_HREF

# Étape 2 : Image nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier le build de l'application
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# Copier la configuration nginx (optionnel, peut être montée en volume)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Étape 1 : Build Angular sans SSR (simple build statique)
FROM --platform=linux/arm64 node:20-alpine AS builder

WORKDIR /app
COPY . .

ARG BASE_HREF="/"
ENV NODE_OPTIONS="--max-old-space-size=1024"

RUN npm install --legacy-peer-deps
RUN npm run build:prod -- --base-href $BASE_HREF

# Étape 2 : Image nginx pour servir le contenu statique
FROM --platform=linux/arm64 nginx:alpine

# Copier le build de l'application
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# Copier la configuration nginx personnalisée si nécessaire
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

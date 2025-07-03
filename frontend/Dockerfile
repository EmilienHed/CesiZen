## Étape 1 : Build Angular avec SSR
#FROM node:20 AS builder
#
#WORKDIR /app
#COPY . .
#
#RUN npm install --legacy-peer-deps
#RUN npm run build:ssr
#
## Étape 2 : Image finale pour exécution SSR
#FROM node:20
#
#WORKDIR /app
#
#COPY --from=builder /app/dist /app/dist
#COPY --from=builder /app/package*.json ./
#
#RUN npm install --only=production --legacy-peer-deps
#
#EXPOSE 4000
#
## CMD pour lancer le serveur SSR (adapté selon Angular 17+ avec "server.mjs")
#CMD ["node", "dist/frontend/server/server.mjs"]

# Étape 1 : Build Angular SSR avec Node ARM64 Alpine
FROM --platform=linux/arm64 node:20-alpine AS builder

WORKDIR /app
COPY . .

ARG BASE_HREF="/"
ENV NODE_OPTIONS="--max-old-space-size=1024"

RUN npm install --legacy-peer-deps
RUN npm run build:ssr -- --base-href $BASE_HREF

# Étape intermédiaire : Organiser les assets pour nginx
FROM --platform=linux/arm64 alpine:latest as assets-organizer
WORKDIR /assets

# Copier les assets du build
COPY --from=builder /app/dist/frontend/browser/assets /var/www/html/assets

# Étape 2 : Image finale pour exécution SSR, aussi alpine ARM64
FROM --platform=linux/arm64 node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package*.json ./

# Copier les assets pour le serveur SSR
COPY --from=assets-organizer /var/www/html /var/www/html

RUN npm install --only=production --legacy-peer-deps

EXPOSE 4000

CMD ["node", "dist/frontend/server/server.mjs"]

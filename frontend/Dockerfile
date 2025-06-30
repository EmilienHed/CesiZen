# Étape 1 : Build Angular avec SSR
FROM node:20 AS builder

WORKDIR /app
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build:ssr

# Étape 2 : Image finale pour exécution SSR
FROM node:20

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package*.json ./

RUN npm install --only=production --legacy-peer-deps

EXPOSE 4000

# CMD pour lancer le serveur SSR (adapté selon Angular 17+ avec "server.mjs")
CMD ["node", "dist/frontend/server/server.mjs"]

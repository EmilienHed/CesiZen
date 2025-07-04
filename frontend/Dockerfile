# Étape 1 : Build Angular sans SSR (simple build statique)
FROM --platform=linux/arm64 node:20-alpine AS builder

WORKDIR /app
COPY . .

ARG BASE_HREF="/"
ARG BUILD_CONFIG="production"
ENV NODE_OPTIONS="--max-old-space-size=1024"

RUN npm install --legacy-peer-deps

# Build avec la configuration appropriée
RUN if [ "$BUILD_CONFIG" = "development" ]; then \
        npm run build -- --configuration development --base-href $BASE_HREF; \
    else \
        npm run build -- --configuration production --base-href $BASE_HREF; \
    fi

# Étape 2 : Image nginx pour servir le contenu statique
FROM --platform=linux/arm64 nginx:alpine

# Copier le build de l'application
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# Nous ne copions pas la configuration nginx ici car elle sera montée en volume
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

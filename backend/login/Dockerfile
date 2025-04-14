FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# 2. Installer les dépendances (y compris bcrypt)
RUN npm ci --production

# 3. Copier le reste de l'application
COPY . .

# Étape d'exécution
FROM node:18-alpine

WORKDIR /app

# 4. Installer les dépendances de compilation pour bcrypt
RUN apk add --no-cache python3 make g++

# 5. Copier depuis le builder
COPY --from=builder /app .

# 6. Exposition du port
EXPOSE 7002

# 7. Commande de démarrage
CMD ["node", "server.js"]
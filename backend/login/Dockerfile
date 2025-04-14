# Étape 1 : Utiliser une image de base Node.js
FROM node:14 AS build

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./
RUN npm install  # Installer les dépendances

# Copier tous les fichiers du projet dans l'image
COPY . .

# Étape 2 : Exécuter l'application
CMD ["npm", "start"]  # Assurez-vous que vous avez un script 'start' dans votre package.json

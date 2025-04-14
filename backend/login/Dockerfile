# Utilise l'image officielle de Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json pour installer les dépendances
COPY package.json /app/

# Installer les dépendances
RUN npm install

# Copier le code source de l'application dans le conteneur
COPY src/ /app/src/

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Commande à exécuter pour démarrer l'application
CMD ["npm", "start"]

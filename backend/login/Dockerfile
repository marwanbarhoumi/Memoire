# Utilise l'image officielle de Node.js comme base
FROM node:14

# Crée le répertoire de travail
WORKDIR /app

# Copie le fichier package.json et installe les dépendances
COPY package.json /app/
RUN npm install

# Copie le code source dans le conteneur
COPY src/ /app/src/

# Expose le port sur lequel l'application écoutera (par exemple, 3000)
EXPOSE 7002

# Commande par défaut pour démarrer l'application
CMD ["npm", "start"]

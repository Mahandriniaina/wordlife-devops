# Étape 1 : Utiliser une image Node.js comme base
FROM node:20

# Étape 2 : Installer les outils nécessaires pour le SDK Android


# Étape 5 : Configurer le dossier de travail
WORKDIR /app

# Étape 6 : Copier les fichiers du projet
COPY package*.json ./
RUN npm install --production

# Étape 7 : Copier le reste des fichiers
COPY . .

# Étape 8 : Exposer un port pour le développement
EXPOSE 8081

# Étape 9 : Commande de démarrage
CMD ["npm", "start"]

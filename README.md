# Projet de Calcul des Pourboires - INDY

Bienvenue dans le projet de calcul des pourboires pour le restaurant **INDY**. Cette application permet de gérer le personnel, sélectionner les employés travaillant un jour donné, choisir entre les shifts de jour ou de nuit, et calculer les pourboires en fonction des montants de chaque employé. 
L'application est composée d'une partie backend (Node.js, Express, MongoDB) et d'une partie frontend (React). L'authentification se fait via JWT.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/) (version 14.x ou plus récente)
- [Docker](https://www.docker.com/) (facultatif, si vous souhaitez exécuter l'application dans des conteneurs Docker)
- [MongoDB](https://www.mongodb.com/) (vous pouvez utiliser MongoDB Atlas ou une instance locale)
- [Git](https://git-scm.com/) pour le contrôle de version

## Installation

1. **Cloner le dépôt** :
   git clone https://github.com/votre-utilisateur/votre-projet.git
   cd votre-projet

2. Configurer les variables d'environnement :

Créez un fichier .env à la racine du projet backend avec les variables suivantes :

makefile
Copier le code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tipCalculator
JWT_SECRET=my_secret_jwt_key_secure123

3. Installer les dépendances :

3.1. Pour le backend :

cd backend
npm install

3.2. Pour le frontend :

cd frontend
npm install

Exécution du projet

Méthode 1 : Exécution locale
Backend : Dans le répertoire backend, exécutez :

npm run dev
Le serveur backend s'exécutera sur http://localhost:3000.

Frontend : Dans le répertoire frontend, exécutez :

npm start
Le frontend s'exécutera sur http://localhost:3001.

Utilisez Docker Compose pour démarrer les conteneurs :

docker-compose up


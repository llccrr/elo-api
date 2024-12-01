// server.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Importer les routes de l'API
const apiRoutes = require('./api');
app.use('/', apiRoutes);

// Démarrer le serveur
const PORT = 3020;
app.listen(PORT, () => {
    console.log(`API Elo en écoute sur le port ${PORT}`);
});

// api/index.js
const express = require('express');
const { calculateEloChanges } = require('../elo');
const path = require('path');

const app = express();
app.use(express.json());

// Servir la page HTML de documentation à la racine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/calculate', (req, res) => {
    try {
        const { teams, winner, k } = req.body;

        if (!Array.isArray(teams) || teams.length < 2) {
            return res.status(400).json({ error: "Il faut au moins 2 équipes" });
        }

        const result = calculateEloChanges(teams, winner, k);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;

const express = require('express');
const path = require('path');
const { calculateEloChanges } = require('../elo');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/calculate', (req, res) => {
    try {
        const { players, winner } = req.body;

        // Validate players array exists
        if (!Array.isArray(players)) {
            return res.status(400).json({
                error: "Players must be an array"
            });
        }

        // Validate each player
        const isValidPlayer = player =>
            typeof player.rating === 'number' &&
            typeof player.k === 'number' &&
            typeof player.team === 'number';

        if (!players.every(isValidPlayer)) {
            return res.status(400).json({
                error: "Invalid player format. Each player must have rating, k, and team values"
            });
        }

        // Validate teams
        const teams = new Set(players.map(p => p.team));
        if (teams.size < 2) {
            return res.status(400).json({
                error: "Players must be from at least 2 different teams"
            });
        }

        if (winner >= teams.size) {
            return res.status(400).json({
                error: "Invalid winner index"
            });
        }

        const result = calculateEloChanges(players, winner);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




module.exports = app;

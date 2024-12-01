function getExpectedScore(ratingA, ratingB) {
    return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

function calculateTeamRating(players) {
    return players.reduce((sum, player) => sum + player.rating, 0) / players.length;
}

function calculateEloChanges(players, winner) {
    // Group players by team
    const teams = players.reduce((acc, player) => {
        if (!acc[player.team]) acc[player.team] = [];
        acc[player.team].push(player);
        return acc;
    }, {});

    const teamsList = Object.values(teams);
    const teamAverages = teamsList.map(calculateTeamRating);

    const expectedScores = teamsList.map((_, teamIndex) => {
        const opposingTeams = teamsList.filter((__, i) => i !== teamIndex);
        const opposingPlayers = opposingTeams.flat();
        const opposingAverage = calculateTeamRating(opposingPlayers);
        return getExpectedScore(teamAverages[teamIndex], opposingAverage);
    });

    const actualScores = teamsList.map((_, index) => index === winner ? 1 : 0);

    // Calculate new ratings
    const playerUpdates = players.map(player => {
        const teamIndex = player.team;
        const newRating = Math.round(
            player.rating +
            player.k * (actualScores[teamIndex] - expectedScores[teamIndex])
        );

        return {
            ...player,
            newRating,
            ratingChange: newRating - player.rating
        };
    });

    return {
        players: playerUpdates
    };
}

module.exports = { calculateEloChanges };

const DEFAULT_K = 32;

function getExpectedScore(ratingA, ratingB) {
    return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

function calculateTeamRating(ratings) {
    if (!ratings.length) return 0;
    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
}

function calculateEloChanges(teams, winner, k = DEFAULT_K) {
    const teamAverages = teams.map(calculateTeamRating);
    const expectedScores = teams.map((_, teamIndex) => {
        const opposingTeams = teams.filter((__, i) => i !== teamIndex);
        const opposingAverage = calculateTeamRating(opposingTeams.flat());
        return getExpectedScore(teamAverages[teamIndex], opposingAverage);
    });

    const actualScores = teams.map((_, index) => index === winner ? 1 : 0);
    const newRatings = teams.map((team, teamIndex) =>
        team.map(rating =>
            Math.round(rating + k * (actualScores[teamIndex] - expectedScores[teamIndex]))
        )
    );

    return {
        newRatings,
        changes: teams.map((team, teamIndex) =>
            team.map((oldRating, playerIndex) =>
                newRatings[teamIndex][playerIndex] - oldRating
            )
        )
    };
}

module.exports = { calculateEloChanges };

# Elo Rating API

A simple API to calculate Elo ratings for various team configurations. This API can handle 1v1, 2v2, or any other team size combinations.

## Documentation

Full documentation available at root endpoint:
```
GET /
```

## Features

- Calculate Elo ratings for any number of teams
- Support for asymmetric teams (1v2, 2v3, etc.)
- Individual K-factor for each player
- Simple JSON API
- Documentation page included

## API Usage

### Endpoints

```
GET /              # Documentation
POST /calculate    # Calculate new Elo ratings
```

### Example Request

```json
{
    "players": [
        { "rating": 1200, "k": 32, "team": 0 },
        { "rating": 1400, "k": 16, "team": 1 }
    ],
    "winner": 0
}
```

### Example Response

```json
{
    "players": [
        { "rating": 1200, "k": 32, "team": 0, "newRating": 1227, "ratingChange": 27 },
        { "rating": 1400, "k": 16, "team": 1, "newRating": 1373, "ratingChange": -27 }
    ]
}
```

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Run locally:
```bash
npm start
```

## Deployment

This API is deployed on Vercel. Each push to the main branch triggers an automatic deployment.

## Built With

- Node.js
- Express
- Vercel

## License

MIT

# Barstool Boxscores

This is a code code challenge repo for [this code challenge](https://github.com/BarstoolSports/fullstack-challenge). It uses Next.js to stand up a simple API and frontend that interacts with a couple external JSON files that are included in the base challenge repo.

### NBA Boxscore

![NBA Boxscore](https://i.ibb.co/8cVhXgQ/Screen-Shot-2023-03-17-at-10-53-56-AM.png)

### MLB Boxscore

![MLB Boxscore](https://i.ibb.co/R20nqgY/Screen-Shot-2023-03-17-at-10-53-32-AM.png)

## Getting Started

### Set up Environment Variables

Set the following environment variables in `.env.local`:

```
NEXT_MONGO_URI=${YOUR_MONGO_DB_URI}
NEXT_MONGO_DATABASE=boxscores
NEXT_MONGO_NBA_COLLECTION=nba
NEXT_MONGO_MLB_COLLECTION=mlb
```

### Build and Run Project

```
yarn
yarn build
yarn start
```

#### Boxscore Routes

```
http://localhost:3000/mlb/los-angeles-angels/seattle-mariners/2012-09-26
http://localhost:3000/nba/miami-heat/oklahoma-city-thunder/2012-06-21
```

## Solutions to the Challenge

### Dynamic Routing Controls What Data is Fetched

I chose to use the Next.js dynamic routing for the API calls and the frontend routes. This creates a convention that ensures that the correct data is fetched for a given route. This also allows for extensibility for other sports.

```
API
/api/[:sportsLeague]/[:homeTeamId]/[:awayTeamId]/[:gameDate]

Frontend
/[:sportsLeague]/[:homeTeamId]/[:awayTeamId]/[:gameDate]
```

Since the external API is just two JSON files, the Next.js API routes will always return data to the views. However, only the correct dates will actually return the MongoDB cached data. This is an example of how the app would scale with an actual API.

### Cacheing Handled Server-side

The decision as to whether or not to hit the external API (15 second timer) is handled by the Next.js API route. The frontend is does not care about the cache. It only cares about getting the data. A context provider serves as the data layer of the frontend and wraps that data around the boxscore scoreboards.

### Edge Cases

Need to handle double headers in the MLB. Thought about appending a `[:gameTime]` query to the end of the endpoint or just return all games that happen between the 2 given teams on the given date (2 boxscores). I chose not to handle this for this iteration because it was a lot of UTC date comparisons using MongoDB and it would slow down the development overall for an edge case.

## Tools Used

### Typescript

The shape of the external JSON files are modeled with Typescript interfaces for easy static code analysis. Interfaces are stored in a `/models` folder while types are defined closer to the reason they exist.

### Providers

React's Context API is used to create a `BoxscoreProvider` that acts as a data component for the UI scoreboards. It watches the `query` parameter that Next's `useRouter` provides and loads the correct data based on the incoming query.

### Dynamic Routes

Next's dynamic routing is used for both the API routes and front end routes. This allows for easily passing in variables to ensure that the correct data is fetched for the particular dataset.

### SCSS Modules

CSS Modules allow for easy, modular SCSS imports with access via `styles` objects in my components.

### MongoDB

MongoDB is used to cache the data from the external API.

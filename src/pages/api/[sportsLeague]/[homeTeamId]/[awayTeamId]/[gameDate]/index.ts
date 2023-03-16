import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCachedBoxscore, shouldRefreshBoxscore, cacheBoxscore } from "@/util/cache";
import { fetchLatestBoxscore } from "@/util/fetchLatestBoxscore";

const API_URLS = {
  mlb: "https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json",
  nba: "https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json",
};

const CACHE_COLLECTIONS = {
  mlb: process.env.MONGODB_MLB_COLLECTION || "",
  nba: process.env.MONGODB_NBA_COLLECTION || "",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sportsLeague, homeTeamId, awayTeamId, gameDate } = req.query;
  const cacheCollection = CACHE_COLLECTIONS[sportsLeague as keyof typeof CACHE_COLLECTIONS];
  const apiUrl = API_URLS[sportsLeague as keyof typeof API_URLS];

  const cachedBoxscore = await fetchCachedBoxscore(
    cacheCollection as string,
    homeTeamId as string,
    awayTeamId as string,
    gameDate as string
  );

  // We are going to update the last_checked timestamp on each fetch
  // so we need to declare what boxscore will be cached
  let boxscoreToBeCached;

  // If this is our first boxscore fetch,
  // hit the Barstool API, cache the data and return it in response
  if (!cachedBoxscore) {
    console.log("Fetching new boxscore data...");
    boxscoreToBeCached = await fetchLatestBoxscore(apiUrl);
  } else if (shouldRefreshBoxscore(cachedBoxscore)) {
    // If refresh is needed, hit the Barstool API and cache in DB
    console.log("Cache has expired. Refreshing data...");
    boxscoreToBeCached = await fetchLatestBoxscore(apiUrl);
  } else {
    // We have fetched more than once in a 15 second window so use the cached data
    console.log("Fetching active cache...");
    boxscoreToBeCached = cachedBoxscore;
  }

  await cacheBoxscore(cacheCollection, boxscoreToBeCached);
  res.status(200).json(boxscoreToBeCached);
}

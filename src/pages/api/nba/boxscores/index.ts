import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCachedBoxscore, shouldRefreshBoxscore, cacheBoxscore } from "@/util/cache";
import { fetchLatestBoxscore } from "@/util/fetchLatestBoxscore";

const NBA_API_URL = "https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json";
const NBA_COLLECTION = process.env.MONGODB_NBA_COLLECTION || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cachedBoxscore = await fetchCachedBoxscore(NBA_COLLECTION);

  // We are going to re-cache after every fetch to update the latest timestamp
  // so we need to declare what boxscore will be cached
  let boxscoreToBeCached;

  // If this is our first boxscore fetch,
  // cache the data and return it in response
  if (!cachedBoxscore) {
    boxscoreToBeCached = await fetchLatestBoxscore(NBA_API_URL);
  } else if (shouldRefreshBoxscore(cachedBoxscore)) {
    // If refresh is needed, fetch data and cache in DB
    boxscoreToBeCached = await fetchLatestBoxscore(NBA_API_URL);
  } else {
    boxscoreToBeCached = cachedBoxscore;
  }

  await cacheBoxscore(NBA_COLLECTION, boxscoreToBeCached);
  res.status(200).json(boxscoreToBeCached);
}

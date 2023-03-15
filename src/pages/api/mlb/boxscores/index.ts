import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCachedBoxscore, shouldRefreshBoxscore, cacheBoxscore } from "@/util/cache";
import { fetchLatestBoxscore } from "@/util/fetchLatestBoxscore";

const MLB_API_URL = "https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json";
const MLB_COLLECTION = process.env.MONGODB_MLB_COLLECTION || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cachedBoxscore = await fetchCachedBoxscore(MLB_COLLECTION);

  // We are going to re-cache after every fetch to update the latest timestamp
  // so we need to declare what boxscore will be cached
  let boxscoreToBeCached;

  // If this is our first boxscore fetch,
  // cache the data and return it in response
  if (!cachedBoxscore) {
    boxscoreToBeCached = await fetchLatestBoxscore(MLB_API_URL);
  } else if (shouldRefreshBoxscore(cachedBoxscore)) {
    // If refresh is needed, fetch data and cache in DB
    boxscoreToBeCached = await fetchLatestBoxscore(MLB_API_URL);
  } else {
    boxscoreToBeCached = cachedBoxscore;
  }

  await cacheBoxscore(MLB_COLLECTION, boxscoreToBeCached);
  res.status(200).json(boxscoreToBeCached);
}

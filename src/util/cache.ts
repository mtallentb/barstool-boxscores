import { clientPromise } from "@/util/mongodb";
import { Boxscore } from "@/models";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const DB_NAME = process.env.MONGODB_DATABASE || "";

export async function fetchCachedBoxscore(
  collection: string,
  homeTeamId: string,
  awayTeamId: string,
  gameDate: string
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const startTime = dayjs(gameDate).utcOffset(0).startOf("day").toISOString();
    const endTime = dayjs(gameDate).utcOffset(0).endOf("day").toISOString();

    const query = {
      "home_team.team_id": homeTeamId,
      "away_team.team_id": awayTeamId,
      "event_information.start_date_time": { $gte: startTime, $lte: endTime },
    };

    // Initially, we don't know if we have any cached boxscores,
    // so we're just checking the collection for one
    const boxscore = await db.collection(collection).findOne(query);
    return boxscore;
  } catch (err) {
    console.error(err);
  }
}

export async function cacheBoxscore(collection: string, boxscore: Boxscore) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { query, body, upsert } = buildCachePayload(boxscore);
    return db.collection(collection).updateOne(query, body, upsert);
  } catch (err) {
    console.error(err);
  }
}

export function shouldRefreshBoxscore(cachedBoxscore: Boxscore) {
  // We only want to hit the API every 15 seconds,
  // so we need to compare the current time with the last updated timestamp
  if (!cachedBoxscore?.last_checked) return true;
  const lastCheckedTimestampInSeconds = Math.floor(new Date(cachedBoxscore.last_checked).getTime() / 1000);
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
  return currentTimestampInSeconds - lastCheckedTimestampInSeconds >= 15;
}

function buildCachePayload(boxscore: Boxscore) {
  let query;
  let body;
  const upsert = { upsert: true };

  if (!boxscore?._id) {
    // We don't want to pass a null _id property into the body object of updateOne()
    // we can just remove the whole property from this copy
    const boxscoreWithoutId = { ...boxscore };
    delete boxscoreWithoutId._id;
    query = {};
    body = { $set: { ...boxscoreWithoutId } };
  } else {
    query = { _id: boxscore._id };
    body = { $set: { ...boxscore } };
  }

  // This will serve as the date comparison to check if the API needs to be hit
  body.$set.last_checked = new Date().toUTCString();

  return { query, body, upsert };
}

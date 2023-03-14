import { ObjectId } from "mongodb";
import Official from "./Official";
import Team from "./Team";
import EventInformation from "./EventInformation";

export default interface Boxscore {
  _id: ObjectId;
  league: string;
  away_team: Team;
  home_team: Team;
  away_period_scores: Array<number>;
  home_period_scores: Array<number>;
  officials: Array<Official>;
  event_information: EventInformation;
}

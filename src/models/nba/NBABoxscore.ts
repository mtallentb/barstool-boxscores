import Boxscore from "../common/Boxscore";
import NBAPlayerStatistics from "./NBAPlayerStatistics";
import NBATeamStatistics from "./NBATeamStatistics";

export default interface NBABoxscore extends Boxscore {
  away_stats: Array<NBAPlayerStatistics>;
  home_stats: Array<NBAPlayerStatistics>;
  away_totals: NBATeamStatistics;
  home_totals: NBATeamStatistics;
}

import Batter from "./Batter";
import Pitcher from "./Pitcher";
import Fielder from "./Fielder";
import BatterTotals from "./BatterTotals";
import Boxscore from "../common/Boxscore";

export default interface MLBBoxscore extends Boxscore {
  away_errors: number;
  home_errors: number;
  away_batters: Array<Batter>;
  home_batters: Array<Batter>;
  away_pitchers: Array<Pitcher>;
  home_pitchers: Array<Pitcher>;
  away_fielding: Array<Fielder>;
  home_fielding: Array<Fielder>;
  away_batter_totals: BatterTotals;
  home_batter_totals: BatterTotals;
}

import Player from "../common/Player";

export default interface Batter extends Player {
  position: string;
  bat_order: number;
  sub_bat_order: number;
  sacrifices: number;
  at_bats: number;
  plate_appearances: number;
  singles: number;
  doubles: number;
  triples: number;
  home_runs: number;
  sac_flies: number;
  sac_hits: number;
  stolen_bases: number;
  caught_stealing: number;
  rbi_with_two_outs: number;
  total_bases: number;
  runs: number;
  hits: number;
  rbi: number;
  walks: number;
  strike_outs: number;
  left_on_base: number;
  hit_by_pitch: number;
  team_abbreviation: string;
  ops: number;
  avg: number;
  obp: number;
  slg: number;
  at_bats_per_home_run: number;
  at_bats_per_rbi: number;
  walk_rate: number;
  plate_appearances_per_rbi: number;
  plate_appearances_per_home_run: number;
  extra_base_hits: number;
  stolen_base_average: number;
  strikeout_rate: number;
  ops_string: string;
  slg_string: string;
  obp_string: string;
  avg_string: string;
  batting_highlights: string;
}

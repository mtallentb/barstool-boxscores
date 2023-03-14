import Player from "../common/Player";

export default interface Pitcher extends Player {
  pitch_order: number;
  win: boolean;
  loss: boolean;
  save: boolean;
  hold: boolean;
  era: number;
  whip: number;
  innings_pitched: number;
  hits_allowed: number;
  runs_allowed: number;
  earned_runs: number;
  walks: number;
  intentional_walks: number;
  strike_outs: number;
  home_runs_allowed: number;
  pitch_count: number;
  pitches_strikes: number;
  wild_pitches: number;
  hit_by_pitch: number;
  errors: number;
  team_abbreviation: string;
}

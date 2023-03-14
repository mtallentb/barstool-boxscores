import Player from "../common/Player";

export default interface NBAPlayerStatistics extends Player {
  position: string;
  minutes: number;
  points: number;
  assists: number;
  turnovers: number;
  steals: number;
  blocks: number;
  field_goals_attempted: number;
  field_goals_made: number;
  three_point_field_goals_attempted: number;
  three_point_field_goals_made: number;
  free_throws_attempted: number;
  free_throws_made: number;
  defensive_rebounds: number;
  offensive_rebounds: number;
  personal_fouls: number;
  team_abbreviation: string;
  is_starter: boolean;
  field_goal_percentage: number;
  three_point_percentage: number;
  free_throw_percentage: number;
}

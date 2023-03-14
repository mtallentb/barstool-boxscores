import Player from "../common/Player";

export default interface Fielder extends Player {
  errors: number;
  team_abbreviation: string;
}

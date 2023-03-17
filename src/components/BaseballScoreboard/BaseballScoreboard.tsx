import styles from "./BaseballScoreboard.module.scss";
import { useBoxscoreData } from "@/providers/Boxscore/Boxscore.provider";
import { MLBBoxscore } from "@/models";
import { useMemo } from "react";

export default function BaseballScoreboard() {
  const boxscoreData = useBoxscoreData();

  // Grab the current state of the game. (ex. Top 9th, Btm 11th)
  const gameState = useMemo(() => {
    if (!boxscoreData?.home_period_scores || !boxscoreData?.away_period_scores) return null;
    const { home_period_scores, away_period_scores } = boxscoreData;

    const totalInningHalves = home_period_scores.length + away_period_scores.length;
    const currentInningNumber = Math.ceil(totalInningHalves / 2);
    const inningHalf = (totalInningHalves % 2 === 0 && "Btm") || "Top";
    const currentInning = getFormattedInning(currentInningNumber.toString());
    const innings = Array.from(Array(currentInningNumber), (_, i) => i + 1);
    return { currentInning, inningHalf, innings };
  }, [boxscoreData]);

  const pitchers = useMemo(() => {
    if (!boxscoreData) return null;
    return [
      getWinningPitcher(boxscoreData as MLBBoxscore),
      getLosingPitcher(boxscoreData as MLBBoxscore),
      getSavingPitcher(boxscoreData as MLBBoxscore),
    ];
  }, [boxscoreData]);

  function getTeamColor(team: string | undefined) {
    if (!team) return "";
    const teamColors = {
      "los-angeles-angels": styles.laAngels,
      "seattle-mariners": styles.seattleMariners,
    };
    return teamColors[team as keyof typeof teamColors];
  }

  return (
    <table className={styles.scoreboard}>
      <thead>
        <tr>
          <th scope="col"></th>
          {gameState?.innings.map((num) => (
            <th scope="col" key={num}>
              {num}
            </th>
          ))}
          <th scope="col">R</th>
          <th scope="col">H</th>
          <th scope="col">E</th>
        </tr>
      </thead>
      <tbody>
        {/* HOME STAT LINE */}
        <tr className={styles.statsRow}>
          <th scope="row">{boxscoreData?.home_team?.abbreviation}</th>
          {boxscoreData?.home_period_scores?.map((score, index) => (
            <td key={index}>{score}</td>
          ))}
          <td>{getHomeTeamRuns(boxscoreData as MLBBoxscore)}</td>
          <td>{getHomeTeamHits(boxscoreData as MLBBoxscore)}</td>
          <td>{getHomeTeamErrors(boxscoreData as MLBBoxscore)}</td>
        </tr>

        {/* AWAY STAT LINE */}
        <tr className={styles.statsRow}>
          <th>{boxscoreData?.away_team?.abbreviation}</th>
          {boxscoreData?.away_period_scores?.map((score, index) => (
            <td key={index}>{score}</td>
          ))}
          <td>{getAwayTeamRuns(boxscoreData as MLBBoxscore)}</td>
          <td>{getAwayTeamHits(boxscoreData as MLBBoxscore)}</td>
          <td>{getAwayTeamErrors(boxscoreData as MLBBoxscore)}</td>
        </tr>

        {/* PITCHERS */}
        <tr className={styles.pitchersRow}>
          <th>WIN</th>
          <th>LOSS</th>
          <th>SAVE</th>
        </tr>
        <tr className={styles.pitchersRow}>
          {pitchers?.map(
            (pitcher, index) =>
              pitcher && (
                <td key={index}>
                  <p>{pitcher.display_name}</p>
                  <span>
                    {pitcher.innings_pitched} IP | {pitcher.earned_runs} ER | {pitcher.strike_outs} K | {pitcher.walks}{" "}
                    BB
                  </span>
                </td>
              )
          )}
        </tr>

        {/* TEAMS AND PERIOD */}
        <tr className={styles.teamsRow}>
          <td className={getTeamColor(boxscoreData?.home_team?.team_id)}>
            <h3>{boxscoreData?.home_team?.last_name}</h3>
          </td>
          <td>
            {(boxscoreData?.event_information?.status === "completed" && <span>Final</span>) || (
              <>
                <span>{gameState?.inningHalf}</span>
                <span>{gameState?.currentInning}</span>
              </>
            )}
          </td>
          <td className={getTeamColor(boxscoreData?.away_team?.team_id)}>
            <h3>{boxscoreData?.away_team?.last_name}</h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function getFormattedInning(inning: string) {
  const numberEndings = {
    "0": "th",
    "1": "st",
    "2": "nd",
    "3": "rd",
    "4": "th",
    "5": "th",
    "6": "th",
    "7": "th",
    "8": "th",
    "9": "th",
  };

  // Even though the inning is a number, we pass it in as a string
  // so we can slice off the last number to get the respective number ending
  const inningNumberEnding = (inning.length > 1 && inning.slice(0, -1)) || inning;
  const numberEnding = numberEndings[inningNumberEnding as keyof typeof numberEndings];

  // Append the respective
  return `${inning}${numberEnding}`;
}

function getWinningPitcher(boxscoreData: MLBBoxscore) {
  const { home_pitchers, away_pitchers } = boxscoreData;
  const allPitchers = [...home_pitchers, ...away_pitchers];
  return allPitchers.find((pitcher) => pitcher.win);
}

function getLosingPitcher(boxscoreData: MLBBoxscore) {
  const { home_pitchers, away_pitchers } = boxscoreData;
  const allPitchers = [...home_pitchers, ...away_pitchers];
  return allPitchers.find((pitcher) => pitcher.loss);
}

function getSavingPitcher(boxscoreData: MLBBoxscore) {
  const { home_pitchers, away_pitchers } = boxscoreData;
  const allPitchers = [...home_pitchers, ...away_pitchers];
  return allPitchers.find((pitcher) => pitcher.save);
}

function getHomeTeamRuns(boxscoreData: MLBBoxscore) {
  return boxscoreData?.home_batter_totals?.runs;
}

function getHomeTeamHits(boxscoreData: MLBBoxscore) {
  return boxscoreData?.home_batter_totals?.hits;
}

function getHomeTeamErrors(boxscoreData: MLBBoxscore) {
  return boxscoreData?.home_errors;
}

function getAwayTeamRuns(boxscoreData: MLBBoxscore) {
  return boxscoreData?.away_batter_totals?.runs;
}

function getAwayTeamHits(boxscoreData: MLBBoxscore) {
  return boxscoreData?.away_batter_totals?.hits;
}

function getAwayTeamErrors(boxscoreData: MLBBoxscore) {
  return boxscoreData?.away_errors;
}

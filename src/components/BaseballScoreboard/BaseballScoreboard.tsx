import styles from "./BaseballScoreboard.module.scss";
import { useBoxscoreData } from "@/providers/Boxscore/Boxscore.provider";
import { MLBBoxscore } from "@/models";
import { useMemo } from "react";

type tFormattedInningNumbers = {
  [key: number]: string;
};

const formattedInningNumbers: tFormattedInningNumbers = {
  1: "1st",
  2: "2nd",
  3: "3rd",
  4: "4th",
  5: "5th",
  6: "6th",
  7: "7th",
  8: "8th",
  9: "9th",
};

export default function BaseballScoreboard() {
  const boxscoreData = useBoxscoreData();
  const gameState = useMemo(() => {
    if (!boxscoreData?.home_period_scores || !boxscoreData?.away_period_scores) return null;
    const { home_period_scores, away_period_scores } = boxscoreData;
    const totalInningHalves = home_period_scores?.length + away_period_scores?.length;
    const currentInningNumber = Math.ceil(totalInningHalves / 2);
    const inningHalf = (totalInningHalves % 2 === 0 && "Btm") || "Top";
    const currentInning = formattedInningNumbers[currentInningNumber];
    const innings = Array.from(Array(currentInningNumber), (_, i) => i + 1);
    return { currentInning, inningHalf, innings };
  }, [boxscoreData]);

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
        <tr className={styles.statsRow}>
          <th scope="row">{boxscoreData?.home_team?.abbreviation}</th>
          {boxscoreData?.home_period_scores?.map((score, index) => (
            <td key={index}>{score}</td>
          ))}
          <td>{getHomeTeamRuns(boxscoreData as MLBBoxscore)}</td>
          <td>{getHomeTeamHits(boxscoreData as MLBBoxscore)}</td>
          <td>{getHomeTeamErrors(boxscoreData as MLBBoxscore)}</td>
        </tr>
        <tr className={styles.statsRow}>
          <th>{boxscoreData?.away_team?.abbreviation}</th>
          {boxscoreData?.away_period_scores?.map((score, index) => (
            <td key={index}>{score}</td>
          ))}
          <td>{getAwayTeamRuns(boxscoreData as MLBBoxscore)}</td>
          <td>{getAwayTeamHits(boxscoreData as MLBBoxscore)}</td>
          <td>{getAwayTeamErrors(boxscoreData as MLBBoxscore)}</td>
        </tr>
        <tr className={styles.teamsRow}>
          <td>
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
          <td>
            <h3>{boxscoreData?.away_team?.last_name}</h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
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

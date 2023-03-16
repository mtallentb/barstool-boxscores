import styles from "./BasketballScoreboard.module.scss";
import { useBoxscoreData } from "@/providers/Boxscore/Boxscore.provider";
import { NBABoxscore } from "@/models";
import { useMemo } from "react";

type tFormattedPeriodNumbers = {
  [key: number]: string;
};

const formattedPeriodNumbers: tFormattedPeriodNumbers = {
  1: "1st Qtr",
  2: "2nd Qtr",
  3: "3rd Qtr",
  4: "4th Qtr",
  5: "OT 1",
  6: "OT 2",
  7: "OT 3",
  8: "OT 4",
  9: "OT 5",
  10: "OT 6",
  11: "OT 7",
};

export default function BasketballScoreboard() {
  const boxscoreData = useBoxscoreData();
  const gameState = useMemo(() => {
    if (!boxscoreData?.home_period_scores || !boxscoreData?.away_period_scores) return null;
    const { home_period_scores, away_period_scores } = boxscoreData;
    const totalAmountOfScores = home_period_scores?.length + away_period_scores?.length;

    const currentPeriod = Math.ceil(totalAmountOfScores / 2);
    const currentFormattedPeriod = formattedPeriodNumbers[currentPeriod];

    const headers = ["", "Q1", "Q2", "Q3", "Q4", "Total"];
    if (currentPeriod > 4) {
      // The game is in an overtime period, so we need to add overtime headers
      const overtimeHeaders: Array<string> = [];
      const overtimePeriodAmount = currentPeriod - 4;

      // Add OT# for each extra period
      Array.from(Array(overtimePeriodAmount), (_, i) => i + 1).forEach((periodNumber) =>
        overtimeHeaders.push(`OT${periodNumber}`)
      );

      // Add overtime periods between Q4 and Total
      headers.splice(headers.length - 2, 0, ...overtimeHeaders);
    }
    return { currentFormattedPeriod, headers };
  }, [boxscoreData]);

  return (
    <table className={styles.scoreboard}>
      <thead>
        <tr>
          {gameState?.headers.map((value, index) => (
            <th scope="col" key={index}>
              {value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className={styles.statsRow}>
          <th scope="row">{boxscoreData?.home_team?.abbreviation}</th>
          {boxscoreData?.home_period_scores?.map((score, index) => (
            <td key={index}>{score}</td>
          ))}
          <td>{getHomePointsTotal(boxscoreData as NBABoxscore)}</td>
        </tr>
        <tr className={styles.statsRow}>
          <th>{boxscoreData?.away_team?.abbreviation}</th>
          {boxscoreData?.away_period_scores?.map((score, index) => (
            <td key={index}>{score}</td>
          ))}
          <td>{getAwayPointsTotal(boxscoreData as NBABoxscore)}</td>
        </tr>
        <tr className={styles.teamsRow}>
          <td>
            <h3>{boxscoreData?.home_team?.last_name}</h3>
          </td>
          <td>
            <span>
              {(boxscoreData?.event_information?.status === "completed" && "Final") ||
                gameState?.currentFormattedPeriod}
            </span>
          </td>
          <td>
            <h3>{boxscoreData?.away_team?.last_name}</h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function getHomePointsTotal(boxscoreData: NBABoxscore) {
  return boxscoreData?.home_totals?.points;
}

function getAwayPointsTotal(boxscoreData: NBABoxscore) {
  return boxscoreData?.away_totals?.points;
}

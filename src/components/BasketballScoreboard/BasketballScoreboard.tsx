import styles from "./BasketballScoreboard.module.scss";
import { useBoxscoreData } from "@/providers/Boxscore/Boxscore.provider";
import { NBABoxscore } from "@/models";
import { useMemo } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function BasketballScoreboard() {
  const boxscoreData = useBoxscoreData();

  const currentPeriod = useMemo(() => {
    if (!boxscoreData?.home_period_scores || !boxscoreData?.away_period_scores) return null;
    const { home_period_scores, away_period_scores } = boxscoreData;
    const totalAmountOfScores = home_period_scores?.length + away_period_scores?.length;
    return Math.ceil(totalAmountOfScores / 2);
  }, [boxscoreData]);

  const currentFormattedPeriod = useMemo(() => {
    if (!boxscoreData?.event_information?.status || !currentPeriod) return "";

    // Check the game status first. If the game is finished or hasn't started yet,
    // return the displayed value
    const { status } = boxscoreData.event_information;
    if (status === "completed") return "Final";

    // If the game is in-play, get the formatted period
    return getFormattedPeriod(currentPeriod);
  }, [boxscoreData, currentPeriod]);

  const scoreboardHeaders = useMemo(() => {
    const headers = ["", "Q1", "Q2", "Q3", "Q4", "Total"];
    if (!currentPeriod) return headers;

    // If the game is in an overtime period, we need to add overtime headers
    if (currentPeriod > 4) {
      const overtimeHeaders: Array<string> = [];
      const overtimePeriodAmount = currentPeriod - 4;

      // Add OT# for each extra period
      Array.from(Array(overtimePeriodAmount), (_, i) => i + 1).forEach((periodNumber) =>
        overtimeHeaders.push(`OT${periodNumber}`)
      );

      // Add overtime periods between Q4 and Total
      headers.splice(headers.length - 2, 0, ...overtimeHeaders);
    }
    return headers;
  }, [currentPeriod]);

  function getTeamColor(team: string | undefined) {
    if (!team) return "";
    const teamColors = {
      "oklahoma-city-thunder": styles.okcThunder,
      "miami-heat": styles.miamiHeat,
    };
    return teamColors[team as keyof typeof teamColors];
  }

  return (
    (boxscoreData && (
      <table className={styles.scoreboard}>
        <thead>
          <tr>
            {scoreboardHeaders.map((value, index) => (
              <th scope="col" key={index}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* HOME STAT LINE */}
          <tr className={styles.statsRow}>
            <th scope="row">{boxscoreData?.home_team?.abbreviation}</th>
            {boxscoreData?.home_period_scores?.map((score, index) => (
              <td key={index}>{score}</td>
            ))}
            <td>{getHomePointsTotal(boxscoreData as NBABoxscore)}</td>
          </tr>

          {/* AWAY STAT LINE */}
          <tr className={styles.statsRow}>
            <th>{boxscoreData?.away_team?.abbreviation}</th>
            {boxscoreData?.away_period_scores?.map((score, index) => (
              <td key={index}>{score}</td>
            ))}
            <td>{getAwayPointsTotal(boxscoreData as NBABoxscore)}</td>
          </tr>

          {/* TEAMS AND PERIOD */}
          <tr className={styles.teamsRow}>
            <td className={getTeamColor(boxscoreData?.home_team?.team_id)}>
              <h3>{boxscoreData?.home_team?.last_name}</h3>
            </td>
            <td>
              <span>{currentFormattedPeriod}</span>
            </td>
            <td className={getTeamColor(boxscoreData?.away_team?.team_id)}>
              <h3>{boxscoreData?.away_team?.last_name}</h3>
            </td>
          </tr>
        </tbody>
      </table>
    )) || <LoadingSpinner />
  );
}

function getFormattedPeriod(currentPeriod: number): string {
  const periodNumbers = {
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
  return periodNumbers[currentPeriod as keyof typeof periodNumbers];
}

function getHomePointsTotal(boxscoreData: NBABoxscore) {
  return boxscoreData?.home_totals?.points;
}

function getAwayPointsTotal(boxscoreData: NBABoxscore) {
  return boxscoreData?.away_totals?.points;
}

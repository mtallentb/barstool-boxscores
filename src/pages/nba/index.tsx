import { useBoxscoreData } from "@/providers/BoxscoreProvider/BoxscoreProvider";
import { useEffect } from "react";

export default function BoxscoresPage() {
  const boxscoreData = useBoxscoreData();

  useEffect(() => {
    if (boxscoreData) {
      console.log(boxscoreData);
    }
  }, [boxscoreData]);

  return (
    boxscoreData && (
      <table>
        <thead>
          <tr>
            <th scope="column">Team</th>
            <th scope="column">Q1</th>
            <th scope="column">Q2</th>
            <th scope="column">Q3</th>
            <th scope="column">Q4</th>
            <th scope="column">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{boxscoreData?.home_team?.abbreviation}</td>
            {boxscoreData?.home_period_scores?.map((score, index) => (
              <td key={index}>{score}</td>
            ))}
            <td>{boxscoreData?.home_totals?.points}</td>
          </tr>
          <tr>
            <td>{boxscoreData?.away_team?.abbreviation}</td>
            {boxscoreData?.away_period_scores?.map((score, index) => (
              <td key={index}>{score}</td>
            ))}
            <td>{boxscoreData?.away_totals?.points}</td>
          </tr>
        </tbody>
      </table>
    )
  );
}

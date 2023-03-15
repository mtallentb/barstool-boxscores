import { useBoxscoreData } from "@/providers/BoxscoreProvider/BoxscoreProvider";
import { useEffect } from "react";

const inningNumbers = Array.from(Array(9), (_, i) => i + 1);

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
            <th scope="col">Team</th>
            {inningNumbers.map((num) => (
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
          <tr>
            <td>{boxscoreData?.home_team?.abbreviation}</td>
            {boxscoreData?.home_period_scores?.map((score, index) => (
              <td key={index}>{score}</td>
            ))}
            <td>{boxscoreData?.home_batter_totals?.runs}</td>
            <td>{boxscoreData?.home_batter_totals?.hits}</td>
            <td>{boxscoreData?.home_errors}</td>
          </tr>
          <tr>
            <td>{boxscoreData?.away_team?.abbreviation}</td>
            {boxscoreData?.away_period_scores?.map((score, index) => (
              <td key={index}>{score}</td>
            ))}
            <td>{boxscoreData?.away_batter_totals?.runs}</td>
            <td>{boxscoreData?.away_batter_totals?.hits}</td>
            <td>{boxscoreData?.away_errors}</td>
          </tr>
        </tbody>
      </table>
    )
  );
}

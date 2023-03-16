import NBABoxscore from "@/models/nba/NBABoxscore";
import MLBBoxscore from "@/models/mlb/MLBBoxscore";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState, ReactNode, FC } from "react";
import { ParsedUrlQuery } from "querystring";

type tProps = { children: ReactNode };
type tBoxscore = NBABoxscore | MLBBoxscore | null;

export const BoxscoreContext = createContext<tBoxscore>(null);

export const BoxscoreProvider: FC<tProps> = ({ children }) => {
  const { query } = useRouter();
  const [boxscore, setBoxscore] = useState<tBoxscore>(null);

  useEffect(() => {
    if (queryIsReady(query)) {
      (async () => {
        try {
          const apiUrl = buildApiUrl(query);
          const response = await fetch(apiUrl);
          const mostRecentBoxscore: tBoxscore = await response.json();
          setBoxscore(mostRecentBoxscore);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [query]);

  return <BoxscoreContext.Provider value={boxscore}>{children}</BoxscoreContext.Provider>;
};

export function useBoxscoreData() {
  return useContext(BoxscoreContext);
}

function queryIsReady(query: ParsedUrlQuery): boolean {
  const requiredQuerySegments = ["sportsLeague", "homeTeamId", "awayTeamId", "gameDate"];
  return requiredQuerySegments.every((segment) => Object.keys(query).includes(segment));
}

function buildApiUrl(query: ParsedUrlQuery) {
  const { sportsLeague, homeTeamId, awayTeamId, gameDate } = query;
  return `/api/${sportsLeague}/${homeTeamId}/${awayTeamId}/${gameDate}`;
}

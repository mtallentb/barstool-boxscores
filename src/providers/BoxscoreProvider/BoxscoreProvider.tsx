import NBABoxscore from "@/models/nba/NBABoxscore";
import MLBBoxscore from "@/models/mlb/MLBBoxscore";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState, ReactNode, FC } from "react";

type tProps = { children: ReactNode };
type tBoxscoreEndpoints = {
  [key: string]: string;
};

const boxscoreEndpoints: tBoxscoreEndpoints = {
  "/nba": "/api/nba/boxscores/",
  "/mlb": "/api/mlb/boxscores/",
};

export const BoxscoreContext = createContext<NBABoxscore | MLBBoxscore | null>(null);

export const BoxscoreProvider: FC<tProps> = ({ children }) => {
  const { pathname } = useRouter();
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [boxscore, setBoxscore] = useState<NBABoxscore | MLBBoxscore | null>(null);

  useEffect(() => {
    // Only fetch the boxscore data if this is the initial page load
    // and an endpoint exists for the given pathname
    if (isInitialLoad && pathname && boxscoreEndpoints[pathname]) {
      (async () => {
        try {
          const response = await fetch(boxscoreEndpoints[pathname]);
          const mostRecentBoxscore = await response.json();
          setBoxscore(mostRecentBoxscore);

          // Ensure that this fetch only happens on initial load
          setIsInitialLoad(false);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [isInitialLoad, pathname]);

  return <BoxscoreContext.Provider value={boxscore}>{children}</BoxscoreContext.Provider>;
};

export const useBoxscoreData = () => useContext(BoxscoreContext);

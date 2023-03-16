import { BoxscoreProvider } from "@/providers/Boxscore/Boxscore.provider";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";
import styles from "@/styles/pages/boxscores.module.scss";
import { BaseballScoreboard, BasketballScoreboard } from "@/components";
import Head from "next/head";

type tScoreboardsDict = {
  [key: string]: ReactNode;
};

export default function BoxscoresPage() {
  const { query } = useRouter();
  const { sportsLeague } = query;
  const scoreboard = useMemo(() => {
    if (!sportsLeague) return null;
    const scoreboards: tScoreboardsDict = {
      mlb: <BaseballScoreboard />,
      nba: <BasketballScoreboard />,
    };
    return scoreboards[sportsLeague as keyof tScoreboardsDict];
  }, [sportsLeague]);

  return (
    <>
      <Head>
        <title>{sportsLeague?.toString().toUpperCase()} Barstool Boxscores</title>
      </Head>
      <BoxscoreProvider>
        <div className={styles.boxscores}>{scoreboard}</div>
      </BoxscoreProvider>
    </>
  );
}

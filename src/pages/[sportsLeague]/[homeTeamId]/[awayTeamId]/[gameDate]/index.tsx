import { BoxscoreProvider } from "@/providers/Boxscore/Boxscore.provider";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";
import styles from "@/styles/pages/boxscores.module.scss";
import { BaseballScoreboard, BasketballScoreboard } from "@/components";
import Head from "next/head";
import BaseLayout from "@/layouts/BaseLayout/BaseLayout";

type tScoreboards = {
  [key: string]: ReactNode;
};

export default function BoxscoresPage() {
  const { query } = useRouter();
  const { sportsLeague } = query;
  const scoreboard = useMemo(() => {
    if (!sportsLeague) return null;
    const scoreboards: tScoreboards = {
      mlb: <BaseballScoreboard />,
      nba: <BasketballScoreboard />,
    };
    return scoreboards[sportsLeague as keyof tScoreboards];
  }, [sportsLeague]);

  return (
    <BoxscoreProvider>
      <BaseLayout>
        <div className={styles.boxscores}>{scoreboard}</div>
      </BaseLayout>
    </BoxscoreProvider>
  );
}

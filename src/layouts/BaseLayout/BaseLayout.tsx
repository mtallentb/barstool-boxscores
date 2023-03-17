import styles from "./BaseLayout.module.scss";
import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

type tProps = { children: ReactNode };
export default function BaseLayout({ children }: tProps) {
  return (
    <>
      <Head>
        <title>Barstool Boxscores</title>
      </Head>
      <div className={styles.baseLayout}>
        <header>
          <h2>Barstool Boxscores</h2>
          <nav>
            <ul>
              <li>
                <Link href="/mlb/los-angeles-angels/seattle-mariners/2012-09-26">MLB Boxscore</Link>
              </li>
              <li>
                <Link href="/nba/miami-heat/oklahoma-city-thunder/2012-06-21">NBA Boxscore</Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </div>
    </>
  );
}

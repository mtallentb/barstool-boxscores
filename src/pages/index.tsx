import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";

export default function IndexPage() {
  useEffect(() => {
    Router.push("/nba/miami-heat/oklahoma-city-thunder/2012-06-21");
  }, []);

  return (
    <>
      <Head>
        <title>Barstool Boxscores</title>
      </Head>
      <main>
        <ul>
          <li>
            <Link href="/mlb/los-angeles-angels/seattle-mariners/2012-09-26">MLB Boxscore</Link>
          </li>
          <li>
            <Link href="/nba/miami-heat/oklahoma-city-thunder/2012-06-21">NBA Boxscore</Link>
          </li>
        </ul>
      </main>
    </>
  );
}

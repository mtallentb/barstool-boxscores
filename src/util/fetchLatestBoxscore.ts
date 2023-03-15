export async function fetchLatestBoxscore(boxscoreEndpoint: string) {
  try {
    const response = await fetch(boxscoreEndpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

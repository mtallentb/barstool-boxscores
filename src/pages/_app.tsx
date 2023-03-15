import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { BoxscoreProvider } from "@/providers/BoxscoreProvider/BoxscoreProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BoxscoreProvider>
      <Component {...pageProps} />
    </BoxscoreProvider>
  );
}

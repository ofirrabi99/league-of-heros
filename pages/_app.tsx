import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import "../styles/_global.scss";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className} wrapper`}>
      <Component {...pageProps} />
    </main>
  );
}

import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import "../styles/_global.scss";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import Layout from "../components/layout/Layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <main className={`${inter.className} wrapper`}>
        <ApolloProvider client={client}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </ApolloProvider>
      </main>
    </Layout>
  );
}

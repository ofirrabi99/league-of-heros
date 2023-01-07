import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import "../styles/_global.scss";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import Layout from "../components/layout/Layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/chakraUi";

fontAwesomeConfig.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <main className={`${inter.className} wrapper`}>
          <ApolloProvider client={client}>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </ApolloProvider>
        </main>
      </Layout>
    </ChakraProvider>
  );
}

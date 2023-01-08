import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import Layout from "../components/layout/Layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/chakraUi";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <main className={`${inter.className}`}>
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

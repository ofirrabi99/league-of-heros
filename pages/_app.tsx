import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import Layout from "../components/layout/Layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/chakraUi";
import AreYouSureDialog from "../components/shared/AreYouSureDialog";
import useAreYouSureDialog from "../state/useAreYouSureDialog";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const areYouSureDialog = useAreYouSureDialog();
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <ApolloProvider client={client}>
          <Layout>
            <main className={`${inter.className}`}>
              <Component {...pageProps} />
            </main>
          </Layout>
          <AreYouSureDialog
            isOpen={areYouSureDialog.isOpen}
            onClose={areYouSureDialog.onClose}
            onApprove={areYouSureDialog.onApprove}
            title={areYouSureDialog.title}
          >
            {areYouSureDialog.description}
          </AreYouSureDialog>
        </ApolloProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// TODO: change cache logic
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_URL,
  cache: new InMemoryCache({ addTypename: false }),
  defaultOptions,
});

export const injectCookies = (cookie: string | undefined) => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_URL,
  });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Cookie: cookie,
      },
    };
  });
  client.setLink(authLink.concat(httpLink));
};

export default client;

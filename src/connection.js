import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-boost";

const clientGraphql = new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: "Bearer yourauthtoken",
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  });

  export default clientGraphql
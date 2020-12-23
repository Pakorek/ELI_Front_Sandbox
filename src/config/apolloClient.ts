import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
// import { useAuthToken } from "./auth";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {useCookies} from "react-cookie";
/*
const {
  ApolloServer,
  gql,
  AuthenticationError,
} = require('apollo-server-express')
*/


const authMiddleware = (authToken: string): ApolloLink  =>
    new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        if (authToken) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            });
        }

        return forward(operation);
    });

const httpLink = new HttpLink({ uri: "http://127.0.0.1:4300/graphql" });

/*
const client = new ApolloClient({
    uri: 'http://127.0.0.1:4300/graphql',
    cache: new InMemoryCache({
        dataIdFromObject: (o: any) => o.id
    }),
});
*/

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
    const TOKEN_NAME = "authToken";

    const useAuthToken = () => {
        const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);
        const setAuthToken = (authToken: any) => setCookie(TOKEN_NAME, authToken);
        const removeAuthToken = () => removeCookie(TOKEN_NAME);
        return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
    };

    const [authToken] = useAuthToken();
    return new ApolloClient({
        link: authMiddleware(authToken).concat(httpLink) as any,
        cache: cache
    });
};

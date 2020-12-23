import React from "react";
import {useCookies} from "react-cookie";
import {ApolloProvider} from "@apollo/react-hooks";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {HttpLink} from "apollo-link-http";
import {ApolloLink} from "apollo-link";


export const Provider = (props: any): JSX.Element => {
    const TOKEN_NAME = "authToken";

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

    // custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
    const useAuthToken = () => {
        const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);
        const setAuthToken = (authToken: any) => setCookie(TOKEN_NAME, authToken);
        const removeAuthToken = () => removeCookie(TOKEN_NAME);
        return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
    };

    const httpLink = new HttpLink({ uri: "http://127.0.0.1:4300/graphql" });

    const cache = new InMemoryCache({});

    const [authToken] = useAuthToken();

    const client = new ApolloClient({
        link: authMiddleware(authToken).concat(httpLink) as any,
        cache: cache
    });

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}
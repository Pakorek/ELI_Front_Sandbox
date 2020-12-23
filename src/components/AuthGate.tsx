import React from "react";
import { useCookies } from "react-cookie";
import { useUserQuery } from "../network/userQuery";
import Private from "../pages/Private";
import AuthenticationForm from "../pages/AuthenticationForm";
import { useAuthToken } from "../config/auth";
import { Home } from './home/home'
import {useApolloClient} from "@apollo/react-hooks";

export const AuthGate = () => {
  const TOKEN_NAME = "authToken";

// custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
    const useAuthToken = () => {
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);
    const setAuthToken = (authToken: any) => setCookie(TOKEN_NAME, authToken);
    const removeAuthToken = () => removeCookie(TOKEN_NAME);
    return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
  };

    const useLogout = () => {
    const [, , removeAuthToken] = useAuthToken();
    const apolloClient = useApolloClient();

    const logout = async () => {
      await apolloClient.clearStore(); // we remove all information in the store
      removeAuthToken();
    };
    return logout;
  };

  const [authToken] = useAuthToken();
  const userData = useUserQuery();
  const [cookies, ,] = useCookies(["user"]);

  if (cookies && authToken) {
    // return <Private user={cookies} />;
    return <Home />;
  }
  return <AuthenticationForm loading={userData.loading} />;
};

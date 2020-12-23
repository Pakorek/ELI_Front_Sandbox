import { useCookies } from "react-cookie";
// import { useUserQuery } from "../network/userQuery";
import AuthenticationForm from "./AuthenticationForm";
import { useAuthToken } from "../hooks/auth";
import { Home } from './home/home'
const React = require('react');

export const AuthGate = () => {
  const [authToken] = useAuthToken();
  // const userData = useUserQuery();
  const [cookies, ,] = useCookies(["user"]);

  if (cookies && authToken) return <Home />;

  return <AuthenticationForm />;
};

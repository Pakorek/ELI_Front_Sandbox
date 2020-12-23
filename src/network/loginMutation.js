import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import { useAuthToken } from "../config/auth";

export const loginMutationGQL = gql`
  mutation auth($password: String!, $login: String!) {
    authenticate(password: $password, email: $login) {
      token
      user {
        email
      }
    }
  }
`;


export const useLoginMutation = () => {
  const [, setAuthToken, removeAuthtoken] = useAuthToken();
  const [, setCookie] = useCookies(["user"]);

  const [mutation, mutationResults] = useMutation(loginMutationGQL, {
    onCompleted: (data) => {
      // console.log(data.authenticate.user.email);
      setCookie("user", data.authenticate.user.email);
      setAuthToken(data.authenticate.token);
    },
  });

  // full login function
  const login = (user, password) => {
    removeAuthtoken();
    return mutation({
      variables: {
        password,
        login: user,
      },
    });
  };

  return [login, mutationResults];
};

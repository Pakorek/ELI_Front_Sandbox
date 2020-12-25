import gql from "graphql-tag";
import {FetchResult, useMutation} from "@apollo/react-hooks";
import { UserInput } from "../components/CreateUser";
import { useCookies } from "react-cookie";
// import { useAuthToken } from "../hooks/auth";

export const createUserMutationGQL = gql`
    mutation create($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        createUser(values: {
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            password: $password
        }) {
            firstName
            lastName
            email
        }
    }
`;


export const useCreateUserMutation = () => {
    // const [, setCookie] = useCookies(["user"]);

    const [mutation, mutationResults] = useMutation(createUserMutationGQL, {
        onCompleted: (data) => {
            // authentication
        },
    });

    const create = async (values: UserInput): Promise<FetchResult<any>> => {
        const {firstname, lastname, email, password} = values
        return await mutation({
            variables: {
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: password,
            },
        });
    };

    return [create, mutationResults];
};

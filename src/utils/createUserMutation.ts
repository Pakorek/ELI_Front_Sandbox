import gql from "graphql-tag";
import {FetchResult, useMutation} from "@apollo/react-hooks";
import { UserInput } from "../components/CreateUser";
import { useCookies } from "react-cookie";
import {useLoginMutation} from "./loginMutation";
// import { useAuthToken } from "../hooks/auth";

export const createUserMutationGQL = gql`
    mutation create($firstName: String!, $lastName: String!, $email: String!, $password: String!, $role: String!) {
        createUser(values: {
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            password: $password,
            role: $role
        }) {
            email
            password
        }
    }
`;


export const useCreateUserMutation = () => {
    // const [, setCookie] = useCookies(["user"]);

    const [mutation, mutationResults] = useMutation(createUserMutationGQL, {
        onCompleted: (data) => {
            console.log(data)
            // email verification ? (send email with link to login)
        },
    });

    const create = async (values: UserInput): Promise<FetchResult<any>> => {
        const {firstname, lastname, email, password, role} = values
        return await mutation({
            variables: {
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: password,
                role: role
            },
        });
    };

    return [create, mutationResults];
};

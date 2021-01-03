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
            firstName
            lastName
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

    // @ts-ignore
    const create = async (values: UserInput): Promise<FetchResult<any>> => {
        const {firstname, lastname, email, password, role} = values
        // if we catch Error here
        // we don't catch errors in CreateUser.tsx (onSubmit)
        // so we can't print them in the component
        // try {
            return await mutation({
                variables: {
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                    password: password,
                    role: role
                },
            });
        // } catch (err) {
        //     console.log('createUserMutation error', err.graphQLErrors[0].extensions.exception.validationErrors)
        // }
    };

    return [create, mutationResults];
};

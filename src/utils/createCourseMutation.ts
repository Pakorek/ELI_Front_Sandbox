import gql from "graphql-tag";
import {FetchResult, useMutation} from "@apollo/react-hooks";
import { UserInput } from "../components/CreateUser";
import { useCookies } from "react-cookie";
import {useLoginMutation} from "./loginMutation";
import { CourseInput } from '../components/CreateCourse';
// import { useAuthToken } from "../hooks/auth";

export const createCourseMutationGQL = gql`
    mutation create($title: String!, $subtitle: String, $content: String) {
        createCourse(values: {
            title: $title, 
            subtitle: $subtitle,
            content: $content
        }) {
            title
        }
    }
`;


export const useCreateCourseMutation = () => {
    // const [, setCookie] = useCookies(["user"]);

    const [mutation, mutationResults] = useMutation(createCourseMutationGQL, {
        onCompleted: (data) => {
            console.log(data)
            // email verification ? (send email with link to login)
        },
    });

    const create = async (values: CourseInput): Promise<FetchResult<any>> => {
        const {title, subtitle, content} = values
        // if we catch Error here
        // we don't catch errors in CreateUser.tsx (onSubmit)
        // so we can't print them in the component
        // try {
            return await mutation({
                variables: {
                    title: title,
                    subtitle: subtitle,
                    content: content
                },
            });
        // } catch (err) {
        //     console.log('createUserMutation error', err.graphQLErrors[0].extensions.exception.validationErrors)
        // }
    };

    return [create, mutationResults];
};

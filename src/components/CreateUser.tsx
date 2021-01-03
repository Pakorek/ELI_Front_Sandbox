import {useForm} from "react-hook-form";
import {useState} from "react";
import {useCreateUserMutation} from "../utils/createUserMutation";

const React = require('react')

export type UserInput = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string
}

const CreateUser = (): JSX.Element => {
    const [createUser, ] = useCreateUserMutation();
    const {handleSubmit, register} = useForm();
    const [error, setError] = useState([]);

    const onSubmit = async (values: UserInput) => {
        // can catch errors here and read validation messages from User Entity
        // but it's not 'front job'
        // can catch errors in createUserMutation (less operable)
        // but same thing
        // SO, need to deeply understand different Error (UserInputError, ApolloError, mutationError, etc)
        // and how and where manage them
        try {
            // @ts-ignore
            const user = await createUser(values)
            console.log('user created', user)
        } catch (err) {
            console.log('createUser errors', err.graphQLErrors[0].extensions.exception.validationErrors)
            setError(err.graphQLErrors[0].extensions.exception.validationErrors);
        }
    };
    return (
        <div style={{margin: "auto", padding: "100px"}}>
            <pre>Sign Up</pre>
            { error && error.map((err: any) => <pre> {JSON.stringify(Object.values(err.constraints))}</pre> )}
            <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
                <div>
                    <input
                        name="firstname"
                        ref={register()}
                        placeholder="firstname"
                    />
                </div>
                <div>
                    <input
                        name="lastname"
                        ref={register()}
                        placeholder="lastname"
                    />
                </div>
                <div>
                    <input
                        name="email"
                        type="email"
                        ref={register()}
                        placeholder="email"
                    />
                </div>
                <div>
                    <input
                        name="password"
                        type="password"
                        ref={register()}
                        placeholder="******"
                    />
                </div>
                <div>
                    <select name="role" ref={register()}>
                        <option value="TEACHER">Teacher</option>
                        <option value="STUDENT">Student</option>
                    </select>
                </div>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateUser;

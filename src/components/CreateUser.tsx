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
    const [error, setError] = useState();

    const onSubmit = async (values: UserInput) => {
        try {
            // @ts-ignore
            const user = await createUser(values)
            console.log(user)
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div style={{margin: "auto", padding: "100px"}}>
            <pre>Sign Up</pre>
            {error && <pre>try again</pre>}
            <form onSubmit={handleSubmit(onSubmit)}>
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

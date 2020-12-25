import { useForm } from "react-hook-form";
import{ useState } from "react";
import { useLoginMutation } from "../utils/loginMutation";
const React = require('react')

const AuthenticationForm = (): JSX.Element => {
  const [loginMutation, ] = useLoginMutation();
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState();

  const onSubmit = async (values: {email: string, password: string}) => {
    try {
      // @ts-ignore
      // don't know how to types this (yet)
      await loginMutation(values.email, values.password)
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div style={{ margin: "auto", padding: "100px" }}>
      <pre>Login</pre>
      {error && <pre>try again</pre>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input name="email" ref={register()} placeholder="email" />
        </div>
        <div>
          <input
            name="password"
            type="password"
            ref={register()}
            placeholder="******"
          />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthenticationForm;

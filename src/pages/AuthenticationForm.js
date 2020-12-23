import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useLoginMutation } from "../network/loginMutation";

const AuthenticationForm = ({ loading }) => {
  const [loginMutation, loginMutationResults] = useLoginMutation();
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState();

  const disableForm = loginMutationResults.loading || loading;

  const onSubmit = async (values) => {
    try {
      await loginMutation(values.email, values.password);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div style={{ margin: "auto", padding: "100px" }}>
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
        <button type="submit" disabled={disableForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthenticationForm;

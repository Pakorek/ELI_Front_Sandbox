import {useForm} from "react-hook-form";
import {useState} from "react";
import {useCreateQuestionMutation} from '../utils/createQuestionMutation';
import CreateQuestion from './CreateQuestion';
import { useCreateAnswerMutation } from '../utils/createAnswerMutation';

const React = require('react')

export type AnswerInput = {
  title: string,
  subtitle?: string,
  content?: string,
}

const CreateAnswer = (radioType: boolean): JSX.Element => {
  const [create, ] = useCreateAnswerMutation();
  const {handleSubmit, register} = useForm();
  const [error, setError] = useState([]);
  const [answer, setAnswer] = useState()
  const inputType = radioType ? 'radio' : 'checkbox';

  const onSubmit = async (values: AnswerInput) => {
    try {
      // @ts-ignore
      const answer = await create(values)
      setAnswer(answer)
    } catch (e) {
      console.log(e)
      setError(e)
      // setError(e.graphQLErrors[0].extensions.exception.validationErrors ?? e.graphQLErrors[0].message);
    }

  };

  return (
    <div style={{margin: "auto", padding: "20px", border: "1px solid black"}}>
      <pre>Create Answer</pre>
      {/*{ user && <pre>{JSON.stringify(user) + ' created'}</pre>}*/}
      { error && <code>{JSON.stringify(error)}</code>}
      {/*{ typeof error !== "object"*/}
      {/*  ? <pre>{JSON.stringify(error)}</pre>*/}
      {/*  : error.map((err: any) => <pre> {JSON.stringify(Object.values(err.constraints))}</pre> )*/}
      {/*}*/}
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <div>
          <input
            name="label"
            type={inputType}
            ref={register()}
            placeholder="Answer..."
          />
        </div>
        <div>
          <input type="checkbox" name="is_right" ref={register()} id="isRight" />
          <label htmlFor="isRight">Correct</label>
        </div>
{/*
        <div>
          <input
            name="content"
            ref={register()}
            placeholder="Content"
          />
        </div>
*/}
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAnswer;

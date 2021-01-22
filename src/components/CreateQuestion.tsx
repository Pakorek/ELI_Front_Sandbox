import {useForm} from "react-hook-form";
import {useState} from "react";
import {useCreateQuestionMutation} from '../utils/createQuestionMutation';
import CreateAnswer from './CreateAnswer';

const React = require('react')

export type QuizInput = {
  title: string,
  subtitle?: string,
  content?: string,
}

const CreateQuestion = (): JSX.Element => {
  const [create, ] = useCreateQuestionMutation();
  const {handleSubmit, register} = useForm();
  const [error, setError] = useState([]);
  const [question, setQuestion] = useState()

  const onSubmit = async (values: QuizInput) => {
    try {
      // @ts-ignore
      const question = await create(values)
      setQuestion(question)
    } catch (e) {
      console.log(e)
      setError(e)
      // setError(e.graphQLErrors[0].extensions.exception.validationErrors ?? e.graphQLErrors[0].message);
    }

  };

  return (
    <div style={{margin: "auto", padding: "50px", border: "1px solid black"}}>
      <pre>Create Question</pre>
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
            ref={register()}
            placeholder="Question..."
          />
        </div>
        <div>
          <input
            name="subtitle"
            ref={register()}
            placeholder="Subtitle"
          />
        </div>
        <CreateAnswer />
        <CreateAnswer />
        <CreateAnswer />
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

export default CreateQuestion;

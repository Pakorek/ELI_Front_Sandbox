import {useForm} from "react-hook-form";
import {useState} from "react";
import {useCreateQuestionMutation} from '../utils/createQuestionMutation';
import CreateAnswer from './CreateAnswer';
import { QuestionType } from './CreateQuiz';

const React = require('react')

export type QuizInput = {
  title: string,
  subtitle?: string,
  content?: string,
}

// const CreateQuestion = ({question, key}: {question: QuestionType, key: number}): JSX.Element => {
const CreateQuestion = ({ question, num }: {question: QuestionType, num: number}): JSX.Element => {
  const [create, ] = useCreateQuestionMutation();
  const {handleSubmit, register} = useForm();
  const [error, setError] = useState();
  const [label, setLabel] = useState()
  const inputType = question.hasUniqueAnswer;
  // console.log('label', question)
  // console.log('key', num)


  const onSubmit = async (values: QuizInput) => {
    try {
      // @ts-ignore
      const label = await create(values)
      setLabel(label)
    } catch (e) {
      console.log(e)
      setError(e)
      // setError(e.graphQLErrors[0].extensions.exception.validationErrors ?? e.graphQLErrors[0].message);
    }

  };

  return (
    <div style={{margin: "auto", padding: "20px", border: "1px solid black"}}>
      <pre>{'Question ' + num?.toString() }</pre>
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
            value={question.label}
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
        <div>
          <input type="checkbox" name="has_unique_answer" ref={register()} id="isUnique" />
          <label htmlFor="isUnique">Unique answer</label>
        </div>
        {/* if unique : CreateAnswer type radio, else type checkbox  */}
        {/*<CreateAnswer {...inputType}/>*/}
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

import {useForm} from "react-hook-form";
import {useState} from "react";
import {useCreateCourseMutation} from '../utils/createCourseMutation';
import CreateQuestion from './CreateQuestion';

const React = require('react')

export type QuizInput = {
  title: string,
  subtitle?: string,
  content?: string,
}

const CreateQuiz = (): JSX.Element => {
  const [create, ] = useCreateCourseMutation();
  const {handleSubmit, register} = useForm();
  const [error, setError] = useState([]);
  const [quiz, setQuiz] = useState()
  const [title, setTitle] = useState('Quiz Title')
  const [subtitle, setSubtitle] = useState('Subtitle')

  const onSubmit = async (values: QuizInput) => {
    try {
      // @ts-ignore
      const quiz = await create(values)
      setQuiz(quiz)
    } catch (e) {
      console.log(e)
      setError(e)
      // setError(e.graphQLErrors[0].extensions.exception.validationErrors ?? e.graphQLErrors[0].message);
    }

  };

  return (
    <section style={{display: "flex", width: "100%"}}>
      <div style={{width: "50%", padding: "20px", border: "1px solid black"}}>
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
      </div>
      <div style={{width: "50%", padding: "20px", border: "1px solid black"}}>
        <pre>Create Quiz</pre>
        {/*{ user && <pre>{JSON.stringify(user) + ' created'}</pre>}*/}
        { error && <code>{JSON.stringify(error)}</code>}
        {/*{ typeof error !== "object"*/}
        {/*  ? <pre>{JSON.stringify(error)}</pre>*/}
        {/*  : error.map((err: any) => <pre> {JSON.stringify(Object.values(err.constraints))}</pre> )*/}
        {/*}*/}
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
          <div>
            <input
              name="title"
              ref={register()}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              name="subtitle"
              ref={register()}
              placeholder="Subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <CreateQuestion />
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
    </section>
  );
};

export default CreateQuiz;

import { CardRow, Container, Footer, Header } from '../styles/elements';
import CreateQuiz from './CreateQuiz';
import QuizContext from '../context/QuizContext';
import { FormEvent, useEffect, useReducer, useState } from 'react';
import quizReducer from '../reducers/quizReducer';
import useCreateQuiz from '../hooks/useCreateQuiz';
import CreateQuestion from './CreateQuestion';

const React = require('react');

const initialState = {
  title: '',
  subtitle: '',
  questions: [],
};

const newQuestion = {
  id: 0,
  label: '',
};

export interface Question {
  id: number;
  label: string;
}

export function QuizEditor(): JSX.Element {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { inputTitle, inputSubtitle, inputQuestions, formSubmission, error } = useCreateQuiz();

  const [question, setQuestion] = useState<Question>({ id: 0, label: 'initial' });
  const [questions, setQuestions] = useState<Question[]>([question]);
  const [questionLabel, setQuestionLabel] = useState('');

  const questionID = questions.length;

  useEffect(() => {
    const upQuestions = questions.slice()
    const id = question.id
    const upQuest = upQuestions.filter(question => question.id === id)
    upQuest[0].label = question.label
    setQuestions(upQuestions)
  }, [question]);

  const addQuestion = (event: FormEvent) => {
    event.preventDefault();
    console.log('AddQUestion');
    setQuestions([
      ...questions,
      {
        id: questions.length,
        label: questionLabel,
      },
    ]);
    setQuestionLabel('');
  };


  return (
    <QuizContext.Provider value={dispatch}>
      <Container>
        <div style={{ width: '50%', padding: '24px', border: '1px solid black' }}>
          <h2>{inputTitle.value}</h2>
          <h4>{inputSubtitle.value}</h4>


          <ul>
            {questions.map((question: Question) => <li key={question.id}> {question.id + '. ' + question.label} </li>)}
            {/*{ questions.map( (question: Question) => console.log(question)) }*/}
          </ul>

          {/*
          <ul>
            {inputQuestions.value.map((question: { label: string }, key: number) =>
              <li>{++key + '. ' + question.label}</li>)}
          </ul>

          {state.questions?.map((question, key) => <div><h6>{++key + '. ' + question.label}</h6></div>)}
*/}

        </div>


        <div style={{ width: '50%', padding: '10px', border: '1px solid black' }}>
          <pre>Quiz Editor</pre>
          {error !== '' && <pre>{error}</pre>}

          <form onSubmit={formSubmission} noValidate>
            <div>
              <input
                name="title"
                style={{ border: 'none', borderBottom: '2px solid black', marginBottom: '20px' }}
                // ref={register()}
                // placeholder="Title"
                value={inputTitle.value}
                onChange={inputTitle.onChange}
                // onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                style={{ border: 'none', borderBottom: '2px solid black', marginBottom: '20px' }}
                name="subtitle"
                // ref={register()}
                // placeholder="Subtitle"
                value={inputSubtitle.value}
                onChange={inputSubtitle.onChange}

                // onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>


            <button
              type="button"
              onClick={() => setQuestions([...questions, newQuestion])}
            >
              New Question
            </button>
            {questions.map((question: Question) => (
                <CreateQuestion question={question} setQuestion={setQuestion} />
              )
            )}
          </form>
        </div>
      </Container>
    </QuizContext.Provider>
  );
}
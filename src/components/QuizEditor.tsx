import { CardRow, Container, Footer, Header } from '../styles/elements';
import CreateQuiz from './CreateQuiz';
import QuizContext from '../context/QuizContext';
import { FormEvent, useEffect, useReducer, useState } from 'react';
import quizReducer from '../reducers/quizReducer';
import useCreateQuiz from '../hooks/useCreateQuiz';
import CreateQuestion from './CreateQuestion';
import CreateAnswer, { Answer } from './CreateAnswer';

const React = require('react');

export interface Question {
  id: number;
  label: string;
  answers: Answer[]
}

export let initialQuestion: Question = {
  id: 1,
  label: 'New Question',
  answers: [{ id: 1, label: 'New Answer...' }],
};

export type QuizState = {
  title: string,
  subtitle?: string,
  questions: Question[]
}

const initialState: QuizState = {
  title: 'Title',
  subtitle: 'Subtitle',
  questions: [{
    id: 1,
    label: 'New Question',
    answers: [{ id: 1, label: 'New Answer...' }],
  }],
};

export function QuizEditor(): JSX.Element {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { inputTitle, inputSubtitle, inputQuestions, formSubmission, error } = useCreateQuiz();

/*
  const [question, setQuestion] = useState<Question>(initialQuestion);
  const [questions, setQuestions] = useState<Question[]>([question]);
  const [answer, setAnswer] = useState<Answer>({ id: 1, label: 'New Answer ...' });
*/

  const [quiz, setQuiz] = useState<QuizState>(initialState);

/*
  useEffect(() => {
    const upQuestions = questions.slice();
    const id = question.id;
    const upQuest = questions.filter(q => q.id === id);
    if (upQuest[0] !== undefined) upQuest[0].label = question.label;
    setQuestions(upQuestions);
  }, [question]);

  useEffect(() => {
    const liveAnswer = question.answers.filter(a => a.id === answer.id);
    liveAnswer[0].label = answer.label;
  }, [answer]);
*/

  const updateTitle = (value: string) => {
    dispatch({ type: 'UPDATE_TITLE', newTitle: value });
  };

  const updateSubtitle = (value: string) => {
    dispatch({ type: 'UPDATE_SUBTITLE', newSubtitle: value });
  };

  return (
    <QuizContext.Provider value={dispatch}>
      <Container>
        <div style={{ width: '50%', padding: '24px', border: '1px solid black' }}>
          <h2>{state.title}</h2>
          <h4>{state.subtitle}</h4>

          <ul>
            {state.questions.map((q: Question) => (
              <li key={q.id}>
                {q.id + '. ' + q.label}
                <ul>
                  {q.answers.map(a => (
                    <li key={a.id}>
                      {a.id + '. ' + a.label}</li>
                  ))}
                </ul>
              </li>),
            )}
          </ul>
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
                value={state.title}
                onChange={e => updateTitle(e.target.value)}
                // onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                style={{ border: 'none', borderBottom: '2px solid black', marginBottom: '20px' }}
                name="subtitle"
                // ref={register()}
                // placeholder="Subtitle"
                value={state.subtitle}
                onChange={e => updateSubtitle(e.target.value)}

                // onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>

            {state.questions.map((q: Question, key: number) => (


              <CreateQuestion
                              state={state}
                              dispatch={dispatch}
                              question={q}
                              key={key}
              />
            ))}
            {/*<CreateAnswer*/}
            {/*  answer={answer}*/}
            {/*  setAnswer={setAnswer}*/}
            {/*  question={question}*/}
            {/*  setQuestion={setQuestion}*/}
            {/*/>*/}
          </form>
        </div>
      </Container>
    </QuizContext.Provider>
  );
}
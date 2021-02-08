import React from 'react';
import { Container } from '../styles/elements';
import QuizContext from '../context/QuizContext';
import { useReducer } from 'react';
import quizReducer from '../reducers/quizReducer';
import useCreateQuiz from '../hooks/useCreateQuiz';
import CreateQuestion from './CreateQuestion';
import { Answer } from './CreateAnswer';

export interface Question {
  id: number;
  label: string;
  answers: Answer[]
}

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
    answers: [{ id: 1, label: 'New Answer...', questionID: 1 }],
  }],
};

export function QuizEditor(): JSX.Element {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { formSubmission, error } = useCreateQuiz();

  const updateTitle = (value: string) => {
    dispatch({ type: 'UPDATE_TITLE', newTitle: value });
  };

  const updateSubtitle = (value: string) => {
    dispatch({ type: 'UPDATE_SUBTITLE', newSubtitle: value });
  };

  const addQuestion = () => {
    dispatch({ type: 'ADD_QUESTION' });
  };

  return (
    <QuizContext.Provider value={dispatch}>
      <Container>
        <div style={{ width: '50%', padding: '24px', border: '1px solid black' }}>
          <h2>{state.title}</h2>
          <h4>{state.subtitle}</h4>

          <ul>
            {state.questions.map((q: Question, key: number) => (
              <li key={key}>
                {++key + '. ' + q.label}
                <ul>
                  {q.answers.map((a: Answer, key: number) => (
                    <li key={key}>
                      {++key + '. ' + a.label}</li>
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
                value={state.title}
                onChange={e => updateTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                style={{ border: 'none', borderBottom: '2px solid black', marginBottom: '20px' }}
                name="subtitle"
                value={state.subtitle}
                onChange={e => updateSubtitle(e.target.value)}
              />
            </div>
            <button type="button" onClick={addQuestion}>
              New Question
            </button>


            {state.questions.map((q: Question, key: number) => (
              <CreateQuestion
                dispatch={dispatch}
                question={q}
                key={key}
              />
              ))}
          </form>
        </div>
      </Container>
    </QuizContext.Provider>
  );
}
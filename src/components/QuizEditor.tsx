import { CardRow, Container, Footer, Header } from '../styles/elements';
import CreateQuiz from './CreateQuiz';
import QuizContext from '../context/QuizContext';
import { useReducer } from 'react';
import quizReducer from '../reducers/quizReducer';
import useCreateQuiz from '../hooks/useCreateQuiz';

const React = require('react');

const initialState = {
  title: '',
  subtitle: '',
  questions: [],
};

export function QuizEditor(): JSX.Element {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { inputTitle, inputSubtitle, inputQuestions, formSubmission, error } = useCreateQuiz()


  return (
    <QuizContext.Provider value={dispatch}>
      <Container>
        <div style={{ width: '50%', padding: '24px', border: '1px solid black' }}>
          <h2>{inputTitle.value}</h2>
          <h4>{inputSubtitle.value}</h4>

          {state.questions?.map((question, key) => <div><h6>{++key + '. ' + question.label}</h6></div>)}

        </div>
        <CreateQuiz />
      </Container>
    </QuizContext.Provider>
  );
}
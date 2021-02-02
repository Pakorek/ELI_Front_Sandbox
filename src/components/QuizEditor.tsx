import { CardRow, Container, Footer, Header } from '../styles/elements';
import CreateQuiz from './CreateQuiz';
import QuizContext from '../context/QuizContext';
import { FormEvent, useEffect, useReducer, useState } from 'react';
import quizReducer from '../reducers/quizReducer';
import useCreateQuiz from '../hooks/useCreateQuiz';
import CreateQuestion from './CreateQuestion';
import CreateAnswer, { Answer } from './CreateAnswer';

const React = require('react');

const initialState = {
  title: '',
  subtitle: '',
  questions: [],
};

export const initialQuestion: Question = {
  id: 1,
  label: 'New Question',
  answers: [{ id: 1, label: 'New Answer...' }],
};

const newQuestion = {
  id: 0,
  label: '',
};

export interface Question {
  id: number;
  label: string;
  answers: Answer[]
}

export function QuizEditor(): JSX.Element {
   console.log('re rendered')
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { inputTitle, inputSubtitle, inputQuestions, formSubmission, error } = useCreateQuiz();

  const [question, setQuestion] = useState<Question>(initialQuestion);
  const [questions, setQuestions] = useState<Question[]>([question]);
  const [answer, setAnswer] = useState<Answer>({ id: 1, label: 'New Answer ...' });

  useEffect(() => {
    const upQuestions = questions.slice();
    const id = question.id;
    const upQuest = questions.filter(q => q.id === id);
    if (upQuest[0] !== undefined) upQuest[0].label = question.label;
    setQuestions(upQuestions);
  }, [question]);

  useEffect(() => {
    const liveAnswer = question.answers.filter(a => a.id === answer.id);
    console.log('liveAnswer', liveAnswer);
    console.log('question', question);
    console.log('questions', questions);
    liveAnswer[0].label = answer.label;

    }, [answer]);

  return (
    <QuizContext.Provider value={dispatch}>
      <Container>
        <div style={{ width: '50%', padding: '24px', border: '1px solid black' }}>
          <h2>{inputTitle.value}</h2>
          <h4>{inputSubtitle.value}</h4>

          <ul>
            {questions.map((question: Question) => (
              <li key={question.id}>
                {question.id + '. ' + question.label}
                <ul>
                  {question.answers.map(answer => (
                    <li key={answer.id}>
                      {answer.id + '. ' + answer.label}</li>
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

            <CreateQuestion question={question}
                            questions={questions}
                            answer={answer}
                            setQuestion={setQuestion}
                            setQuestions={setQuestions}
                            setAnswer={setAnswer}
            />
            <CreateAnswer
              answer={answer}
              setAnswer={setAnswer}
              question={question}
              setQuestion={setQuestion}
            />
          </form>
        </div>
      </Container>
    </QuizContext.Provider>
  );
}
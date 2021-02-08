import React, { useState } from 'react';
import { useCreateQuestionMutation } from '../utils/createQuestionMutation';
import CreateAnswer, { Answer } from './CreateAnswer';
import { Question } from './QuizEditor';
import { Action } from '../reducers/quizReducer';

export type QuizInput = {
  title: string,
  subtitle?: string,
  content?: string,
}

const CreateQuestion = ({ dispatch, question }:
                          {
                            dispatch: React.Dispatch<Action>,
                            question: Question
                          },
): JSX.Element => {
  const [create] = useCreateQuestionMutation();
  const [error, setError] = useState();

  const updateLabel = (value: string) => {
    dispatch({ type: 'UPDATE_QUESTION', id: question.id, label: value });
  };

  const removeQuestion = () => {
    dispatch({ type: 'REMOVE_QUESTION', id: question.id });
  };

  const addAnswer = () => {
    dispatch({ type: 'ADD_ANSWER', questionId: question.id, questionLen: question.answers.length });
  };


  return (
    <div style={{ margin: 'auto', padding: '20px', border: '1px solid black' }}>
      <form>
        <label>
          <input
            name="label"
            value={question.label}
            onChange={e => updateLabel(e.target.value)}
          />
        </label>
        <button type="button" onClick={removeQuestion}>
          X
        </button>
        <div>
          <label>
            <input type="checkbox" name="is_multiple"/>
            <small>Plusieurs réponses possibles</small>
          </label>
        </div>
      </form>
      {question.answers.map((answer: Answer, key: number) => (
        <CreateAnswer dispatch={dispatch}
                      answer={answer}
                      key={key}
                      questionID={question.id}
                      uniqueAnswer={question.uniqueAnswer}
        />
      ))}
      <button type="button" onClick={addAnswer}>
        Add Answer
      </button>
    </div>
  );
};

export default CreateQuestion;

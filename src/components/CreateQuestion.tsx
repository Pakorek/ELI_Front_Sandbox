import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useCreateQuestionMutation } from '../utils/createQuestionMutation';
import CreateAnswer, { Answer } from './CreateAnswer';
import { Question, QuizState } from './QuizEditor';
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

  const onSubmit = () => {
    dispatch({ type: 'ADD_QUESTION' });
  };

  const updateLabel = (value: string) => {
    dispatch({ type: 'UPDATE_QUESTION', id: question.id, label: value });
  };

  const removeQuestion = () => {
    dispatch({ type: 'REMOVE_QUESTION', id: question.id });
  };

  return (
    <div>
      <h4>New Question</h4>
      <form onSubmit={onSubmit}>
        <label>
          <input
            name="label"
            value={question.label}
            onChange={e => updateLabel(e.target.value)}
          />
        </label>
        <button type="submit">
          Add
        </button>
      </form>
      <button type="button" onClick={removeQuestion}>
        X
      </button>
      <hr />
      {question.answers.map((answer: Answer, key: number) => (
        <CreateAnswer dispatch={dispatch}
                      answer={answer}
                      key={key}
                      questionID={question.id}
                      questionLen={question.answers.length}
        />
      ))}

    </div>
  );
};

export default CreateQuestion;

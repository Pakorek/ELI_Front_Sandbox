import React, { Dispatch, SetStateAction, useState } from 'react';
import { useCreateQuestionMutation } from '../utils/createQuestionMutation';
import { Answer } from './CreateAnswer';
import { initialQuestion, Question, QuizState } from './QuizEditor';
import { Action } from '../reducers/quizReducer';

export type QuizInput = {
  title: string,
  subtitle?: string,
  content?: string,
}


const CreateQuestion = ({ dispatch, state, question }:
                          {
                            dispatch: React.Dispatch<Action>,
                            state: QuizState,
                            question: Question
                          },
): JSX.Element => {
  const [create] = useCreateQuestionMutation();
  const [error, setError] = useState();
  // const inputType = question.hasUniqueAnswer;

  const onSubmit = () => {
    dispatch({ type: 'ADD_QUESTION' });
  };

  const updateLabel = (value: string) => {
    dispatch({ type: 'UPDATE_QUESTION', id: question.id, label: value });
  };

  const stateQuestion = state.questions.find(q => q.id === question.id);


  return (
    <div>
      <h4>New Question</h4>
      <hr />
      <form onSubmit={onSubmit}>
        <label>
          <input
            name="label"
            value={stateQuestion?.label}
            onChange={e => updateLabel(e.target.value)}
          />
        </label>
        <button type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;

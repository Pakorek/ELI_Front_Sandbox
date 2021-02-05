import React, { Dispatch, useState } from 'react';
import { useCreateQuestionMutation } from '../utils/createQuestionMutation';
import CreateQuestion from './CreateQuestion';
import { useCreateAnswerMutation } from '../utils/createAnswerMutation';
import { Question, QuizState } from './QuizEditor';
import { Action } from '../reducers/quizReducer';

export type Answer = {
  id: number,
  label: string,
  questionID: number
}

const CreateAnswer = ({ dispatch, answer, questionID, questionLen }:
                        {
                          dispatch: React.Dispatch<Action>,
                          answer: Answer,
                          questionID: number,
                          questionLen: number
                        },
): JSX.Element => {

  const updateLabel = (value: string) => {
    dispatch({ type: 'UPDATE_ANSWER', id: answer.id, label: value, questionID: questionID});
  };

  const addAnswer = () => {
    dispatch({ type: 'ADD_ANSWER', questionId: questionID, answerID: answer.id, questionLen: questionLen });
  };

  const removeAnswer = () => {
    dispatch({ type: 'REMOVE_ANSWER', questionID: questionID, id: answer.id });
  };


  return (
    <div style={{ margin: 'auto', padding: '20px', border: '1px solid black' }} >
      <pre>Create Answer</pre>
      <form noValidate >
          <input
            name="label"
            type='text'
            value={answer.label}
            onChange={e => updateLabel(e.target.value)}

          />
{/*
        <div>
          <input type="checkbox" name="is_right" id="isRight" />
          <label htmlFor="isRight">Correct</label>
        </div>

*/}
        <button type="button" onClick={addAnswer}>
          Add Answer
        </button>
        <button type="button" onClick={removeAnswer}>
          X
        </button>

      </form>
    </div>
  );
};

export default CreateAnswer;

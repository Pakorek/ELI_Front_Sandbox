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

const CreateAnswer = ({ dispatch, answer, questionID }:
                        {
                          dispatch: React.Dispatch<Action>,
                          answer: Answer,
                          questionID: number
                        },
): JSX.Element => {

  const updateLabel = (value: string) => {
    dispatch({ type: 'UPDATE_ANSWER', id: answer.id, label: value, questionID: questionID});
  };


  const onSubmit = () => {
/*
    const answers = question.answers.slice()
    question.answers = [...answers, answer]
    setAnswer({id: ++answer.id, label: 'New Answer...'})
*/
  };

  return (
    <div style={{ margin: 'auto', padding: '20px', border: '1px solid black' }}>
      <pre>Create Answer</pre>
      <form onSubmit={onSubmit} noValidate>
        <div>
          <input
            name="label"
            type='text'
            value={answer.label}
            onChange={e => updateLabel(e.target.value)}

          />
        </div>
{/*
        <div>
          <input type="checkbox" name="is_right" id="isRight" />
          <label htmlFor="isRight">Correct</label>
        </div>
*/}
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
  );
};

export default CreateAnswer;

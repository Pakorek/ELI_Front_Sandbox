import React from 'react';
import { Action } from '../reducers/quizReducer';

export type Answer = {
  id: number,
  label: string,
  questionID: number,
  isCorrect: boolean
}

const CreateAnswer = ({ dispatch, answer, questionID, uniqueAnswer }:
                        {
                          dispatch: React.Dispatch<Action>,
                          answer: Answer,
                          questionID: number,
                          uniqueAnswer: boolean
                        },
): JSX.Element => {

  const updateLabel = (value: string) => {
    dispatch({ type: 'UPDATE_ANSWER_LABEL', id: answer.id, label: value, questionID: questionID });
  };

  const removeAnswer = () => {
    dispatch({ type: 'REMOVE_ANSWER', questionID: questionID, id: answer.id });
  };

  return (
    <div style={{ margin: 'auto', padding: '10px' }}>
      <form noValidate>
        <div style={{ display: 'flex' }}>
          <input type={uniqueAnswer ? 'radio' : 'checkbox'} />
          <input
            name="label"
            type='text'
            value={answer.label}
            onChange={e => updateLabel(e.target.value)}
          />
          <button type="button" onClick={removeAnswer}>X</button>
        </div>
{/*
        <div>
          <input type="checkbox" name="is_right" id="isRight" />
          <label htmlFor="isRight">Correct</label>
        </div>
*/}
      </form>
    </div>
  );
};

export default CreateAnswer;

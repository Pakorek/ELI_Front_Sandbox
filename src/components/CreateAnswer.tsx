import React, { Dispatch, useState } from 'react';
import { useCreateQuestionMutation } from '../utils/createQuestionMutation';
import CreateQuestion from './CreateQuestion';
import { useCreateAnswerMutation } from '../utils/createAnswerMutation';
import { Question } from './QuizEditor';
export type Answer = {
  id: number,
  label: string,
}

const CreateAnswer = ({ question, setQuestion, answer, setAnswer }:
                        {
                          question: Question,
                          setQuestion: Dispatch<React.SetStateAction<Question>>,
                          answer: Answer,
                          setAnswer: Dispatch<React.SetStateAction<Answer>>,
                        },
): JSX.Element => {

  const updateAnswerLabel = (id: number, label: string) => {
    setAnswer({id: id, label: label})
  };


  const onSubmit = () => {
    const answers = question.answers.slice()
    question.answers = [...answers, answer]
    setAnswer({id: ++answer.id, label: 'New Answer...'})
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
            onChange={e => updateAnswerLabel(answer.id, e.target.value)}

          />
        </div>
        <div>
          <input type="checkbox" name="is_right" id="isRight" />
          <label htmlFor="isRight">Correct</label>
        </div>
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

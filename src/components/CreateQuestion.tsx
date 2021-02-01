import { useForm } from 'react-hook-form';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useCreateQuestionMutation } from '../utils/createQuestionMutation';
import CreateAnswer from './CreateAnswer';
import { QuestionType } from './CreateQuiz';
import { Question } from './QuizEditor';

export type QuizInput = {
  title: string,
  subtitle?: string,
  content?: string,
}

// const CreateQuestion = ({question, key}: {question: QuestionType, key: number}): JSX.Element => {
const CreateQuestion = ({ question, setQuestion }:
                          {
                            question: Question,
                            setQuestion: Dispatch<React.SetStateAction<Question>>,
                            // setQuestions: SetStateAction<Question[]>
                          },
): JSX.Element => {
  const [create] = useCreateQuestionMutation();
  const [error, setError] = useState();
  // const inputType = question.hasUniqueAnswer;

  const updateQuestion = (id: number, label: string) => {
    setQuestion({id: id, label: label})
  };


  const onSubmit = async (values: QuizInput) => {
/*
    try {
      // @ts-ignore
      const label = await create(values);
      setLabel(label);
    } catch (e) {
      console.log(e);
      setError(e);
      // setError(e.graphQLErrors[0].extensions.exception.validationErrors ?? e.graphQLErrors[0].message);
    }
*/

  };

  return (
    <div key={question.id}>
      <form>
        <label>
          <input
            name="label"
            value={question.label}
            onChange={e => updateQuestion(question.id, e.target.value)}
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

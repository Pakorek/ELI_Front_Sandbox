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
const CreateQuestion = ({ question, questions, setQuestion, setQuestions }:
                          {
                            question: Question,
                            questions: Question[],
                            setQuestion: Dispatch<React.SetStateAction<Question>>,
                            setQuestions: Dispatch<React.SetStateAction<Question[]>>,
                          },
): JSX.Element => {
  const [create] = useCreateQuestionMutation();
  const [error, setError] = useState();
  // const inputType = question.hasUniqueAnswer;

  const updateQuestion = (id: number, label: string) => {
    setQuestion({id: id, label: label})
  };


  const onSubmit = () => {
    // set QuestionState to QuizState
    setQuestions([...questions, question])
    setQuestion({id: ++question.id, label: 'New Question'})
  };

  return (
    <div key={question.id}>
      <h4>New Question</h4>
      <hr/>
      <form onSubmit={onSubmit}>
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

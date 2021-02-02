import { useForm } from 'react-hook-form';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCreateQuestionMutation } from '../utils/createQuestionMutation';
import CreateAnswer, { Answer } from './CreateAnswer';
import { QuestionType } from './CreateQuiz';
import { initialQuestion, Question } from './QuizEditor';

export type QuizInput = {
  title: string,
  subtitle?: string,
  content?: string,
}

// const CreateQuestion = ({question, key}: {question: QuestionType, key: number}): JSX.Element => {
const CreateQuestion = ({ question, questions, setQuestion, setQuestions, answer, setAnswer }:
                          {
                            question: Question,
                            questions: Question[],
                            answer: Answer,
                            setQuestion: Dispatch<React.SetStateAction<Question>>,
                            setQuestions: Dispatch<React.SetStateAction<Question[]>>,
                            setAnswer: Dispatch<React.SetStateAction<Answer>>
                          },
): JSX.Element => {
  const [create] = useCreateQuestionMutation();
  const [error, setError] = useState();
  // const inputType = question.hasUniqueAnswer;

  const updateQuestionLabel = (id: number, label: string, answers: Answer[]) => {
    setQuestion({id: id, label: label, answers: answers})
  };

  const onSubmit = () => {
    // set QuestionState to QuizState
    setQuestions([...questions, question])
    let id = question.id
    setQuestion({id: ++id, label: 'New Question', answers: []})
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
            onChange={e => updateQuestionLabel(question.id, e.target.value, question.answers)}
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

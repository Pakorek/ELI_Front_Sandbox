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


const CreateQuestion = ({ question, setQuestion, questions, setQuestions, quiz, setQuiz, answer, setAnswer, dispatch, state}:
                          {
                            question: Question,
                            setQuestion: Dispatch<React.SetStateAction<Question>>,

                            questions: Question[],
                            setQuestions: Dispatch<React.SetStateAction<Question[]>>,

                            quiz: QuizState,
                            setQuiz: Dispatch<SetStateAction<QuizState>>,

                            answer: Answer,
                            setAnswer: Dispatch<React.SetStateAction<Answer>>,

                            dispatch:  React.Dispatch<Action>,
                            state: QuizState,
                          },
): JSX.Element => {
  const [create] = useCreateQuestionMutation();
  const [error, setError] = useState();
  // const inputType = question.hasUniqueAnswer;

  const updateQuestionLabel = (id: number, label: string, answers: Answer[]) => {
    setQuestion({id: id, label: label, answers: answers})
  };

  const onSubmit = () => {
    initialQuestion.id = initialQuestion.id++
    setQuiz({
      title: state.title,
      subtitle: state.subtitle,
      questions: [...questions, initialQuestion]})
  };

   const updateLabel = (value: string) => {
    dispatch({ type: "UPDATE_QUESTION", id: question.id, label: value })
  }

  const stateQuestion = state.questions.find( q => q.id === question.id)


  return (
    <div>
      <h4>New Question</h4>
      <hr/>
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

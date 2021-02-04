import { useForm } from 'react-hook-form';
import { Dispatch, useReducer, useState } from 'react';
import { useCreateCourseMutation } from '../utils/createCourseMutation';
import CreateQuestion from './CreateQuestion';
import useCreateQuiz from '../hooks/useCreateQuiz';
import quizReducer, { Action } from '../reducers/quizReducer';

const React = require('react');

export type QuizInput = {
  title: string,
  subtitle?: string,
  content?: QuestionState,
}

export type QuestionType = {
  label: string;
  hasUniqueAnswer: boolean;
}

export type QuestionState = {
  questions: QuestionType[]
}

const initialQuestionState: QuestionState = {
  questions: [],
};

const CreateQuiz = ({ dispatch }: { dispatch: Dispatch<Action> }): JSX.Element => {
  const [create] = useCreateCourseMutation();
  // const { handleSubmit, register } = useForm();

  const [quiz, setQuiz] = useState();
  // const [title, setTitle] = useState('Quiz Title');
  // const [subtitle, setSubtitle] = useState('Subtitle');

  // const [questionEditor, setQuestionEditor] = useState(initialQuestionState);
  const [questionModel, setQuestionModel] = useState(initialQuestionState);

  const newQuestion = (questionModel: QuestionState) => {
    const question: QuestionType = { label: 'Label', hasUniqueAnswer: false };
    /*
        setQuestionEditor({
          questions: [...questionEditor.questions, question]
      })
    */
    setQuestionModel({
      questions: [...questionModel.questions, question],
    });
  };

  const { inputTitle, inputSubtitle, formSubmission, error } = useCreateQuiz();
  // const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <div style={{ width: '50%', padding: '24px', border: '1px solid black' }}>
      <pre>Quiz Editor</pre>
      <p>{inputTitle.value}</p>
      <p>{inputSubtitle.value}</p>
      {error !== '' && <pre>{error}</pre>}

      <form onSubmit={formSubmission} noValidate>
        <div>
          <input
            name="title"
            // ref={register()}
            // placeholder="Title"
            value={inputTitle.value}
            onChange={inputTitle.onChange}
            // onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            name="subtitle"
            // ref={register()}
            // placeholder="Subtitle"
            value={inputSubtitle.value}
            onChange={inputSubtitle.onChange}
            // onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => newQuestion(questionModel)}
        >
          New Question
        </button>

        {/*  button + -> add CreateQuestion -> setQuestionEditor(newCreateQuestion)  */}
        {/*{ questionEditor.questions.map((question, key) => <CreateQuestion {...question} {...key}/>)  }*/}
{/*
        {questionModel.questions.map((question, key) =>
          <CreateQuestion
            question={question}
            key={key}
            num={++key}
          />)
        }
*/}
        {/*{ questionModel.questions.map((question, key) => console.log('key map', key))  }*/}

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

export default CreateQuiz;

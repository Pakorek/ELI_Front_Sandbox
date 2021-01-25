import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useCreateCourseMutation } from '../utils/createCourseMutation';
import CreateQuestion from './CreateQuestion';
import useCreateQuiz from '../hooks/useCreateQuiz';

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

const CreateQuiz = (): JSX.Element => {
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

/*
  const onSubmit = async (values: QuizInput) => {
    try {
      // @ts-ignore
      const quiz = await create(values);
      setQuiz(quiz);
    } catch (e) {
      console.log(e);
      setError(e);
      // setError(e.graphQLErrors[0].extensions.exception.validationErrors ?? e.graphQLErrors[0].message);
    }

  };
*/

  const { inputTitle, inputSubtitle, inputQuestions, formSubmission, error } = useCreateQuiz()

  return (
    <div style={{ width: '50%', padding: '24px', border: '1px solid black' }}>
      <pre>Quiz Editor</pre>
      {error !== "" && <pre>{error}</pre>}

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
        {questionModel.questions.map((question, key) =>
          <CreateQuestion
            question={question}
            key={key}
            num={++key}
          />)
        }
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

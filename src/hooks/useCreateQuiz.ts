import { useState, useContext, ChangeEvent, FormEvent } from "react";
import QuizContext from '../context/QuizContext';
import { initialQuestion, Question } from '../components/QuizEditor';

type CreateQuizReturn = {
  inputTitle: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  inputSubtitle: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  inputQuestions: {
    value: Question[];
  };
  formSubmission: (e: FormEvent) => Promise<void>;
  // loading: boolean;
  // delayed: boolean;
  error: string;
};

function useCreateQuiz(): CreateQuizReturn {
  const dispatch = useContext(QuizContext);
  const [title, setTitle] = useState('Quiz Title');
  const [subtitle, setSubtitle] = useState('Subtitle');
  const [questions, setQuestions] = useState<Question[]>([initialQuestion]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [delayed, setDelayed] = useDelay(500);

  const formSubmission = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // setDelayed(true);
      setLoading(true);
      // mutation create Quiz
//      setLoading(false);
/*
      if (result.data.success) {
        setError("");
        if (dispatch) {
          dispatch({
            type: "WILDER_ADDED",
            newWilder: result.data.result,
          });
        }
      }
*/
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  };

  return {
    inputTitle: {
      value: title,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
      // onChange: (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    },
    inputSubtitle: {
      value: subtitle,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setSubtitle(e.target.value),
    },
    inputQuestions: {
      value: questions,
    },
    formSubmission,
    // loading,
    // delayed,
    error,
  };
}

export default useCreateQuiz;

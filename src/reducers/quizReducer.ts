import { QuestionType } from '../components/CreateQuiz';
import { AnswerInput } from '../components/CreateAnswer';

export type QuizState = {
  title: string;
  subtitle?: string;
  questions?: QuestionType[];
};

export type Action =
  | {
  type: "UPDATE_TITLE";
  newTitle: string;
}
  | {
  type: "ADD_QUESTION";
  newQuestion: QuestionType;
}
  | {
  type: "ADD_ANSWER";
  questionId: number;
  newAnswer: AnswerInput;
}
  | {
  type: "UPDATE_QUESTION";
  // questionId: number;
  question: QuestionType;
}
  | {
  type: "UPDATE_ANSWER";
  questionId: number;
  answer: AnswerInput;
};

const quizReducer = (state: QuizState, action: Action): QuizState => {
  switch (action.type) {
    case "UPDATE_TITLE":
      console.log("UpdateTitle in reducer")
      return { ...state, title: action.newTitle };
    default:
      return state;
  }
};

export default quizReducer;

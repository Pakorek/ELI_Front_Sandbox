import { QuestionType } from '../components/CreateQuiz';
import { Answer } from '../components/CreateAnswer';
import { Question, QuizState } from '../components/QuizEditor';

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
  newAnswer: Answer;
}
  | {
  type: "UPDATE_QUESTION";
  id: number;
  label: string;
}
  | {
  type: "UPDATE_ANSWER";
  questionId: number;
  answer: Answer;
};

const quizReducer = (state: QuizState, action: Action): QuizState => {
  let nextState
  switch (action.type) {
    case 'UPDATE_QUESTION':
      const questions = state.questions?.slice()
      const quest = questions.find( q => q.id === action.id)

      if (quest) {
        quest.label = action.label
        nextState = {
          title: state.title,
          subtitle: state.subtitle,
          questions
        }
      }
      return nextState || state

    case "UPDATE_ANSWER":
    default:
      return state;
  }
};

export default quizReducer;

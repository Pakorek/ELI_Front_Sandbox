import { QuestionType } from '../components/CreateQuiz';
import { Answer } from '../components/CreateAnswer';
import { initialQuestion, Question, QuizState } from '../components/QuizEditor';

export type Action =
  | {
  type: "UPDATE_TITLE";
  newTitle: string;
}
  | {
  type: "UPDATE_SUBTITLE";
  newSubtitle: string;
}
  | {
  type: "ADD_QUESTION";
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

    case "UPDATE_TITLE":
      nextState = {
        title: action.newTitle,
        subtitle: state.subtitle,
        questions: state.questions
      }
      return nextState || state

    case "UPDATE_SUBTITLE":
      nextState = {
        title: state.title,
        subtitle: action.newSubtitle,
        questions: state.questions
      }
      return nextState || state

    case "ADD_QUESTION":
      let lastQuestionID = state.questions[state.questions.length - 1].id
      nextState = {
        title: state.title,
        subtitle: state.subtitle,
        questions: [...state.questions, {
          id: ++lastQuestionID,
          label: 'New Question',
          answers: [{ id: 1, label: 'New Answer...' }],
        }]
      }
      return nextState || state

    default:
      return state;
  }
};

export default quizReducer;

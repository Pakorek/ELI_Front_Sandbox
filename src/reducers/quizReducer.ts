import { QuestionType } from '../components/CreateQuiz';
import { Answer } from '../components/CreateAnswer';
import { Question, QuizState } from '../components/QuizEditor';

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
  id: number;
  label: string;
  questionID: number
};

const quizReducer = (state: QuizState, action: Action): QuizState => {
  let nextState
  switch (action.type) {
    case "UPDATE_TITLE":
      nextState = {
        ...state,
        title: action.newTitle
      }
      return nextState || state

    case "UPDATE_SUBTITLE":
      nextState = {
        ...state,
        subtitle: action.newSubtitle,
      }
      return nextState || state

    case "ADD_QUESTION":
      let lastQuestionID = state.questions[state.questions.length - 1].id
      nextState = {
        ...state,
        questions: [...state.questions, {
          id: ++lastQuestionID,
          label: 'New Question',
          answers: [],
        }]
      }
      return nextState || state

    case 'UPDATE_QUESTION':
      const questions = state.questions?.slice()
      const quest = questions.find( q => q.id === action.id)

      if (quest) {
        quest.label = action.label
        nextState = {
          ...state,
          questions
        }
      }
      return nextState || state

    case 'UPDATE_ANSWER':
      const quests = state.questions.slice()
      const question = quests.find(q => q.id = action.questionID)
      const answer = question?.answers.find( a => a.id = action.id)
      if (answer) answer.label = action.label
      nextState = {
        ...state,
        questions: quests
      }
      return nextState || state



    default:
      return state;
  }
};

export default quizReducer;

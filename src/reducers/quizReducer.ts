import { Answer } from '../components/CreateAnswer';
import { QuizState } from '../components/QuizEditor';

export type Action =
  | {
  type: 'UPDATE_TITLE';
  newTitle: string;
}
  | {
  type: 'UPDATE_SUBTITLE';
  newSubtitle: string;
}
  | {
  type: 'ADD_QUESTION';
}
  | {
  type: 'ADD_ANSWER';
  questionId: number;
  questionLen: number;
}
  | {
  type: 'UPDATE_QUESTION';
  id: number;
  label: string;
}
  | {
  type: 'UPDATE_ANSWER';
  id: number;
  label: string;
  questionID: number
}
  | {
  type: 'REMOVE_QUESTION';
  id: number;
}
  | {
  type: 'REMOVE_ANSWER';
  id: number;
  questionID: number
};

const quizReducer = (state: QuizState, action: Action): QuizState => {
  let nextState;
  let questions = state.questions?.slice();

  switch (action.type) {
    case 'UPDATE_TITLE':
      nextState = {
        ...state,
        title: action.newTitle,
      };
      return nextState || state;

    case 'UPDATE_SUBTITLE':
      nextState = {
        ...state,
        subtitle: action.newSubtitle,
      };
      return nextState || state;

    case 'ADD_QUESTION':
      let lastQuestionID = state.questions[state.questions.length - 1].id;
      nextState = {
        ...state,
        questions: [...state.questions, {
          id: ++lastQuestionID,
          label: 'New Question',
          answers: [{id: 1, label: 'New Answer...', questionID: ++lastQuestionID}],
        }],
      };
      return nextState || state;

    case 'UPDATE_QUESTION':
      const quest = questions.find(q => q.id === action.id);

      if (quest) {
        quest.label = action.label;
        nextState = {
          ...state,
          questions,
        };
      }
      return nextState || state;

    case 'REMOVE_QUESTION':
      questions = questions.filter( q => q.id !== action.id)

      return { ...state, questions } || state;

    case 'ADD_ANSWER':
      let q = questions.find(q => q.id === action.questionId);
      if (q && q.answers.length === action.questionLen) {
        let lastAnswerID = q.answers[q.answers.length - 1].id
        q.answers = [...q.answers, {
            id: ++lastAnswerID,
            label: 'New Answer ...',
            questionID: action.questionId,
          }];

        nextState = {
          title: state.title,
          subtitle: state.subtitle,
          questions: questions,
        };
      }

      return nextState || state;

    case 'UPDATE_ANSWER':
      const question = questions.find(q => q.id === action.questionID);
      const answer = question?.answers.find(a => a.id === action.id);
      if (answer) answer.label = action.label;
      nextState = {
        ...state,
        questions
      };
      return nextState || state;

    case 'REMOVE_ANSWER':
      let questAnswers = questions.find(q => q.id === action.questionID);
      if (questAnswers) questAnswers.answers = questAnswers.answers.filter( a => a.id !== action.id)
      nextState = {
        ...state,
        questions
      }

      return nextState || state;



    default:
      return state;
  }
};

export default quizReducer;

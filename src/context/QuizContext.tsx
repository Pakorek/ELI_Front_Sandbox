import { createContext, Dispatch } from "react";
import { Action } from "../reducers/quizReducer";

const QuizContext = createContext<Dispatch<Action> | null>(null);

export default QuizContext;

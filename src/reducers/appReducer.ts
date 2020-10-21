import { WilderProps } from "../Wilder";

type AppState = {
  showAddForm: boolean;
  successMessage: string;
  wilders: WilderProps[];
};

export type Action =
  | {
      type: "TOGGLE_SHOW_ADD_FORM";
    }
  | {
      type: "WILDER_ADDED";
      newWilder: WilderProps;
    }
  | {
      type: "WILDERS_FETCH_SUCCESS";
      wilders: WilderProps[];
    };

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "TOGGLE_SHOW_ADD_FORM":
      return { ...state, showAddForm: !state.showAddForm };
    case "WILDER_ADDED":
      return {
        ...state,
        showAddForm: false,
        successMessage: `The wilder ${action.newWilder.name} has been successfully added`,
        wilders: [{ ...action.newWilder, justAdded: true }, ...state.wilders],
      };
    case "WILDERS_FETCH_SUCCESS":
      return { ...state, wilders: action.wilders };
    default:
      return state;
  }
};

export default appReducer;

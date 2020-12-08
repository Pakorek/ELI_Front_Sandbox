import { useEffect, Dispatch } from "react";
import axios from "axios";
import { Action } from "../reducers/appReducer";

const useFetchWilders = (dispatch: Dispatch<Action>): void => {
  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const result = await axios("http://127.0.0.1:4300/graphql");
        dispatch({
          type: "WILDERS_FETCH_SUCCESS",
          wilders: result.data.result,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    fetchWilders();
  }, [dispatch]);
};

export default useFetchWilders;

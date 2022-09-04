import { useEffect, useReducer } from "react";

const actions = {
  FETCH_IN_PROGRESS: "FETCH_IN_PROGRESS",
  FETCH_SUCESS: "FETCH_SUCESS",
  FETCH_ERROR: "FETCH_ERROR",
};

const initialState = {
  data: null,
  loading: false,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_IN_PROGRESS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actions.FETCH_SUCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };

    case actions.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      throw new Error(`unknow action type: ${action.type}`);
  }
};

export const useFetch = (resource) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: actions.FETCH_IN_PROGRESS });
        const response = await fetch(resource);

        const data = await response.json();

        dispatch({
          type: actions.FETCH_SUCESS,
          payload: {
            data,
          },
        });
      } catch (error) {
        dispatch({ type: actions.FETCH_ERROR });
      }
    };

    fetchData();
  }, [resource]);

  return state;
};

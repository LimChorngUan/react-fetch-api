import { useReducer } from "react";

const actions = {
  MUTATE_IN_PROGRESS: "MUTATE_IN_PROGRESS",
  MUTATE_SUCESS: "MUTATE_SUCESS",
  MUTATE_ERROR: "MUTATE_ERROR",
};

const initialState = {
  data: null,
  loading: false,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.MUTATE_IN_PROGRESS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actions.MUTATE_SUCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };

    case actions.MUTATE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      throw new Error(`unknow action type: ${action.type}`);
  }
};

export const useMutate = (resource, options) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const mutateData = async () => {
    dispatch({ type: actions.MUTATE_IN_PROGRESS });
    const response = await fetch(resource, { ...options });

    if (response.status === 200) {
      const data = await response.json();
      dispatch({
        type: actions.MUTATE_SUCESS,
        payload: {
          data,
        },
      });
    } else {
      dispatch({ type: actions.MUTATE_ERROR });
    }
  };

  return [mutateData, state];
};

import { AppThunk } from "Redux/redux-store";
import { authUserTC } from "Redux/auth-reducer";
import { handleError } from "common/utils/handle-error";

const initialState = {
  initialized: false,
};

export const AppReducer = (
  state: initialStateType = initialState,
  action: ActionsType,
): initialStateType => {
  switch (action.type) {
    case "APP/SET_INITIALIZE":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
//..actions
const initializeAC = () => {
  return { type: "APP/SET_INITIALIZE" as const };
};

//..thunks
export const initializeTC = (): AppThunk => async (dispatch) => {
  try {
    await dispatch(authUserTC());
    dispatch(initializeAC());
  } catch (e) {
    handleError(e);
  }
};

//...type

type initialStateType = {
  initialized: boolean;
};
export type ActionsType = ReturnType<typeof initializeAC>;

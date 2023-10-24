import { AppThunk } from "components/Redux/redux-store";
import { authUserTC } from "components/Redux/auth-reducer";
import { handleError } from "components/common/utils/handle-error";

const initialState = {
  initialized: false,
};

export const AppReducer = (
  state: initialStateType = initialState,
  action: ActionsType,
): initialStateType => {
  switch (action.type) {
    case "SET_INITIALIZE":
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
  return { type: "SET_INITIALIZE" as const };
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

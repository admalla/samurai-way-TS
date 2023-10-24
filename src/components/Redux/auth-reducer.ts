import { AppDispatch, AppThunk } from "./redux-store";
import { AuthAPI } from "API/api";
import { handleError } from "../common/utils/handle-error";

const GET_AUTH = "GET_AUTH";
const LOG_OUT = "LOG_OUT";

export type StateAuthType = {
  id: number | null;
  email: string;
  login: string;
  isAuth: boolean;
};
export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: boolean;
};
export type AuthActionsType =
  | ReturnType<typeof getAuthUserAC>
  | ReturnType<typeof logOutAC>;

const initialState: StateAuthType = {
  id: null,
  email: "",
  login: "",
  isAuth: false,
};
export const AuthReducer = (
  state: StateAuthType = initialState,
  action: AuthActionsType,
): StateAuthType => {
  switch (action.type) {
    case "GET_AUTH":
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};

//....actions
export const getAuthUserAC = (data: {
  id: number;
  email: string;
  login: string;
}) =>
  ({
    type: GET_AUTH,
    data,
  }) as const;

const logOutAC = () =>
  ({
    type: LOG_OUT,
  }) as const;

//....thunks
export const authUserTC = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await AuthAPI.getAuthUser();
      if (res.data.resultCode === 0) {
        dispatch(getAuthUserAC(res.data.data));
      } else {
        console.log(res.data.messages[0]);
      }
    } catch (e) {
      handleError(e);
    }
  };
};

export const loginTC =
  (values: LoginDataType): AppThunk =>
  async (dispatch, getState) => {
    try {
      await AuthAPI.Login(values);
      dispatch(authUserTC());
    } catch (e) {
      console.log(handleError(e));
    }
  };
export const logOutTC = (): AppThunk => async (dispatch) => {
  try {
    await AuthAPI.LogOut();
    dispatch(logOutAC());
  } catch (e) {
    console.log(handleError(e));
  }
};

import { AppDispatch, AppThunk } from "Redux/redux-store";
import { AuthAPI, SecurityAPI } from "API/api";
import { handleError } from "common/utils/handle-error";

const GET_AUTH = "AUTH/GET_AUTH";
const LOG_OUT = "AUTH/LOG_OUT";
const GET_CAPTCHA = "GET_CAPTCHA";

export type StateAuthType = {
  id: number | null;
  email: string;
  login: string;
  isAuth: boolean;
  captcha: string;
};
export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
export type AuthActionsType =
  | ReturnType<typeof getAuthUserAC>
  | ReturnType<typeof logOutAC>
  | ReturnType<typeof getCaptchaAC>;

const initialState: StateAuthType = {
  id: null,
  email: "",
  login: "",
  isAuth: false,
  captcha: "",
};
export const AuthReducer = (
  state: StateAuthType = initialState,
  action: AuthActionsType,
): StateAuthType => {
  switch (action.type) {
    case "AUTH/GET_AUTH":
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    case "AUTH/LOG_OUT":
      return {
        ...state,
        isAuth: false,
      };
    case GET_CAPTCHA:
      return {
        ...state,
        captcha: action.captcha,
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

const getCaptchaAC = (captcha: string) =>
  ({
    type: GET_CAPTCHA,
    captcha,
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
      const res = await AuthAPI.Login(values);
      if (res.data.resultCode === 0) {
        await dispatch(authUserTC());
      }
      if (res.data.resultCode === 10) {
        dispatch(getCaptchaTC());
      }
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
export const getCaptchaTC = (): AppThunk => async (dispatch) => {
  try {
    const res = await SecurityAPI.getCaptcha();
    dispatch(getCaptchaAC(res.data.url));
  } catch (e) {
    console.log(handleError(e));
  }
};

import {AppThunk} from "./redux-store";
import {usersAPI} from "../../API/api";
import {handleError} from "../common/utils/handle-error";

const GET_AUTH = "GET_AUTH"
export type StateAuthType = {
    id: number | null
    email: string
    login: string
    isAuth: boolean
}
export type AuthActionsType = ReturnType<typeof getAuthUserAC>
const initialState: StateAuthType = {
    id: null,
    email: '',
    login: '',
    isAuth: false
}
export const AuthReducer = (state: StateAuthType = initialState, action: AuthActionsType): StateAuthType => {
    switch (action.type) {
        case "GET_AUTH":
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

//....actions
export const getAuthUserAC = (data: { id: number, email: string, login: string }) => ({
    type: GET_AUTH,
    data
} as const)

//....thunks
export const authUserTC = (): AppThunk => async dispatch => {
    try {
        const res = await usersAPI.getAuthUser()
        if(res.data.resultCode === 0) {
            dispatch(getAuthUserAC(res.data.data))
        }else {
            console.log(res.data.messages[0])
        }
    }catch (e) {
        handleError(e)
    }
}
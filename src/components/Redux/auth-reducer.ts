const GET_AUTH = "GET_AUTH"
export type StateAuthType = {
    id: number | null
    email: string
    login: string
    isAuth: boolean
}
type ActionsType = ReturnType<typeof getAuthUserAC>
const initialState: StateAuthType = {
    id: null,
    email: '',
    login: '',
    isAuth: false
}
export const AuthReducer = (state: StateAuthType = initialState, action: ActionsType): StateAuthType => {
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

export const getAuthUserAC = (data: {id: number, email: string, login: string}) => ({
    type: GET_AUTH,
    data
} as const)
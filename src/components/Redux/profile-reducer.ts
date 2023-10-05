import {AppThunk} from "./redux-store";
import {ProfileAPI} from "../../API/api";
import {handleError} from "../common/utils/handle-error";

const ADD_POST = "ADD-POST";
const ADD_NEW_TEXT = "ADD-NEW-TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"

export type PostType = {
    id: number
    message: string
    like: number
}
type UserProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: null
    fullName: string
    contacts: UserProfileContactsType
    photos: { small: string, large: string }


}
export type ProfilePageType = {
    posts: PostType[]
    valueTextarea: string
    profile: UserProfileType | null
    status: string
}

export type ProfileActionsType =
    | ReturnType<typeof AddPostAC>
    | ReturnType<typeof AddNewTextAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof getStatusAC>

const initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'hello world', like: 15},
        {id: 2, message: 'It is my first post', like: 20}
    ],
    valueTextarea: '',
    profile: null,
    status: ''
}

export const ProfileReducer = (state: ProfilePageType = initialState, action: ProfileActionsType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: state.posts.length + 1,
                message: action.message,
                like: 0
            }
            state.posts.push(newPost)
            state.valueTextarea = ''
            return state
        case ADD_NEW_TEXT: {
            state.valueTextarea = action.newText
            return state
        }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case "SET-STATUS":
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

//....actions
export const AddPostAC = (message: string) => ({
    type: ADD_POST,
    message
} as const)
export const AddNewTextAC = (newText: string) => ({
    type: ADD_NEW_TEXT,
    newText
} as const)
export const setUserProfileAC = (profile: UserProfileType) => ({
    type: SET_USER_PROFILE,
    profile
} as const)
const getStatusAC = (status: string) => ({type: "SET-STATUS" as const, status})

//....thunks
export const userProfileTC = (id: number): AppThunk => async dispatch => {
    try {
        const res = await ProfileAPI.getProfile(id)
        dispatch(setUserProfileAC(res.data))
    } catch (e) {
        console.log(handleError(e))
    }
}
export const getStatusTC = (userId: number): AppThunk => async dispatch => {
    try {
        const res = await ProfileAPI.getStatus(userId)
        dispatch(getStatusAC(res.data))
    } catch (e) {
        console.log(handleError(e))
    }
}
export const updateStatusTC = (status: string, userId: number):  AppThunk => async dispatch => {
    try {
        const res = await ProfileAPI.updateStatus(status)
        dispatch(getStatusTC(userId))
    } catch (e) {
        console.log(handleError(e))
    }
}
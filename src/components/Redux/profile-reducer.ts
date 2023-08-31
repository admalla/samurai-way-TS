import {ActionsType} from "./State";

const ADD_POST = "ADD-POST";
const ADD_NEW_TEXT = "ADD-NEW-TEXT"

export type AddPostAT = {
    type: typeof ADD_POST
    message: string
}
export type AddNewTextAT = {
    type: typeof ADD_NEW_TEXT
    newText: string
}


export type PostType = {
    id: number
    message: string
    like: number
}
export type ProfilePageType = {
    posts: PostType[]
    valueTextarea: string
}

const initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'hello world', like: 15},
        {id: 2, message: 'It is my first post', like: 20}
    ],
    valueTextarea: ''
}

export const ProfileReducer = (state: ProfilePageType = initialState, action: ActionsType): ProfilePageType => {
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
        case ADD_NEW_TEXT:
            state.valueTextarea = action.newText
            return state
        default:
            return state
    }
}

export const AddPostAC = (message: string): AddPostAT => ({
    type: ADD_POST,
    message
} as const)
export const AddNewTextAC = (newText: string): AddNewTextAT => ({
    type: ADD_NEW_TEXT,
    newText
} as const)
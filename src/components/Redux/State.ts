const ADD_POST = "ADD-POST";
const ADD_NEW_TEXT = "ADD-NEW-TEXT"

let rerenderAllTree = () => {
    console.log("state changed")
}

export type PostType = {
    id: number
    message: string
    like: number
}
type DialogType = {
    id: number
    name: string
}
type MessageObjectType = {
    id: number
    message: string
}

export type profilePageType = {
    posts: PostType[]
    valueTextarea: string
}
export type dialogsPageType = {
    dialogs: DialogType[]
    messages: MessageObjectType[]
}

export type StateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
}

type AddPostAT = {
    type: "ADD-POST"
    message: string
}
type AddNewTextAT = {
    type: "ADD-NEW-TEXT"
    newText: string
}
export type ActionsType = AddPostAT | AddNewTextAT

export type StoreType = {
    _State: StateType
    _callSubscriber: () => void
    getState: () => StateType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsType) => void

}

export const store: StoreType = {
    _State: {
        profilePage: {
            posts: [
                {id: 1, message: 'hello world', like: 15},
                {id: 2, message: 'It is my first post', like: 20}
            ],
            valueTextarea: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Adam'},
                {id: 2, name: 'Rustam'},
                {id: 3, name: 'Aslan'}
            ],
            messages: [
                {id: 1, message: 'hi world'},
                {id: 2, message: 'do you speak english'},
                {id: 3, message: 'I am from Grozny'}
            ]
        }

    },
    _callSubscriber() {
        console.log("state changed")
    },

    getState() {
        return this._State
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            const newPost: PostType = {
                id: this._State.profilePage.posts.length + 1,
                message: action.message,
                like: 0
            }
            this._State.profilePage.posts.push(newPost)
            this._State.profilePage.valueTextarea = ''
            this._callSubscriber()
        } else if (action.type === ADD_NEW_TEXT) {
            this._State.profilePage.valueTextarea = action.newText
            this._callSubscriber()
        }
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
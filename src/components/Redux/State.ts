import {AddNewTextAT, AddPostAT, ProfilePageType, ProfileReducer} from "./profile-reducer";
import {DialogsPageType, DialogsReducer, NewMessageBodyAT, SendMessageAT} from "./dialogs-reducer";
import {SidebarReducer} from "./sidebar-reducer";

let rerenderAllTree = () => {
    console.log("state changed")
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: {}
}

export type ActionsType = AddPostAT | AddNewTextAT | NewMessageBodyAT | SendMessageAT

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
            ],
            newMessageBody: ''
        },
        sidebar: {}

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
    dispatch(action: ActionsType) {
        this._State.profilePage = ProfileReducer(  this._State.profilePage, action)
        this._State.dialogsPage = DialogsReducer(this._State.dialogsPage, action)
        this._State.sidebar = SidebarReducer(this._State.sidebar, action)
        this._callSubscriber()
    }
}
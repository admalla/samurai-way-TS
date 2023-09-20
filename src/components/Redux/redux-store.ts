import {combineReducers, createStore} from "redux";
import {ProfileReducer} from "./profile-reducer";
import {DialogsReducer} from "./dialogs-reducer";
import {SidebarReducer} from "./sidebar-reducer";
import {UsersReducer} from "./users-reducer";
import {AuthReducer} from "./auth-reducer";

export type RootStateType = ReturnType<typeof RootReducer>

const RootReducer = combineReducers({
    profile: ProfileReducer,
    dialogs: DialogsReducer,
    sidebar: SidebarReducer,
    users: UsersReducer,
    auth: AuthReducer
})

export const store = createStore(RootReducer)
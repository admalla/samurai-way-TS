import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import { ProfileActionsType, ProfileReducer } from "./profile-reducer";
import { DialogsActionsType, DialogsReducer } from "./dialogs-reducer";
import { SidebarActionsType, SidebarReducer } from "./sidebar-reducer";
import { UsersActionType, UsersReducer } from "./users-reducer";
import { AuthActionsType, AuthReducer } from "./auth-reducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppReducer } from "components/Redux/app-reducer";

const rootReducer = combineReducers({
  profile: ProfileReducer,
  dialogs: DialogsReducer,
  sidebar: SidebarReducer,
  users: UsersReducer,
  auth: AuthReducer,
  app: AppReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export type AppActionsType =
  | UsersActionType
  | AuthActionsType
  | DialogsActionsType
  | ProfileActionsType
  | SidebarActionsType;

export type AppRootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  AppActionsType
>;

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

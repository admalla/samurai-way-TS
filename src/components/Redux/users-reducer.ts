import {resolveTxt} from "dns";
import {Dispatch} from "redux";
import {usersAPI} from "../../API/api";
import {AppThunk} from "./redux-store";
import {handleError} from "../common/utils/handle-error";
import {isAxiosError} from "axios/index";

const GET_USERS = "GET_USERS"
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const GET_TOTAL_COUNT = "GET_TOTAL_COUNT"
const CURRENT_PAGE = "CURRENT_PAGE"
const PAGE_SIZE = "PAGE_SIZE"
const IS_FETCHING = "IS_FETCHING"
const IS_DISABLED_BTN = "IS_DISABLED_BTN"

export type UserType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: { small: any, large: any }
    status: string
    followed: boolean
}

export type UserStateType = {
    items: Array<UserType>
    pageSize: number
    currentPage: number
    totalCount: number
    error: string
    isFetching: boolean
    isDisabledBtn: number[]
}

export type UsersActionType =
    | ReturnType<typeof getUsersAC>
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof getTotalCountUsersAC>
    | ReturnType<typeof getCurrentPageAC>
    | ReturnType<typeof getPageSizeAC>
    | ReturnType<typeof isLoadingAC>
    | ReturnType<typeof isDisabledBtnAC>

const initialState: UserStateType = {
    items: [],
    pageSize: 20,
    currentPage: 1,
    totalCount: 0,
    error: '',
    isFetching: false,
    isDisabledBtn: []
}

export const UsersReducer = (state: UserStateType = initialState, action: UsersActionType): UserStateType => {
    switch (action.type) {
        case GET_USERS :
            return {
                ...state,
                items: action.users
            }
        case GET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.count
            }
        case CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case PAGE_SIZE:
            return {
                ...state,
                pageSize: action.PageSize
            }
        case FOLLOW :
            return {
                ...state,
                items: state.items.map(u => u.id == action.userId ? {...u, followed: action.isFollowed} : u)
            }
        case UNFOLLOW :
            return {
                ...state,
                items: state.items.map(u => u.id == action.userId ? {...u, followed: action.isFollowed} : u)
            }
        case IS_FETCHING :
            return {
                ...state,
                isFetching: action.isLoad
            }
        case IS_DISABLED_BTN:
            return {
                ...state,
                isDisabledBtn: action.isLoad
                    ? [...state.isDisabledBtn, action.userId]
                    : state.isDisabledBtn.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

//.....actions
export const getUsersAC = (users: Array<UserType>) => ({
    type: GET_USERS,
    users
} as const)
export const getTotalCountUsersAC = (count: number) => ({
    type: GET_TOTAL_COUNT,
    count
} as const)
export const getCurrentPageAC = (currentPage: number) => {
    return {
        type: CURRENT_PAGE,
        currentPage
    } as const
}
export const getPageSizeAC = (PageSize: number) => {
    return {
        type: PAGE_SIZE,
        PageSize
    } as const
}
export const followAC = (userId: number, isFollowed: boolean) => ({
    type: FOLLOW,
    userId,
    isFollowed
} as const)
export const unfollowAC = (userId: number, isFollowed: boolean) => ({
    type: UNFOLLOW,
    userId,
    isFollowed
} as const)
export const isLoadingAC = (isLoad: boolean) => ({
    type: IS_FETCHING,
    isLoad
} as const)
export const isDisabledBtnAC = (isLoad: boolean, userId: number) => ({
    type: IS_DISABLED_BTN,
    isLoad,
    userId
} as const)

//....thunks
export const getUsersTC = (pageSize: number, currentPage: number): AppThunk => async dispatch => {
    try {
        dispatch(isLoadingAC(true))
        const res = await usersAPI.getUsers(pageSize, currentPage)
        dispatch(getUsersAC(res.data.items))
        dispatch(getTotalCountUsersAC(res.data.totalCount))
        dispatch(isLoadingAC(false))
    } catch (e) {
        handleError(e)
    }
}
export const followTC = (userId: number): AppThunk => async dispatch => {
    try {
        dispatch(isDisabledBtnAC(true, userId))
        await usersAPI.getFollow(userId)
        const res = await usersAPI.isFollowed(userId)
        dispatch(followAC(userId, res.data))
    } catch (err) {
        handleError(err)
    } finally {
        dispatch(isDisabledBtnAC(false, userId))
    }
}
export const unfollowTC = (userId: number): AppThunk => async dispatch => {
    try {
        dispatch(isDisabledBtnAC(true, userId))
        await usersAPI.getUnfollow(userId)
        const res = await usersAPI.isFollowed(userId)
            dispatch(unfollowAC(userId, res.data))
    } catch (err) {
       handleError(err)
    } finally {
        dispatch(isDisabledBtnAC(false, userId))
    }
}
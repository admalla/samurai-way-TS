const GET_USERS = "GET_USERS"
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"

export type UserType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: {small: any, large: any}
    status: string
    followed: boolean
}

type UserStateType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type getUsersAT = {
    type: typeof GET_USERS
    users: UserStateType
}
type followAT = {
    type: typeof FOLLOW
    userId: number
}
type unfollowAT = {
    type: typeof UNFOLLOW
    userId: number
}

type ActionType = getUsersAT | followAT | unfollowAT

const initialState: UserStateType = {
    items: [],
    totalCount: 0,
    error: ''
}

export const UsersReducer = (state: UserStateType = initialState, action: ActionType): UserStateType => {
    switch (action.type) {
        case GET_USERS :
            return state = action.users
        case FOLLOW :
            return {
                ...state,
                items: state.items.map(u => u.id == action.userId ? {...u, followed: !u.followed} : u)
            }
        case UNFOLLOW :
            return {
                ...state,
                items: state.items.map(u => u.id == action.userId ? {...u, followed: !u.followed} : u)
            }
        default:
            return state
    }
}

export const getUsersAC = (users: UserStateType): getUsersAT => ({
    type: GET_USERS,
    users
})

export const followAC = (userId: number) => ({
    type: FOLLOW,
    userId
})

export const unfollowAC = (userId: number): unfollowAT => ({
    type: UNFOLLOW,
    userId
})
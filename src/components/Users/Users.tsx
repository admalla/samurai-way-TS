import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    followAC,
    getCurrentPageAC, getPageSizeAC,
    getTotalCountUsersAC,
    getUsersAC, isLoadingAC,
    unfollowAC,
    UserType
} from "../Redux/users-reducer";
import {RootStateType} from "../Redux/redux-store";
import {User} from "./User/User";
import {usersAPI} from "../../API/api";
import type {PaginationProps} from 'antd';
import {Pagination} from 'antd';
import Preloader from "../common/Preloader/Preloader";


export const Users = React.memo(() => {

    const dispatch = useDispatch()
    const users = useSelector<RootStateType, UserType[]>(state => state.users.items)
    const totalCount = useSelector<RootStateType, number>(state => state.users.totalCount)
    const pageSize = useSelector<RootStateType, number>(state => state.users.pageSize)
    const currentPage = useSelector<RootStateType, number>(state => state.users.currentPage)
    const isFetching = useSelector<RootStateType, boolean>(state => state.users.isFetching)


    useEffect(() => {
        dispatch(isLoadingAC(true))
        try {
            usersAPI.getUsers(pageSize, currentPage).then((res) => {
                dispatch(getUsersAC(res.data.items))
                dispatch(getTotalCountUsersAC(res.data.totalCount))
                dispatch(isLoadingAC(false))
            })
        } catch (e) {
            throw new Error(`${e}`)
        }
    }, [pageSize, currentPage])

    const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
        dispatch(getPageSizeAC(pageSize))
        dispatch(getCurrentPageAC(pageNumber))
    };

    const onClickFollow = useCallback((userId: number) => {
        try {
            usersAPI.getFollow(userId).then(res => console.log(res))
            usersAPI.isFollowed(userId).then(res => {
                dispatch(followAC(userId, res.data))
            })
        } catch (err) {
            console.log(err)
        }
    }, [followAC])

    const onClickUnfollow = useCallback((userId: number) => {
        try {
            usersAPI.getUnfollow(userId).then(res => console.log(res))
            usersAPI.isFollowed(userId).then(res => {
                dispatch(unfollowAC(userId, res.data))
            })
        } catch (err) {
            console.log(err)
        }
    }, [unfollowAC])

    return <div>
        <Pagination showQuickJumper defaultCurrent={currentPage} total={totalCount} onChange={onChange}/>
        {isFetching && <Preloader/>}
        {users.map(user => {
            return <User
                userId={user.id}
                key={user.id}
                name={user.name}
                isFollowed={user.followed}
                photos={user.photos}
                status={user.status}
                onClickFollow={onClickFollow}
                onClickUnfollow={onClickUnfollow}
            />
        })
        }
    </div>
})
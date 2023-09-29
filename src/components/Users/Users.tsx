import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    followAC,
    getCurrentPageAC, getPageSizeAC,
    getTotalCountUsersAC,
    getUsersAC, isDisabledBtnAC, isLoadingAC,
    unfollowAC,
    UserType
} from "../Redux/users-reducer";
import {RootStateType} from "../Redux/redux-store";
import {User} from "./User/User";
import {usersAPI} from "../../API/api";
import type {PaginationProps} from 'antd';
import {Pagination} from 'antd';
import Preloader from "../common/Preloader/Preloader";
import {isAxiosError} from "axios";


export const Users = React.memo(() => {

    const dispatch = useDispatch()
    const users = useSelector<RootStateType, UserType[]>(state => state.users.items)
    const totalCount = useSelector<RootStateType, number>(state => state.users.totalCount)
    const pageSize = useSelector<RootStateType, number>(state => state.users.pageSize)
    const currentPage = useSelector<RootStateType, number>(state => state.users.currentPage)
    const isFetching = useSelector<RootStateType, boolean>(state => state.users.isFetching)
    const isDisabledBtn = useSelector<RootStateType, number[]>(state => state.users.isDisabledBtn)


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

    const onClickFollow = useCallback(async (userId: number) => {
        dispatch(isDisabledBtnAC(true, userId))
        try {
           await usersAPI.getFollow(userId)
           await usersAPI.isFollowed(userId).then(res => {
                dispatch(followAC(userId, res.data))
            })
        } catch (err) {
            let errorMessage = ''
            if(isAxiosError(err)) {
                errorMessage = err.response ? err.response.data.messages[0] : err.message
            } else {
                errorMessage = (err as Error).message
            }
            console.log(errorMessage)
        } finally {
            dispatch(isDisabledBtnAC(false, userId))
        }
    }, [followAC])

    const onClickUnfollow = useCallback(async (userId: number) => {
        dispatch(isDisabledBtnAC(true, userId))
        try {
            await usersAPI.getUnfollow(userId)
            await usersAPI.isFollowed(userId).then(res => {
                dispatch(unfollowAC(userId, res.data))
            })
        } catch (err) {
            let errorMessage = ''
            if(isAxiosError(err)) {
                errorMessage = err.response ? err.response.data.messages[0] : err.message
            } else {
                errorMessage = (err as Error).message
            }
            console.log(errorMessage)
        } finally {
            dispatch(isDisabledBtnAC(false, userId))
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
                isDisabledBtn={isDisabledBtn}
                photos={user.photos}
                status={user.status}
                onClickFollow={onClickFollow}
                onClickUnfollow={onClickUnfollow}
            />
        })
        }
    </div>
})
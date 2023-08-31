import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {followAC, getUsersAC, unfollowAC, UserType} from "../Redux/users-reducer";
import axios from "axios";
import s from './User/User.module.css'

import {RootStateType} from "../Redux/redux-store";
import {User} from "./User/User";
import {usersAPI} from "../../API/api";

export const Users = () => {

    const dispatch = useDispatch()
    const users = useSelector<RootStateType, UserType[]>(state => state.users.items)

    useEffect(() => {
        try {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then((res) => {
                dispatch(getUsersAC(res.data))
            })
        } catch (e) {
            console.log(e)
        }
        },[])

        const onClickFollow = (userId: number) => {
            dispatch(followAC(userId))
            // try {
            //     axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {}, {
            //         withCredentials: true,
            //         headers: {
            //             'API-KEY': '96621b9e-66da-4457-bd2c-0cd5eeae0e5a',
            //         }
            //     }).then((res) => {
            //         console.log(res)
            //     })
            // } catch (err) {
            //     console.log(err)
            // }
        }

        const onClickUnfollow = (userId: number) => {
        dispatch(unfollowAC(userId))
        }

        return <div>
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
    }
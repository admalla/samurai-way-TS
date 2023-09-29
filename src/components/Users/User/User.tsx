import avaUser from '../../../image/user-5.png'
import s from './User.module.css'
import {NavLink} from "react-router-dom";
import React, {memo} from "react";

type propsUserType = {
    userId: number
    name: string
    isFollowed: boolean
    isDisabledBtn: number[]
    photos: { small: any, large: any }
    status: string
    onClickFollow: (userId: number) => void
    onClickUnfollow: (userId: number) => void
}

export const User = React.memo((
    {
        userId,
        name,
        isFollowed,
        isDisabledBtn,
        photos,
        status,
        onClickFollow,
        onClickUnfollow
    }: propsUserType) => {

    return <div className={s.user}>
        <div>
            <div>
                <NavLink to={'/profile/' + userId}>
                    <img className={s.img} src={photos.small ? photos.small : avaUser}/>
                </NavLink>
            </div>
            {
                isFollowed
                    ? <button
                        disabled={isDisabledBtn.some(id => id === userId)}
                        onClick={() => onClickUnfollow(userId)}
                    >
                        unfollow
                    </button>
                    : <button
                        disabled={isDisabledBtn.some(id => id === userId)}
                        onClick={() => onClickFollow(userId)}
                    >
                        follow
                    </button>
            }

        </div>
        <div>
            <div>{name}</div>
            <span>{status}</span>
        </div>

    </div>
})
import avaUser from '../../../image/user-5.png'
import s from './User.module.css'
import {NavLink} from "react-router-dom";

type propsUserType = {
    userId: number
    name: string
    isFollowed: boolean
    photos: { small: any, large: any }
    status: string
    onClickFollow: (userId: number) => void
    onClickUnfollow: (userId: number) => void
}

export function User(
    {
        userId,
        name,
        isFollowed,
        photos,
        status,
        onClickFollow,
        onClickUnfollow
    }: propsUserType) {
    return <div className={s.user}>
        <div>
            <div>
                <NavLink to={'/profile/' + userId} >
                    <img className={s.img} src={photos.small ? photos.small : avaUser}/>
                </NavLink>
            </div>
            {
                isFollowed
                    ? <button onClick={() => onClickUnfollow(userId)}>unfollow</button>
                    : <button onClick={() => onClickFollow(userId)}>follow</button>
            }

        </div>
        <div>
            <div>{name}</div>
            <span>{status}</span>
        </div>

    </div>
}
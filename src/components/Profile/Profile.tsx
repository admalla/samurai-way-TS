import React, {ChangeEvent, FC, useEffect} from "react";
import fon from "../../image/tim-mossholder-C5lWDEm2fQA-unsplash.jpg";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AddNewTextAC, AddPostAC, userProfileTC} from "../Redux/profile-reducer";
import {useAppDispatch, useAppSelector} from "../Redux/redux-store";
import {useParams, Navigate} from "react-router-dom";



const Profile = () => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(state => state.profile)
    const isAuth = useAppSelector(state => state.auth.isAuth)


    let {id} = useParams<"id">()
    const myId = 21215
    const profileId = id ? +id : myId

    useEffect(() => {
        dispatch(userProfileTC(profileId))
    }, []);

    const addPostHandler = () => {
        dispatch(AddPostAC(profile.valueTextarea))
    }

    const onChangeTextValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(AddNewTextAC(e.currentTarget.value))
    }

    if(!isAuth) {
        return <Navigate to={'/login'} />
    }

    return (
        <main>
            <div>
                <img alt={'img'} className={s.fon} src={fon}/>
            </div>
            <ProfileInfo />
            <div>
                <textarea
                    value={profile.valueTextarea}
                    onChange={onChangeTextValue}
                />
            </div>
            <div>
                <button onClick={addPostHandler}>add post</button>
            </div>
            <MyPosts posts={profile.posts} />
        </main>
    )
}

export default Profile
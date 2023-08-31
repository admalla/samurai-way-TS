import React, {ChangeEvent, MutableRefObject, useRef} from "react";
import fon from "../../image/tim-mossholder-C5lWDEm2fQA-unsplash.jpg";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AddNewTextAC, AddPostAC, ProfilePageType} from "../Redux/profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../Redux/redux-store";

function Profile() {
    const dispatch = useDispatch()
    const state = useSelector<RootStateType, ProfilePageType>(state => state.profile)


    const addPostHandler = () => {
        dispatch(AddPostAC(state.valueTextarea))
    }

    const onChangeTextValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(AddNewTextAC(e.currentTarget.value))
    }
    return (
        <main>
            <div>
                <img className={s.fon} src={fon}/>
            </div>
            <ProfileInfo />
            <div>
                <textarea
                    value={state.valueTextarea}
                    onChange={onChangeTextValue}
                />
            </div>
            <div>
                <button onClick={addPostHandler}>add post</button>
            </div>
            <MyPosts posts={state.posts} />
        </main>
    )
}

export default Profile